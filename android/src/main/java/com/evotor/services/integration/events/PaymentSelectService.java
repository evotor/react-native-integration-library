package com.evotor.services.integration.events;

import android.content.Context;
import android.os.Bundle;

import com.evotor.converter.from.js.ReceiptReader;
import com.evotor.converter.to.js.ReceiptWriter;
import com.evotor.services.integration.ReactIntegrationService;

import java.util.List;
import java.util.Map;

import ru.evotor.IBundlable;
import ru.evotor.framework.core.action.event.receipt.payment.PaymentSelectedEvent;
import ru.evotor.framework.core.action.event.receipt.payment.PaymentSelectedEventResult;
import ru.evotor.framework.payment.PaymentPurpose;

/**
 * Created by a.lunkov on 11.12.2017.
 */

public class PaymentSelectService extends ReactIntegrationService {

    private static final String EVENT_NAME = "PAYMENT_SELECTED";

    public static void getResultReader(Map<String, IntegrationResultReader> target) {
        target.put(
                EVENT_NAME,
                new IntegrationResultReader() {
                    @Override
                    public IBundlable read(Context context, Map data) {
                        final List<PaymentPurpose> paymentPurposes = data.get("paymentParts") == null ?
                                null : ReceiptReader.INSTANCE.readPaymentParts((List) data.get("paymentParts"));
                        if (paymentPurposes != null) {
                            return new PaymentSelectedEventResult(
                                    data.get("extra") == null ?
                                            null : ReceiptReader.INSTANCE.readSetExtra((Map) data.get("extra")),
                                    paymentPurposes
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
        return EVENT_NAME;
    }

    @Override
    protected String getActionName() {
        return PaymentSelectedEvent.NAME_SELL_RECEIPT;
    }

    @Override
    protected IntegrationEventWriter getEventWriter() {
        return new IntegrationEventWriter() {
            @Override
            public Object write(Bundle bundle) {
                final PaymentSelectedEvent event = PaymentSelectedEvent.create(bundle);
                if (event == null) {
                    return null;
                }
                return ReceiptWriter.INSTANCE.writePaymentPurpose(event.getPaymentPurpose());
            }
        };
    }

}
