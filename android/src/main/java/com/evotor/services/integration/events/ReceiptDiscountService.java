package com.evotor.services.integration.events;

import android.content.Context;
import android.os.Bundle;

import com.evotor.services.integration.ReactIntegrationService;
import com.facebook.react.bridge.WritableMap;
import com.evotor.utilities.Reader;
import com.evotor.utilities.Writer;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import ru.evotor.IBundlable;
import ru.evotor.framework.core.action.event.receipt.changes.position.IPositionChange;
import ru.evotor.framework.core.action.event.receipt.discount.ReceiptDiscountEvent;
import ru.evotor.framework.core.action.event.receipt.discount.ReceiptDiscountEventResult;

/**
 * Created by a.lunkov on 19.10.2017.
 */

public class ReceiptDiscountService extends ReactIntegrationService {

    private static String eventName = "RECEIPT_DISCOUNT";

    public static void getResultReader(Map<String, ResultReader> target) {
        target.put(
                eventName,
                new ResultReader() {
                    @Override
                    public IBundlable read(Context context, Map data) {
                        BigDecimal discount = data.get("discount") == null ?
                                null : new BigDecimal((double) Math.round((Double) data.get("discount") * 1000d) / 1000d);
                        List<IPositionChange> changes = data.get("changes") == null ?
                                null : Reader.INSTANCE.readChanges((List) data.get("changes"));
                        if (discount != null && changes != null) {
                            return new ReceiptDiscountEventResult(
                                    discount,
                                    data.get("extra") == null ?
                                            null : Reader.INSTANCE.readSetExtra((Map) data.get("extra")),
                                    changes
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
        return ReceiptDiscountEvent.NAME_SELL_RECEIPT;
    }

    @Override
    protected EventWriter getEventWriter() {
        return new EventWriter() {
            @Override
            public WritableMap write(Bundle bundle) {
                ReceiptDiscountEvent event = ReceiptDiscountEvent.create(bundle);
                if (event == null) {
                    return null;
                }
                return Writer.INSTANCE.writeDiscount(event.getDiscount(), event.getReceiptUuid());
            }
        };
    }

}
