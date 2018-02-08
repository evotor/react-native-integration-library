package com.evotor.services.integration;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.RemoteException;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

import com.evotor.modules.EventModule;
import com.evotor.utilities.Writer;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.evotor.utilities.Reader;
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

    @Nullable
    @Override
    protected Map<String, ActionProcessor> createProcessors() {
        IntegrationModule.integrators.put(
                getEventName(),
                new Integrator() {
                    @Override
                    public void integrate(Map result, com.facebook.react.bridge.Callback resultCallback) {
                        try {
                            if (result.get("data") != null) {
                                callback.onResult(
                                        IntegrationModule.resultReaders.get(getEventName()).read(
                                                getApplicationContext(),
                                                (Map) result.get("data")
                                        )
                                );
                                resultCallback.invoke();
                            } else if (result.get("intent") != null) {
                                Intent resultIntent = Reader.INSTANCE.readIntent(
                                        getApplicationContext(),
                                        (Map) result.get("intent"),
                                        resultCallback
                                );
                                if (resultIntent != null) {
                                    try {
                                        callback.startActivity(resultIntent);
                                        resultCallback.invoke();
                                    } catch (SecurityException e) {
                                        resultCallback.invoke(Writer.INSTANCE.writeError(
                                                "NavigationError",
                                                "TARGET_CLASS_NOT_EXPORTED"
                                        ));
                                        callback.skip();
                                    }
                                } else {
                                    callback.skip();
                                }
                            } else {
                                callback.skip();
                                resultCallback.invoke();
                            }
                        } catch (RemoteException e) {
                            resultCallback.invoke(Writer.INSTANCE.writeError(
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
                    public void process(@NonNull String action, @Nullable Bundle bundle, @NonNull final Callback c) {
                        callback = c;
                        boolean executed = bundle != null && EventModule.startService(
                                getApplicationContext(),
                                getEventName(),
                                Arguments.toBundle(getEventWriter().write(bundle))
                        );
                        if (!executed) {
                            try {
                                callback.skip();
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

    protected abstract EventWriter getEventWriter();

    public interface EventWriter {
        WritableMap write(Bundle bundle);
    }

    public interface ResultReader {
        IBundlable read(Context context, Map data);
    }

    public interface Integrator {
        void integrate(Map result, Callback resultCallback);
    }

}
