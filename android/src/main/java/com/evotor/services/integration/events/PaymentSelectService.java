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
import ru.evotor.framework.core.action.event.receipt.payment.PaymentSelectedEvent;
import ru.evotor.framework.core.action.event.receipt.payment.PaymentSelectedEventResult;
import ru.evotor.framework.payment.PaymentPurpose;

/**
 * Created by a.lunkov on 11.12.2017.
 */

public class PaymentSelectService extends ReactIntegrationService {

    private static String eventName = "PAYMENT_SELECTED";

    public static void getResultReader(Map<String, ResultReader> target) {
        target.put(
                eventName,
                new ResultReader() {
                    @Override
                    public IBundlable read(Context context, Map data) {
                        List<PaymentPurpose> paymentPurposes = data.get("paymentParts") == null ?
                                null : Reader.INSTANCE.readPaymentParts((List) data.get("paymentParts"));
                        if (paymentPurposes != null) {
                            return new PaymentSelectedEventResult(
                                    data.get("extra") == null ?
                                            null : Reader.INSTANCE.readSetExtra((Map) data.get("extra")),
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
        return eventName;
    }

    @Override
    protected String getActionName() {
        return PaymentSelectedEvent.NAME_SELL_RECEIPT;
    }

    @Override
    protected EventWriter getEventWriter() {
        return new EventWriter() {
            @Override
            public WritableMap write(Bundle bundle) {
                PaymentSelectedEvent event = PaymentSelectedEvent.create(bundle);
                if (event == null) {
                    return null;
                }
                return Writer.INSTANCE.writePaymentSystem(event.getPaymentSystem());
            }
        };
    }

}
