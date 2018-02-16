package com.evotor.services.integration.events;

import android.content.Context;
import android.os.Bundle;

import com.evotor.services.integration.ReactIntegrationService;
import com.evotor.utilities.PreWriter;
import com.evotor.utilities.Reader;

import java.util.List;
import java.util.Map;

import ru.evotor.IBundlable;
import ru.evotor.framework.core.action.event.receipt.before_positions_edited.BeforePositionsEditedEvent;
import ru.evotor.framework.core.action.event.receipt.before_positions_edited.BeforePositionsEditedEventResult;

/**
 * Created by a.lunkov on 07.11.2017.
 */

public class PositionsEditService extends ReactIntegrationService {

    private static String eventName = "BEFORE_POSITIONS_EDITED";

    public static void getResultReader(Map<String, ResultReader> target) {
        target.put(
                eventName,
                new ResultReader() {
                    @Override
                    public IBundlable read(Context context, Map data) {
                        return new BeforePositionsEditedEventResult(
                                data.get("changes") == null ?
                                        null : Reader.INSTANCE.readChanges((List) data.get("changes")),
                                data.get("extra") == null ?
                                        null : Reader.INSTANCE.readSetExtra((Map) data.get("extra"))
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
        return BeforePositionsEditedEvent.NAME_SELL_RECEIPT;
    }

    @Override
    protected EventPreWriter getEventPreWriter() {
        return new EventPreWriter() {
            @Override
            public Map preWrite(Bundle bundle) {
                return PreWriter.INSTANCE.preWriteChanges(BeforePositionsEditedEvent.create(bundle).getChanges());
            }
        };
    }

}