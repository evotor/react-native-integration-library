package com.evotor.services.integration;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.RemoteException;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.Log;

import com.evotor.modules.EventModule;
import com.evotor.converter.tojs.ErrorWriter;
import com.facebook.react.bridge.Callback;
import com.evotor.converter.fromjs.NavigationReader;
import com.evotor.modules.IntegrationModule;

import java.util.HashMap;
import java.util.Map;

import ru.evotor.IBundlable;
import ru.evotor.framework.core.IntegrationService;
import ru.evotor.framework.core.action.processor.ActionProcessor;

/**
 * Created by a.lunkov on 11.12.2017.
 */

public abstract class ReactIntegrationService extends IntegrationService {

    private ActionProcessor.Callback callback;

    @Override
    protected Map<String, ActionProcessor> createProcessors() {
        IntegrationModule.Companion.getIntegrators().put(
                getEventName(),
                new Integrator() {
                    @Override
                    public void integrate(Map result, com.facebook.react.bridge.Callback resultCallback) {
                        try {
                            if (result.get("data") != null) {
                                callback.onResult(
                                        IntegrationModule.Companion.getResultReaders().get(getEventName()).read(
                                                getApplicationContext(),
                                                (Map) result.get("data")
                                        )
                                );
                                Log.v("ReactIntegrationService", getEventName() + ": result is applied");
                                resultCallback.invoke();
                            } else if (result.get("intent") != null) {
                                final Intent intent = NavigationReader.INSTANCE.readIntent(
                                        getApplicationContext(),
                                        (Map) result.get("intent"),
                                        resultCallback
                                );
                                if (intent != null) {
                                    try {
                                        callback.startActivity(intent);
                                        Log.v("ReactIntegrationService", getEventName() + ": activity is started");
                                        resultCallback.invoke();
                                    } catch (SecurityException e) {
                                        resultCallback.invoke(ErrorWriter.INSTANCE.writeError(
                                                "NavigationError",
                                                "TARGET_CLASS_NOT_EXPORTED"
                                        ));
                                        callback.skip();
                                        Log.v("ReactIntegrationService", getEventName() + ": skipped");
                                    }
                                } else {
                                    callback.skip();
                                    Log.v("ReactIntegrationService", getEventName() + ": skipped");
                                }
                            } else {
                                callback.skip();
                                Log.v("ReactIntegrationService", getEventName() + ": skipped");
                                resultCallback.invoke();
                            }
                        } catch (RemoteException e) {
                            resultCallback.invoke(ErrorWriter.INSTANCE.writeError(
                                    "IntegrationError",
                                    e.getMessage()
                            ));
                        }
                    }
                }
        );
        final Map<String, ActionProcessor> map = new HashMap<>();
        map.put(
                getActionName(),
                new ActionProcessor() {
                    @Override
                    public void process(@NonNull String action,
                                        @Nullable Bundle bundle,
                                        @NonNull Callback c) {
                        callback = c;
                        if (bundle != null) {
                            EventModule.Companion.emit(
                                    getApplicationContext(),
                                    getEventName(),
                                    getEventWriter().write(bundle)
                            );
                            Log.v("ReactIntegrationService", getEventName() + ": event data is emitted");
                        } else {
                            try {
                                callback.skip();
                                Log.v("ReactIntegrationService", getEventName() + ": skipped");
                            } catch (RemoteException e) {
                                e.printStackTrace();
                            }
                        }
                    }

                }
        );
        return map;
    }

    protected abstract String getEventName();

    protected abstract String getActionName();

    protected abstract IntegrationEventWriter getEventWriter();

    public interface IntegrationEventWriter {
        Object write(Bundle bundle);
    }

    public interface IntegrationResultReader {
        IBundlable read(Context context, Map data);
    }

    public interface Integrator {
        void integrate(Map result, Callback resultCallback);
    }

}
