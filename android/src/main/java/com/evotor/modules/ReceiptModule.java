package com.evotor.modules;

import android.os.Bundle;

import com.evotor.utilities.Reader;
import com.evotor.utilities.Writer;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import ru.evotor.framework.Cursor;
import ru.evotor.framework.core.IntegrationException;
import ru.evotor.framework.core.IntegrationManagerCallback;
import ru.evotor.framework.core.IntegrationManagerFuture;
import ru.evotor.framework.core.action.command.open_receipt_command.OpenPaybackReceiptCommand;
import ru.evotor.framework.core.action.command.open_receipt_command.OpenReceiptCommandResult;
import ru.evotor.framework.core.action.command.open_receipt_command.OpenSellReceiptCommand;
import ru.evotor.framework.core.action.command.print_receipt_command.PrintReceiptCommandResult;
import ru.evotor.framework.core.action.command.print_receipt_command.PrintSellReceiptCommand;
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