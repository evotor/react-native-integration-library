package com.evotor.services.integration.events;

import android.content.Context;
import android.os.Bundle;

import com.evotor.converter.from.js.ReceiptReader;
import com.evotor.services.integration.ReactIntegrationService;

import java.util.Map;

import ru.evotor.IBundlable;
import ru.evotor.framework.core.action.event.receipt.payment.combined.event.PaymentDelegatorEvent;
import ru.evotor.framework.core.action.event.receipt.payment.combined.result.PaymentDelegatorCanceledAllEventResult;
import ru.evotor.framework.core.action.event.receipt.payment.combined.result.PaymentDelegatorCanceledEventResult;
import ru.evotor.framework.core.action.event.receipt.payment.combined.result.PaymentDelegatorSelectedEventResult;
import ru.evotor.framework.payment.PaymentPurpose;

public class PaymentDelegatorService extends ReactIntegrationService {

    private static final String EVENT_NAME = "PAYMENT_DELEGATOR";

    public static void getResultReader(Map<String, IntegrationResultReader> target) {
        target.put(
                EVENT_NAME,
                new IntegrationResultReader() {
                    @Override
                    public IBundlable read(Context context, Map data) {
                        final String name = (String) data.get("__name__");
                        switch (name) {
                            case "PaymentDelegatorSelectedEventResult":
                                final PaymentPurpose paymentPurpose = data.get("paymentPurpose") == null ? null :
                                        ReceiptReader.INSTANCE.readPaymentPurpose((Map) data.get("paymentPurpose"));
                                if (paymentPurpose != null) {
                                    return new PaymentDelegatorSelectedEventResult(
                                            paymentPurpose,
                                            data.get("extra") == null ? null : ReceiptReader.INSTANCE.readSetExtra((Map) data.get("extra"))
                                    );
                                }
                                break;
                            case "PaymentDelegatorCanceledEventResult":
                                final String paymentUuid = (String) data.get("paymentUuid");
                                if (paymentUuid != null) {
                                    return new PaymentDelegatorCanceledEventResult(
                                            paymentUuid,
                                            data.get("extra") == null ? null : ReceiptReader.INSTANCE.readSetExtra((Map) data.get("extra"))
                                    );
                                }
                                break;
                            case "PaymentDelegatorCanceledAllEventResult":
                                return new PaymentDelegatorCanceledAllEventResult(
                                        data.get("extra") == null ? null : ReceiptReader.INSTANCE.readSetExtra((Map) data.get("extra"))
                                );
                        }
                        return null;
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
        return PaymentDelegatorEvent.NAME_ACTION;
    }

    @Override
    protected IntegrationEventWriter getEventWriter() {
        return new IntegrationEventWriter() {
            @Override
            public Object write(Bundle bundle) {
                PaymentDelegatorEvent event = PaymentDelegatorEvent.Companion.create(bundle);
                if (event == null) {
                    return null;
                }
                return event.getReceiptUuid();
            }
        };
    }
}
