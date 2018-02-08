package com.evotor.modules;

import android.content.Context;
import android.content.Intent;

import com.evotor.activities.ReactIntegrationActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.evotor.utilities.Reader;
import com.evotor.utilities.Writer;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by a.lunkov on 03.11.2017.
 */

public class NavigationModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext context;
    public static EmitEvent emitEvent;

    public NavigationModule(final ReactApplicationContext c) {
        super(c);
        context = c;
        emitEvent = new EmitEvent() {
            @Override
            public void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
                final WritableMap result = Arguments.createMap();
                result.putInt("requestCode", requestCode);
                result.putInt("resultCode", resultCode);
                if (data != null) {
                    result.putMap("data", Writer.INSTANCE.writeIntent(data));
                } else {
                    result.putNull("data");
                }
                EventModule.startService(context, "ACTIVITY_RESULT", Arguments.toBundle(result));
            }

            @Override
            public void onBackPressed() {
                EventModule.startService(context, "BACK_PRESSED", null);
            }
        };
    }

    @Override
    public String getName() {
        return "NavigationModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        return new HashMap<>();
    }

    @ReactMethod
    public void getIntent(final Callback getter) {
        try {
            getter.invoke(Writer.INSTANCE.writeIntent(getCurrentActivity().getIntent()));
        } catch (NullPointerException e) {
            getter.invoke(Writer.INSTANCE.writeError("NoActivityError", e.getMessage()));
        }
    }

    @ReactMethod
    public void startActivity(final ReadableMap intent, final Callback callback) {
        navigate(
                intent,
                new Starter() {
                    @Override
                    public void start(Intent result, boolean fromActivity) {
                        if (fromActivity) {
                            getCurrentActivity().startActivity(result);
                        } else {
                            context.startActivity(result);
                        }
                    }
                },
                callback
        );
    }

    @ReactMethod
    public void startActivityForResult(final ReadableMap intent, final int requestCode, final Callback callback) {
        navigate(
                intent,
                new Starter() {
                    @Override
                    public void start(Intent result, boolean fromActivity) {
                        if (fromActivity) {
                            getCurrentActivity().startActivityForResult(result, requestCode, null);
                        } else {
                            context.startActivityForResult(result, requestCode, null);
                        }
                    }
                },
                callback
        );
    }

    @ReactMethod
    public void startService(final ReadableMap intent, final Callback callback) {
        navigate(
                intent,
                new Starter() {
                    @Override
                    public void start(Intent result, boolean fromActivity) {
                        if (fromActivity) {
                            getCurrentActivity().startService(result);
                        } else {
                            context.startService(result);
                        }
                    }
                },
                callback
        );
    }

    private void navigate(final ReadableMap intent, final Starter starter, final Callback callback) {
        Context c;
        boolean fromActivity = false;
        if (intent.getArray("flags").toArrayList().contains((double) Intent.FLAG_ACTIVITY_NEW_TASK)) {
            c = context;
        } else {
            c = getCurrentActivity();
            fromActivity = true;
        }
        try {
            final Intent result = Reader.INSTANCE.readIntent(c, intent.toHashMap(), callback);
            if (result != null) {
                try {
                    starter.start(result, fromActivity);
                    callback.invoke();
                } catch (SecurityException e) {
                    callback.invoke(Writer.INSTANCE.writeError("NavigationError", "TARGET_CLASS_NOT_EXPORTED"));
                }
            }
        } catch (NullPointerException e) {
            callback.invoke(Writer.INSTANCE.writeError("NoActivityError", e.getMessage()));
        }
    }

    @ReactMethod
    public void setResult(final int resultCode, final ReadableMap data, final Callback callback) {
        try {
            getCurrentActivity().setResult(resultCode, data == null ? null : Reader.INSTANCE.readIntent(context, data.toHashMap(), callback));
            callback.invoke();
        } catch (NullPointerException e) {
            callback.invoke(Writer.INSTANCE.writeError("NoActivityError", e.getMessage()));
        }
    }

    @ReactMethod
    public void setIntegrationResult(final String eventName, final ReadableMap result, final Callback callback) {
        try {
            ((ReactIntegrationActivity) getCurrentActivity()).setIntegrationResult(
                    IntegrationModule.resultReaders.get(eventName).read(context, result.toHashMap())
            );
            callback.invoke();
        } catch (NullPointerException e) {
            callback.invoke(Writer.INSTANCE.writeError("NoActivityError", e.getMessage()));
        } catch (RuntimeException e) {
            callback.invoke(Writer.INSTANCE.writeError("IntegrationError", e.getMessage()));
        }
    }

    @ReactMethod
    public void finish(final Callback callback) {
        try {
            getCurrentActivity().finish();
            callback.invoke();
        } catch (NullPointerException e) {
            callback.invoke(Writer.INSTANCE.writeError("NoActivityError", e.getMessage()));
        }
    }

    public static void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
        if (emitEvent != null) {
            emitEvent.onActivityResult(requestCode, resultCode, data);
        }
    }

    public static void onBackPressed() {
        if (emitEvent != null) {
            emitEvent.onBackPressed();
        }
    }

    private interface Starter {
        void start(final Intent result, boolean fromActivity);
    }

    public interface EmitEvent {
        void onActivityResult(final int requestCode, final int resultCode, final Intent data);

        void onBackPressed();
    }

}
