package com.evotor.modules;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.evotor.utilities.Reader;
import com.evotor.utilities.Writer;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import ru.evotor.framework.Cursor;
import ru.evotor.framework.core.IntegrationException;
import ru.evotor.framework.core.IntegrationManagerCallback;
import ru.evotor.framework.core.IntegrationManagerFuture;
import ru.evotor.framework.core.action.command.open_receipt_command.OpenSellReceiptCommand;
import ru.evotor.framework.core.action.command.print_receipt_command.PrintReceiptCommandResult;
import ru.evotor.framework.core.action.command.print_receipt_command.PrintSellReceiptCommand;
import ru.evotor.framework.core.action.event.receipt.changes.position.PositionAdd;
import ru.evotor.framework.navigation.NavigationApi;
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
    public void getPositionByBarcode(String barcode, Callback callback) {
        callback.invoke(Writer.INSTANCE.writePositions(
                ReceiptApi.getPositionsByBarcode(context, barcode)
        ));
    }

    @ReactMethod
    public void openReceipt(ReadableArray source, ReadableMap extra, final Callback callback) {
        List<PositionAdd> result = new ArrayList<>();
        for (int i = 0; i < source.size(); i++) {
            result.add(new PositionAdd(
                    Reader.INSTANCE.readPosition((Map) source.toArrayList().get(i))
            ));
        }
        final Activity current = getCurrentActivity();
        if (current != null) {
            new OpenSellReceiptCommand(result, extra == null ? null : Reader.INSTANCE.readSetExtra(extra.toHashMap()))
                    .process(current, new IntegrationManagerCallback() {
                                @Override
                                public void run(IntegrationManagerFuture integrationManagerFuture) {
                                    try {
                                        IntegrationManagerFuture.Result result =
                                                integrationManagerFuture.getResult();
                                        if (result.getType() == IntegrationManagerFuture.Result.Type.OK) {
                                            Intent intent = NavigationApi.createIntentForSellReceiptEdit();
                                            current.startActivity(intent);
                                            callback.invoke();
                                        }
                                    } catch (IntegrationException e) {
                                        callback.invoke(Writer.INSTANCE.writeError("IntegrationError", e.getMessage()));
                                    }
                                }
                            }
                    );
        }
    }

    @ReactMethod
    public void sendElectronReceipt(
            ReadableArray printReceipts, ReadableMap extra, String phone,
            String email, String discount, final Callback resultGetter
    ) {
        Activity current = getCurrentActivity();
        if (current != null) {
            new PrintSellReceiptCommand(
                    Reader.INSTANCE.readPrintReceipts(printReceipts.toArrayList()),
                    extra == null ? null : Reader.INSTANCE.readSetExtra(extra.toHashMap()),
                    phone,
                    email,
                    discount.isEmpty() ? null : new BigDecimal(discount)
            ).process(current, new IntegrationManagerCallback() {
                @Override
                public void run(IntegrationManagerFuture integrationManagerFuture) {
                    try {
                        IntegrationManagerFuture.Result result = integrationManagerFuture.getResult();
                        switch (result.getType()) {
                            case OK:
                                PrintReceiptCommandResult resultData = PrintReceiptCommandResult.create(result.getData());
                                    resultGetter.invoke(resultData == null ? null : Writer.INSTANCE.writePrintReceiptCommandResult(resultData));
                                break;
                            case ERROR:
                                resultGetter.invoke(Writer.INSTANCE.writeError(
                                        "IntegrationError",
                                        result.getError().getMessage())
                                );
                                break;
                        }
                    } catch (IntegrationException e) {
                        resultGetter.invoke(Writer.INSTANCE.writeError(
                                "IntegrationError",
                                e.getMessage())
                        );
                    }
                }
            });
        }
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