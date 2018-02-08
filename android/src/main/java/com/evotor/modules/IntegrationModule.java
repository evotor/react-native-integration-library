package com.evotor.modules;

import com.evotor.services.integration.ReactIntegrationService;
import com.evotor.services.integration.events.PaymentSystemService;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.evotor.services.integration.events.PaymentSelectService;
import com.evotor.services.integration.events.PositionsEditService;
import com.evotor.services.integration.events.PrintExtraService;
import com.evotor.services.integration.events.PrintGroupService;
import com.evotor.services.integration.events.ReceiptDiscountService;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by a.lunkov on 25.10.2017.
 */

public class IntegrationModule extends ReactContextBaseJavaModule {

    public static final Map<String, ReactIntegrationService.Integrator> integrators = new HashMap<>();
    public static final Map<String, ReactIntegrationService.ResultReader> resultReaders = getResultReaders();

    private static Map<String, ReactIntegrationService.ResultReader> getResultReaders() {
        final Map<String, ReactIntegrationService.ResultReader> result = new HashMap<>();
        PositionsEditService.getResultReader(result);
        ReceiptDiscountService.getResultReader(result);
        PaymentSelectService.getResultReader(result);
        PaymentSystemService.getResultReader(result);
        PrintGroupService.getResultReader(result);
        PrintExtraService.getResultReader(result);
        return Collections.unmodifiableMap(result);
    }

    public IntegrationModule(ReactApplicationContext c) {
        super(c);
    }

    @Override
    public String getName() {
        return "IntegrationModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        return new HashMap<>();
    }

    @ReactMethod
    public void setIntegrationResult(final String eventName, final ReadableMap result, final Callback callback) {
        integrators.get(eventName).integrate(result.toHashMap(), callback);
    }

}
