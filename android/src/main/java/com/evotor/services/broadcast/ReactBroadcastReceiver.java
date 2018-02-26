package com.evotor.services.broadcast;

/**
 * Created by a.lunkov on 18.10.2017.
 */

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.evotor.modules.EventModule;
import com.evotor.utilities.PreWriter;
import com.facebook.react.bridge.Arguments;
import com.evotor.utilities.Writer;
import com.facebook.react.bridge.WritableMap;

import java.util.HashMap;
import java.util.Map;

import ru.evotor.framework.core.action.event.cash_drawer.CashDrawerOpenEvent;
import ru.evotor.framework.core.action.event.cash_operations.CashInEvent;
import ru.evotor.framework.core.action.event.cash_operations.CashOutEvent;
import ru.evotor.framework.core.action.event.inventory.ProductCardOpenedEvent;
import ru.evotor.framework.core.action.event.receipt.position_edited.PositionAddedEvent;
import ru.evotor.framework.core.action.event.receipt.position_edited.PositionEditedEvent;
import ru.evotor.framework.core.action.event.receipt.position_edited.PositionEvent;
import ru.evotor.framework.core.action.event.receipt.position_edited.PositionRemovedEvent;
import ru.evotor.framework.core.action.event.receipt.receipt_edited.ReceiptClearedEvent;
import ru.evotor.framework.core.action.event.receipt.receipt_edited.ReceiptClosedEvent;
import ru.evotor.framework.core.action.event.receipt.receipt_edited.ReceiptEvent;
import ru.evotor.framework.core.action.event.receipt.receipt_edited.ReceiptOpenedEvent;

public class ReactBroadcastReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        String eventName = null;
        Map<Object, Object> result = new HashMap<>();
        if (intent.getAction() != null && intent.getExtras() != null) {
            switch (intent.getAction()) {
                case "evotor.intent.action.inventory.CARD_OPEN":
                    eventName = "PRODUCT_CARD_OPEN";
                    result.put("productUuid", ProductCardOpenedEvent.create(intent.getExtras()).getProductUuid());
                    break;
                case "evotor.intent.action.receipt.sell.OPENED":
                    if (PreWriter.INSTANCE.preWriteReceiptEvent(ReceiptOpenedEvent.create(intent.getExtras()), result)) {
                        eventName = "SELL_RECEIPT_OPENED";
                    }
                    break;
                case "evotor.intent.action.receipt.payback.OPENED":
                    if (PreWriter.INSTANCE.preWriteReceiptEvent(ReceiptOpenedEvent.create(intent.getExtras()), result)) {
                        eventName = "PAYBACK_RECEIPT_OPENED";
                    }
                    break;
                case "evotor.intent.action.receipt.sell.CLEARED":
                    if (PreWriter.INSTANCE.preWriteReceiptEvent(ReceiptClearedEvent.create(intent.getExtras()), result)) {
                        eventName = "SELL_RECEIPT_CLEARED";
                    }
                    break;
                case "evotor.intent.action.receipt.payback.CLEARED":
                    if (PreWriter.INSTANCE.preWriteReceiptEvent(ReceiptClearedEvent.create(intent.getExtras()), result)) {
                        eventName = "PAYBACK_RECEIPT_CLEARED";
                    }
                    break;
                case "evotor.intent.action.receipt.sell.RECEIPT_CLOSED":
                    if (PreWriter.INSTANCE.preWriteReceiptEvent(ReceiptClosedEvent.create(intent.getExtras()), result)) {
                        eventName = "SELL_RECEIPT_CLOSED";
                    }
                    break;
                case "evotor.intent.action.receipt.payback.RECEIPT_CLOSED":
                    if (PreWriter.INSTANCE.preWriteReceiptEvent(ReceiptClosedEvent.create(intent.getExtras()), result)) {
                        eventName = "PAYBACK_RECEIPT_CLOSED";
                    }
                    break;
                case "evotor.intent.action.receipt.sell.POSITION_ADDED":
                    if(PreWriter.INSTANCE.preWritePositionEvent(PositionAddedEvent.create(intent.getExtras()), result)) {
                        eventName = "SELL_RECEIPT_POSITION_ADDED";
                    }
                    break;
                case "evotor.intent.action.receipt.payback.POSITION_ADDED":
                    if(PreWriter.INSTANCE.preWritePositionEvent(PositionAddedEvent.create(intent.getExtras()), result)) {
                        eventName = "PAYBACK_RECEIPT_POSITION_ADDED";
                    }
                    break;
                case "evotor.intent.action.receipt.sell.POSITION_EDITED":
                    if(PreWriter.INSTANCE.preWritePositionEvent(PositionEditedEvent.create(intent.getExtras()), result)) {
                        eventName = "SELL_RECEIPT_POSITION_EDITED";
                    }
                    break;
                case "evotor.intent.action.receipt.payback.POSITION_EDITED":
                    if(PreWriter.INSTANCE.preWritePositionEvent(PositionEditedEvent.create(intent.getExtras()), result)) {
                        eventName = "PAYBACK_RECEIPT_POSITION_EDITED";
                    }
                    break;
                case "evotor.intent.action.receipt.sell.POSITION_REMOVED":
                    if(PreWriter.INSTANCE.preWritePositionEvent(PositionRemovedEvent.create(intent.getExtras()), result)) {
                        eventName = "SELL_RECEIPT_POSITION_REMOVED";
                    }
                    break;
                case "evotor.intent.action.receipt.payback.POSITION_REMOVED":
                    if(PreWriter.INSTANCE.preWritePositionEvent(PositionRemovedEvent.create(intent.getExtras()), result)) {
                        eventName = "PAYBACK_RECEIPT_POSITION_REMOVED";
                    }
                    break;
                case "evotor.intent.action.cashDrawer.OPEN":
                    eventName = "CASH_DRAWER_OPEN";
                    result.put("cashDrawerId", CashDrawerOpenEvent.create(intent.getExtras()).getCashDrawerId());
                    break;
                case "evotor.intent.action.cashOperation.IN":
                    CashInEvent cashInEvent = CashInEvent.create(intent.getExtras());
                    if (cashInEvent != null) {
                        eventName = "CASH_IN";
                        result.put("total", cashInEvent.getTotal().doubleValue());
                        result.put("documentUuid", cashInEvent.getDocumentUuid());
                    }
                    break;
                case "evotor.intent.action.cashOperation.CASH_OUT":
                    CashOutEvent cashOutEvent = CashOutEvent.create(intent.getExtras());
                    if (cashOutEvent != null) {
                        eventName = "CASH_OUT";
                        result.put("total", cashOutEvent.getTotal().doubleValue());
                        result.put("documentUuid", cashOutEvent.getDocumentUuid());
                    }
            }
            if (eventName != null) {
                result.put("action", intent.getAction());
                EventModule.startService(context, eventName, result);
            }
        }
    }

}
