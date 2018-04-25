package com.evotor.services.integration.events;

import android.content.Context;
import android.os.Bundle;

import com.evotor.converter.fromjs.ReceiptReader;
import com.evotor.converter.tojs.EventWriter;
import com.evotor.services.integration.ReactIntegrationService;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import ru.evotor.IBundlable;
import ru.evotor.framework.calculator.MoneyCalculator;
import ru.evotor.framework.core.action.event.receipt.changes.position.IPositionChange;
import ru.evotor.framework.core.action.event.receipt.discount.ReceiptDiscountEvent;
import ru.evotor.framework.core.action.event.receipt.discount.ReceiptDiscountEventResult;

/**
 * Created by a.lunkov on 19.10.2017.
 */

public class ReceiptDiscountService extends ReactIntegrationService {

    private static final String eventName = "RECEIPT_DISCOUNT";

    public static void getResultReader(Map<String, IntegrationResultReader> target) {
        target.put(
                eventName,
                new IntegrationResultReader() {
                    @Override
                    public IBundlable read(Context context, Map data) {
                        final BigDecimal discount = data.get("discount") == null ?
                                null : MoneyCalculator.toBigDecimal((Double) data.get("discount"));
                        final List<IPositionChange> changes = data.get("changes") == null ?
                                null : ReceiptReader.INSTANCE.readChanges((List) data.get("changes"));
                        if (discount != null && changes != null) {
                            return new ReceiptDiscountEventResult(
                                    discount,
                                    data.get("extra") == null ?
                                            null : ReceiptReader.INSTANCE.readSetExtra((Map) data.get("extra")),
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
    protected IntegrationEventWriter getEventWriter() {
        return new IntegrationEventWriter() {
            @Override
            public Object write(Bundle bundle) {
                final ReceiptDiscountEvent event = ReceiptDiscountEvent.create(bundle);
                if (event == null) {
                    return null;
                }
                return EventWriter.INSTANCE.writeReceiptDiscountEvent(event.getDiscount(), event.getReceiptUuid());
            }
        };
    }

}
