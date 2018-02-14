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

import ru.evotor.framework.core.IntegrationException;
import ru.evotor.framework.core.IntegrationManagerCallback;
import ru.evotor.framework.core.IntegrationManagerFuture;
import ru.evotor.framework.core.action.command.open_receipt_command.OpenPaybackReceiptCommand;
import ru.evotor.framework.core.action.command.open_receipt_command.OpenReceiptCommandResult;
import ru.evotor.framework.core.action.command.open_receipt_command.OpenSellReceiptCommand;
import ru.evotor.framework.core.action.command.print_receipt_command.PrintReceiptCommandResult;
import ru.evotor.framework.core.action.command.print_receipt_command.PrintSellReceiptCommand;
import ru.evotor.framework.core.action.command.print_z_report_command.PrintZReportCommand;

/**
 * Created by a.lunkov on 14.02.2018.
 */

public class CommandModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext context;

    public CommandModule(ReactApplicationContext c) {
        super(c);
        context = c;
    }

    @Override
    public String getName() {
        return "CommandModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        return new HashMap<>();
    }

    @ReactMethod
    public void openSellReceipt(final ReadableArray source, final ReadableMap extra, final Callback callback) {
        try {
            new OpenSellReceiptCommand(
                    Reader.INSTANCE.readPositionAdds(source.toArrayList()),
                    extra == null ? null : Reader.INSTANCE.readSetExtra(extra.toHashMap())
            ).process(
                    getCurrentActivity(),
                    getIntegrationManagerCallback(
                            new CommandCallback() {
                                @Override
                                public void invoke(final Bundle result) {
                                    OpenReceiptCommandResult resultData = OpenReceiptCommandResult.create(result);
                                    callback.invoke(resultData == null ? null : Writer.INSTANCE.writeOpenReceiptCommandResult(resultData));
                                }
                            },
                            callback
                    )
            );
        } catch (final Exception e) {
            callback.invoke(Writer.INSTANCE.writeError("NoActivityError", e.getMessage()));
        }
    }

    @ReactMethod
    public void openPaybackReceipt(final ReadableArray source, final ReadableMap extra, final Callback callback) {
        try {
            new OpenPaybackReceiptCommand(
                    Reader.INSTANCE.readPositionAdds(source.toArrayList()),
                    extra == null ? null : Reader.INSTANCE.readSetExtra(extra.toHashMap())
            ).process(
                    getCurrentActivity(),
                    getIntegrationManagerCallback(
                            new CommandCallback() {
                                @Override
                                public void invoke(final Bundle result) {
                                    OpenReceiptCommandResult resultData = OpenReceiptCommandResult.create(result);
                                    callback.invoke(resultData == null ? null : Writer.INSTANCE.writeOpenReceiptCommandResult(resultData));
                                }
                            },
                            callback
                    )
            );
        } catch (final Exception e) {
            callback.invoke(Writer.INSTANCE.writeError("NoActivityError", e.getMessage()));
        }
    }

    @ReactMethod
    public void sendElectronReceipt(
            final ReadableArray printReceipts, final ReadableMap extra, final String phone,
            final String email, final String discount, final Callback callback
    ) {
        new PrintSellReceiptCommand(
                Reader.INSTANCE.readPrintReceipts(printReceipts.toArrayList()),
                extra == null ? null : Reader.INSTANCE.readSetExtra(extra.toHashMap()),
                phone,
                email,
                discount.isEmpty() ? null : new BigDecimal(discount)
        ).process(
                getCurrentActivity(),
                getIntegrationManagerCallback(
                        new CommandCallback() {
                            @Override
                            public void invoke(final Bundle result) {
                                PrintReceiptCommandResult resultData = PrintReceiptCommandResult.create(result);
                                callback.invoke(resultData == null ? null : Writer.INSTANCE.writePrintReceiptCommandResult(resultData));
                            }
                        },
                        callback
                )
        );
    }

    @ReactMethod
    public void printZReport(final Callback callback) {
        new PrintZReportCommand().process(
                getCurrentActivity(),
                getIntegrationManagerCallback(
                        new CommandCallback() {
                            @Override
                            public void invoke(Bundle result) {
                                callback.invoke();
                            }
                        },
                        callback
                )
        );
    }

    private IntegrationManagerCallback getIntegrationManagerCallback(final CommandCallback successCallback, final Callback errorCallback) {
        return new IntegrationManagerCallback() {
            @Override
            public void run(final IntegrationManagerFuture integrationManagerFuture) {
                try {
                    final IntegrationManagerFuture.Result result = integrationManagerFuture.getResult();
                    switch (result.getType()) {
                        case OK:
                            successCallback.invoke(result.getData());
                            break;
                        case ERROR:
                            errorCallback.invoke(Writer.INSTANCE.writeError(
                                    "IntegrationError",
                                    result.getError().getMessage())
                            );
                            break;
                    }
                } catch (final IntegrationException e) {
                    errorCallback.invoke(Writer.INSTANCE.writeError(
                            "IntegrationError",
                            e.getMessage())
                    );
                }
            }
        };
    }

    private interface CommandCallback {
        void invoke(final Bundle result);
    }


}