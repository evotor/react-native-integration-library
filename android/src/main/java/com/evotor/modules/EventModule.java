package com.evotor.modules;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.evotor.services.EventListenerService;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by a.lunkov on 21.12.2017.
 */

public class EventModule extends ReactContextBaseJavaModule {

    private static boolean mounted = false;
    private static List<String> listenersEnabled = new ArrayList<>();
    private static ActivityInspector activityInspector = null;

    public EventModule(final ReactApplicationContext c) {
        super(c);
        activityInspector = new ActivityInspector() {
            @Override
            public boolean isActivityRunning() {
                return getCurrentActivity() != null;
            }
        };
    }

    @Override
    public final String getName() {
        return "EventModule";
    }

    @Override
    public final Map<String, Object> getConstants() {
        return new HashMap<>();
    }

    @ReactMethod
    public void setListenerEnabled(final String eventName, final boolean enabled) {
        if (enabled) {
            if(!listenersEnabled.contains(eventName)) {
                listenersEnabled.add(eventName);
            }
        } else if (listenersEnabled.contains(eventName)) {
            listenersEnabled.remove(eventName);
        }
    }

    public static Intent createServiceIntent(final Context context, final String eventName, final boolean isCustom) {
        if (!mounted) {
            context.startService(new Intent(context, EventListenerService.class));
            mounted = true;
        }
        if (!isCustom && !listenersEnabled.contains(eventName)) {
            return null;
        }
        Intent result = new Intent(context, EventListenerService.class);
        result.putExtra("type", eventName);
        result.putExtra("appIsRunning", activityInspector != null && activityInspector.isActivityRunning());
        return result;
    }

    public static boolean startService(final Context context, final String eventName, final Bundle data) {
        Intent service = createServiceIntent(context, eventName, false);
        if(service == null) {
            return false;
        }
        if(data != null) {
            service.putExtra("extras", data);
        }
        context.startService(service);
        return true;
    }

    private interface ActivityInspector {
        boolean isActivityRunning();
    }

}
