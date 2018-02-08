package com.evotor.services.integration.events;

import android.content.Context;
import android.os.Bundle;

import com.evotor.services.integration.ReactIntegrationService;
import com.facebook.react.bridge.WritableMap;
import com.evotor.utilities.Reader;
import com.evotor.utilities.Writer;

import java.util.List;
import java.util.Map;

import ru.evotor.IBundlable;
import ru.evotor.framework.core.action.event.receipt.changes.position.SetPrintGroup;
import ru.evotor.framework.core.action.event.receipt.print_group.PrintGroupRequiredEvent;
import ru.evotor.framework.core.action.event.receipt.print_group.PrintGroupRequiredEventResult;

/**
 * Created by a.lunkov on 11.12.2017.
 */

public class PrintGroupService extends ReactIntegrationService {

    private static String eventName = "PRINT_GROUP_REQUIRED";

    public static void getResultReader(Map<String, ResultReader> target) {
        target.put(
                eventName,
                new ResultReader() {
                    @Override
                    public IBundlable read(Context context, Map data) {
                        List<SetPrintGroup> setPrintGroups = data.get("setPrintGroups") == null ?
                                null : Reader.INSTANCE.readSetPrintGroups((List) data.get("setPrintGroups"));
                        if (setPrintGroups != null) {
                            return new PrintGroupRequiredEventResult(
                                    data.get("extra") == null ?
                                            null : Reader.INSTANCE.readSetExtra((Map) data.get("extra")),
                                    setPrintGroups
                            );
                        } else {
                            return null;
                        }
                    }
                }
        );
    }

    @Override
    protected String getEventName() {
        return eventName;
    }

    @Override
    protected String getActionName() {
        return PrintGroupRequiredEvent.NAME_SELL_RECEIPT;
    }

    @Override
    protected EventWriter getEventWriter() {
        return new EventWriter() {
            @Override
            public WritableMap write(Bundle bundle) {
                PrintGroupRequiredEvent event = PrintGroupRequiredEvent.create(bundle);
                if (event == null) {
                    return null;
                }
                return Writer.INSTANCE.writePaymentSystem(event.getPaymentSystem());
            }
        };
    }

}
