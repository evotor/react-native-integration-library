package com.evotor.services.broadcast;

/**
 * Created by a.lunkov on 18.10.2017.
 */

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.evotor.modules.EventModule;
import com.facebook.react.bridge.Arguments;
import com.evotor.utilities.Writer;
import com.facebook.react.bridge.WritableMap;

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
        WritableMap result = Arguments.createMap();
        if (intent.getAction() != null && intent.getExtras() != null) {
            switch (intent.getAction()) {
                case "evotor.intent.action.inventory.CARD_OPEN":
                    eventName = "PRODUCT_CARD_OPEN";
                    result.putString("productUuid", ProductCardOpenedEvent.create(intent.getExtras()).getProductUuid());
                    break;
                case "evotor.intent.action.receipt.sell.OPENED":
                    if (Writer.INSTANCE.writeReceiptEvent(ReceiptOpenedEvent.create(intent.getExtras()), result)) {
                        eventName = "SELL_RECEIPT_OPENED";
                    }
                    break;
                case "evotor.intent.action.receipt.payback.OPENED":
                    if (Writer.INSTANCE.writeReceiptEvent(ReceiptOpenedEvent.create(intent.getExtras()), result)) {
                        eventName = "PAYBACK_RECEIPT_OPENED";
                    }
                    break;
                case "evotor.intent.action.receipt.sell.CLEARED":
                    if (Writer.INSTANCE.writeReceiptEvent(ReceiptClearedEvent.create(intent.getExtras()), result)) {
                        eventName = "SELL_RECEIPT_CLEARED";
                    }
                    break;
                case "evotor.intent.action.receipt.payback.CLEARED":
                    if (Writer.INSTANCE.writeReceiptEvent(ReceiptClearedEvent.create(intent.getExtras()), result)) {
                        eventName = "PAYBACK_RECEIPT_CLEARED";
                    }
                    break;
                case "evotor.intent.action.receipt.sell.RECEIPT_CLOSED":
                    if (Writer.INSTANCE.writeReceiptEvent(ReceiptClosedEvent.create(intent.getExtras()), result)) {
                        eventName = "SELL_RECEIPT_CLOSED";
                    }
                    break;
                case "evotor.intent.action.receipt.payback.RECEIPT_CLOSED":
                    if (Writer.INSTANCE.writeReceiptEvent(ReceiptClosedEvent.create(intent.getExtras()), result)) {
                        eventName = "PAYBACK_RECEIPT_CLOSED";
                    }
                    break;
                case "evotor.intent.action.receipt.sell.POSITION_ADDED":
                    if(Writer.INSTANCE.writePositionEvent(PositionAddedEvent.create(intent.getExtras()), result)) {
                        eventName = "SELL_RECEIPT_POSITION_ADDED";
                    }
                    break;
                case "evotor.intent.action.receipt.payback.POSITION_ADDED":
                    if(Writer.INSTANCE.writePositionEvent(PositionAddedEvent.create(intent.getExtras()), result)) {
                        eventName = "PAYBACK_RECEIPT_POSITION_ADDED";
                    }
                    break;
                case "evotor.intent.action.receipt.sell.POSITION_EDITED":
                    if(Writer.INSTANCE.writePositionEvent(PositionEditedEvent.create(intent.getExtras()), result)) {
                        eventName = "SELL_RECEIPT_POSITION_EDITED";
                    }
                    break;
                case "evotor.intent.action.receipt.payback.POSITION_EDITED":
                    if(Writer.INSTANCE.writePositionEvent(PositionEditedEvent.create(intent.getExtras()), result)) {
                        eventName = "PAYBACK_RECEIPT_POSITION_EDITED";
                    }
                    break;
                case "evotor.intent.action.receipt.sell.POSITION_REMOVED":
                    if(Writer.INSTANCE.writePositionEvent(PositionRemovedEvent.create(intent.getExtras()), result)) {
                        eventName = "SELL_RECEIPT_POSITION_REMOVED";
                    }
                    break;
                case "evotor.intent.action.receipt.payback.POSITION_REMOVED":
                    if(Writer.INSTANCE.writePositionEvent(PositionRemovedEvent.create(intent.getExtras()), result)) {
                        eventName = "PAYBACK_RECEIPT_POSITION_REMOVED";
                    }
                    break;
                case "evotor.intent.action.cashDrawer.OPEN":
                    eventName = "CASH_DRAWER_OPEN";
                    result.putInt("cashDrawerId", CashDrawerOpenEvent.create(intent.getExtras()).getCashDrawerId());
                    break;
                case "evotor.intent.action.cashOperation.IN":
                    CashInEvent cashInEvent = CashInEvent.create(intent.getExtras());
                    if (cashInEvent != null) {
                        eventName = "CASH_IN";
                        result.putDouble("total", cashInEvent.getTotal().doubleValue());
                        result.putString("documentUuid", cashInEvent.getDocumentUuid());
                    }
                    break;
                case "evotor.intent.action.cashOperation.CASH_OUT":
                    CashOutEvent cashOutEvent = CashOutEvent.create(intent.getExtras());
                    if (cashOutEvent != null) {
                        eventName = "CASH_OUT";
                        result.putDouble("total", cashOutEvent.getTotal().doubleValue());
                        result.putString("documentUuid", cashOutEvent.getDocumentUuid());
                    }
            }
            if (eventName != null) {
                result.putString("action", intent.getAction());
                EventModule.startService(context, eventName, Arguments.toBundle(result));
            }
        }
    }

}
