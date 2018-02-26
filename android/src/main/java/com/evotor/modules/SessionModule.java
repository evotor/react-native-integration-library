package com.evotor.modules;

import com.evotor.services.integration.ReactIntegrationService;
import com.evotor.services.integration.events.PaymentSelectService;
import com.evotor.services.integration.events.PaymentSystemService;
import com.evotor.services.integration.events.PositionsEditService;
import com.evotor.services.integration.events.PrintExtraService;
import com.evotor.services.integration.events.PrintGroupService;
import com.evotor.services.integration.events.ReceiptDiscountService;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import ru.evotor.framework.system.SystemStateApi;

/**
 * Created by a.lunkov on 16.02.2018.
 */

public class SessionModule extends ReactContextBaseJavaModule {

    private final ReactContext context;

    public SessionModule(ReactApplicationContext c) {
        super(c);
        context = c;
    }

    @Override
    public String getName() {
        return "SessionModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        return new HashMap<>();
    }

    @ReactMethod
    public void getLastSessionNumber(Callback callback) {
        callback.invoke(SystemStateApi.getLastSessionNumber(context));
    }

    @ReactMethod
    public void isSessionOpened(Callback callback) {
        callback.invoke(SystemStateApi.isSessionOpened(context));
    }

}
