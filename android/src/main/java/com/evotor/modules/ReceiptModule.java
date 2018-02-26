package com.evotor.modules;

import com.evotor.converter.Writer;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import ru.evotor.framework.Cursor;
import ru.evotor.framework.receipt.Receipt;
import ru.evotor.framework.receipt.ReceiptApi;

public class ReceiptModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext context;

    public ReceiptModule(ReactApplicationContext c) {
        super(c);
        context = c;
    }

    @Override
    public String getName() {
        return "ReceiptModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        return new HashMap<>();
    }

    @ReactMethod
    public void getPositionsByBarcode(String barcode, Callback callback) {
        callback.invoke(Writer.INSTANCE.writePositions(
                ReceiptApi.getPositionsByBarcode(context, barcode)
        ));
    }

    @ReactMethod
    public void getReceiptByType(String type, Callback callback) {
        Receipt receipt = ReceiptApi.getReceipt(context, Receipt.Type.valueOf(type));
        callback.invoke(receipt == null ? null : Writer.INSTANCE.writeReceipt(receipt));
    }

    @ReactMethod
    public void getReceiptByUuid(String uuid, Callback callback) {
        Receipt receipt = ReceiptApi.getReceipt(context, uuid);
        callback.invoke(receipt == null ? null : Writer.INSTANCE.writeReceipt(receipt));
    }

    @ReactMethod
    public void getReceiptHeaders(String type, Callback callback) {
        Cursor<Receipt.Header> headers = ReceiptApi.getReceiptHeaders(
                context, type == null ? null : Receipt.Type.valueOf(type)
        );
        callback.invoke(headers == null ? null : Writer.INSTANCE.writeReceiptHeaders(headers));
    }

}