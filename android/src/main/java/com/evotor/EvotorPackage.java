package com.evotor;

import com.evotor.modules.EventModule;
import com.evotor.modules.CommandModule;
import com.evotor.modules.SessionModule;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.evotor.modules.DeviceModule;
import com.evotor.modules.IntegrationModule;
import com.evotor.modules.InventoryModule;
import com.evotor.modules.NavigationModule;
import com.evotor.modules.ReceiptModule;
import com.evotor.modules.UserModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by a.lunkov on 14.11.2017.
 */

public class EvotorPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new IntegrationModule(reactContext));
        modules.add(new ReceiptModule(reactContext));
        modules.add(new InventoryModule(reactContext));
        modules.add(new UserModule(reactContext));
        modules.add(new CommandModule(reactContext));
        modules.add(new SessionModule(reactContext));
        modules.add(new NavigationModule(reactContext));
        modules.add(new DeviceModule(reactContext));
        modules.add(new EventModule(reactContext));
        return modules;
    }
}
