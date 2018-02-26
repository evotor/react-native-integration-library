package com.evotor.services.integration.events;

import android.content.Context;
import android.os.Bundle;

import com.evotor.services.integration.ReactIntegrationService;
import com.evotor.converter.PreWriter;

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

    private static String eventName = "PAYMENT_SYSTEM";

    public static void getResultReader(Map<String, ResultReader> target) {
        target.put(
                eventName,
                new ResultReader() {
                    @Override
                    public IBundlable read(Context context, Map data) {
                        String name = (String) data.get("__name__");
                        switch (name) {
                            case "PaymentSystemPaymentOkResult":
                                String rrn = (String) data.get("rrn");
                                List<String> slip = data.get("slip") == null ? null : (List<String>) data.get("slip");
                                String paymentType = (String) data.get("paymentType");
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
    protected EventPreWriter getEventPreWriter() {
        return new EventPreWriter() {
            @Override
            public Map preWrite(Bundle bundle) {
                PaymentSystemEvent event = PaymentSystemEvent.Companion.create(bundle);
                if (event == null) {
                    return null;
                }
                return PreWriter.INSTANCE.preWritePaymentSystemEvent(event);
            }
        };
    }

}
