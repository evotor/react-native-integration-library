package com.evotor.services.integration.events;

import android.content.Context;
import android.os.Bundle;

import com.evotor.converter.tojs.EventWriter;
import com.evotor.services.integration.ReactIntegrationService;

import java.util.List;
import java.util.Map;

import ru.evotor.IBundlable;
import ru.evotor.framework.core.action.event.receipt.payment.system.event.PaymentSystemEvent;
import ru.evotor.framework.core.action.event.receipt.payment.system.result.PaymentSystemPaymentErrorResult;
import ru.evotor.framework.core.action.event.receipt.payment.system.result.PaymentSystemPaymentOkResult;
import ru.evotor.framework.payment.PaymentType;

/**
 * Created by a.lunkov on 11.12.2017.
 */

public class PaymentSystemService extends ReactIntegrationService {

    private static final String eventName = "PAYMENT_SYSTEM";

    public static void getResultReader(Map<String, IntegrationResultReader> target) {
        target.put(
                eventName,
                new IntegrationResultReader() {
                    @Override
                    public IBundlable read(Context context, Map data) {
                        final String name = (String) data.get("__name__");
                        switch (name) {
                            case "PaymentSystemPaymentOkResult":
                                final String rrn = (String) data.get("rrn");
                                final List<String> slip = data.get("slip") == null ? null : (List<String>) data.get("slip");
                                final String paymentType = (String) data.get("paymentType");
                                if (rrn != null && slip != null && paymentType != null) {
                                    return new PaymentSystemPaymentOkResult(
                                            rrn, slip, (String) data.get("paymentInfo"), PaymentType.valueOf(paymentType)
                                    );
                                } else {
                                    return null;
                                }
                            case "PaymentSystemPaymentErrorResult":
                                return new PaymentSystemPaymentErrorResult((String) data.get("errorDescription"));
                            default:
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
        return PaymentSystemEvent.NAME_ACTION;
    }

    @Override
    protected IntegrationEventWriter getEventWriter() {
        return new IntegrationEventWriter() {
            @Override
            public Object write(Bundle bundle) {
                final PaymentSystemEvent event = PaymentSystemEvent.Companion.create(bundle);
                if (event == null) {
                    return null;
                }
                return EventWriter.INSTANCE.writePaymentSystemEvent(event);
            }
        };
    }

}
