package com.evotor.services.integration.events;

import android.content.Context;
import android.os.Bundle;

import com.evotor.services.integration.ReactIntegrationService;
import com.evotor.converter.Reader;

import java.util.List;
import java.util.Map;

import ru.evotor.IBundlable;
import ru.evotor.framework.core.action.event.receipt.print_extra.PrintExtraRequiredEvent;
import ru.evotor.framework.core.action.event.receipt.print_extra.PrintExtraRequiredEventResult;

/**
 * Created by a.lunkov on 19.10.2017.
 */

public class PrintExtraService extends ReactIntegrationService {

    private static String eventName = "PRINT_EXTRA_REQUIRED";

    public static void getResultReader(Map<String, ResultReader> target) {
        target.put(
                eventName,
                new ResultReader() {
                    @Override
                    public IBundlable read(Context context, Map data) {
                        return new PrintExtraRequiredEventResult(
                                data.get("extra") == null ? null : Reader.INSTANCE.readSetPrintExtras(
                                        context, (List) data.get("extra")
                                )
                        );
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
        return PrintExtraRequiredEvent.NAME_SELL_RECEIPT;
    }

    @Override
    protected EventPreWriter getEventPreWriter() {
        return new EventPreWriter() {
            @Override
            public Map preWrite(Bundle bundle) {
                return null;
            }
        };
    }

}
