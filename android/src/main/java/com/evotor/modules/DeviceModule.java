package com.evotor.modules;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.evotor.converter.Reader;
import com.evotor.converter.Writer;

import java.util.HashMap;
import java.util.Map;

import ru.evotor.devices.commons.ConnectionWrapper;
import ru.evotor.devices.commons.DeviceServiceConnector;
import ru.evotor.devices.commons.exception.DeviceServiceException;
import ru.evotor.devices.commons.printer.PrinterDocument;
import ru.evotor.devices.commons.services.IPrinterServiceWrapper;
import ru.evotor.devices.commons.services.IScalesServiceWrapper;

/**
 * Created by a.lunkov on 13.11.2017.
 */

public class DeviceModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext context;

    @Override
    public String getName() {
        return "DeviceModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        return new HashMap<>();
    }

    public DeviceModule(ReactApplicationContext c) {
        super(c);
        context = c;
        DeviceServiceConnector.addConnectionWrapper(new ConnectionWrapper() {

            @Override
            public void onPrinterServiceConnected(IPrinterServiceWrapper service) {
                emitConnection("PRINTER", true);
            }

            @Override
            public void onPrinterServiceDisconnected() {
                emitConnection("PRINTER", false);
            }

            @Override
            public void onScalesServiceConnected(IScalesServiceWrapper service) {
                emitConnection("SCALES", true);
            }

            @Override
            public void onScalesServiceDisconnected() {
                emitConnection("SCALES", false);
            }

        });
    }

    private void emitConnection(final String device, final boolean connected) {
        final Map<String, Boolean> data = new HashMap<>();
        data.put("value", connected);
        EventModule.startService(context, device+"_CONNECTION_CHANGED", data);
    }

    @ReactMethod
    public void startInitConnections() {
        DeviceServiceConnector.startInitConnections(context);
    }

    @ReactMethod
    public void print(ReadableArray printables, Callback callback) {
        try {
            DeviceServiceConnector.getPrinterService().printDocument(
                    ru.evotor.devices.commons.Constants.DEFAULT_DEVICE_INDEX,
                    new PrinterDocument(
                            Reader.INSTANCE.readPrintables(context, printables.toArrayList())
                    )
            );
            callback.invoke();
        } catch (DeviceServiceException e) {
            callback.invoke(Writer.INSTANCE.writeError("DeviceError", e.getMessage()));
        }
    }

    @ReactMethod
    public void getAllowablePixelLineLength(Callback getter) {
        try {
            getter.invoke(DeviceServiceConnector.getPrinterService().getAllowablePixelLineLength(
                    ru.evotor.devices.commons.Constants.DEFAULT_DEVICE_INDEX
            ));
        } catch (DeviceServiceException e) {
            getter.invoke(Writer.INSTANCE.writeError("DeviceError", e.getMessage()));
        }
    }

    @ReactMethod
    public void getAllowableSymbolsLineLength(Callback getter) {
        try {
            getter.invoke(DeviceServiceConnector.getPrinterService().getAllowableSymbolsLineLength(
                    ru.evotor.devices.commons.Constants.DEFAULT_DEVICE_INDEX
            ));
        } catch (DeviceServiceException e) {
            getter.invoke(Writer.INSTANCE.writeError("DeviceError", e.getMessage()));
        }
    }

    @ReactMethod
    public void getWeight(Callback getter) {
        try {
            getter.invoke(Writer.INSTANCE.writeWeight(DeviceServiceConnector.getScalesService().getWeight(
                    ru.evotor.devices.commons.Constants.DEFAULT_DEVICE_INDEX
            )));
        } catch (DeviceServiceException e) {
            getter.invoke(Writer.INSTANCE.writeError("DeviceError", e.getMessage()));
        }
    }

}
