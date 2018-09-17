package com.evotor.services.integration.events;

import android.content.Context;
import android.os.Bundle;

import com.evotor.converter.from.js.ReceiptReader;
import com.evotor.converter.to.js.ReceiptWriter;
import com.evotor.services.integration.ReactIntegrationService;

import java.util.List;
import java.util.Map;

import ru.evotor.IBundlable;
import ru.evotor.framework.core.action.event.receipt.before_positions_edited.BeforePositionsEditedEvent;
import ru.evotor.framework.core.action.event.receipt.before_positions_edited.BeforePositionsEditedEventResult;

/**
 * Created by a.lunkov on 07.11.2017.
 */

public class PositionsEditService extends ReactIntegrationService {

    private static final String EVENT_NAME = "BEFORE_POSITIONS_EDITED";

    public static void getResultReader(Map<String, IntegrationResultReader> target) {
        target.put(
                EVENT_NAME,
                new IntegrationResultReader() {
                    @Override
                    public IBundlable read(Context context, Map data) {
                        return new BeforePositionsEditedEventResult(
                                data.get("changes") == null ?
                                        null : ReceiptReader.INSTANCE.readChanges((List) data.get("changes")),
                                data.get("extra") == null ?
                                        null : ReceiptReader.INSTANCE.readSetExtra((Map) data.get("extra"))
                        );
                    }
                }
        );
    }

    @Override
    protected String getEventName() {
        return EVENT_NAME;
    }

    @Override
    protected String getActionName() {
        return BeforePositionsEditedEvent.NAME_SELL_RECEIPT;
    }

    @Override
    protected IntegrationEventWriter getEventWriter() {
        return new IntegrationEventWriter() {
            @Override
            public Object write(Bundle bundle) {
                return ReceiptWriter.INSTANCE.writeChanges(BeforePositionsEditedEvent.create(bundle).getChanges());
            }
        };
    }

}