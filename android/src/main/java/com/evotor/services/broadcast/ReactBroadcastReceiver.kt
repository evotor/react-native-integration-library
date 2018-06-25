package com.evotor.services.broadcast

/**
 * Created by a.lunkov on 18.10.2017.
 */

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

import com.evotor.converter.to.js.EventWriter
import com.evotor.modules.EventModule
import com.facebook.react.bridge.Arguments

import ru.evotor.framework.core.action.event.cash_drawer.CashDrawerOpenEvent
import ru.evotor.framework.core.action.event.cash_operations.CashInEvent
import ru.evotor.framework.core.action.event.cash_operations.CashOutEvent
import ru.evotor.framework.core.action.event.inventory.ProductCardOpenedEvent
import ru.evotor.framework.core.action.event.receipt.position_edited.PositionAddedEvent
import ru.evotor.framework.core.action.event.receipt.position_edited.PositionEditedEvent
import ru.evotor.framework.core.action.event.receipt.position_edited.PositionRemovedEvent
import ru.evotor.framework.core.action.event.receipt.receipt_edited.ReceiptClearedEvent
import ru.evotor.framework.core.action.event.receipt.receipt_edited.ReceiptClosedEvent
import ru.evotor.framework.core.action.event.receipt.receipt_edited.ReceiptOpenedEvent

class ReactBroadcastReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        var eventName: String? = null
        val result = Arguments.createMap()
        if (intent.action != null && intent.extras != null) {
            when (intent.action) {
                "evotor.intent.action.inventory.CARD_OPEN" -> {
                    eventName = "PRODUCT_CARD_OPEN"
                    result.putString("productUuid", ProductCardOpenedEvent.create(intent.extras)!!.productUuid)
                }
                "evotor.intent.action.receipt.sell.OPENED" ->
                    if (EventWriter.writeReceiptEvent(ReceiptOpenedEvent.create(intent.extras), result)) {
                    eventName = "SELL_RECEIPT_OPENED"
                }
                "evotor.intent.action.receipt.payback.OPENED" ->
                    if (EventWriter.writeReceiptEvent(ReceiptOpenedEvent.create(intent.extras), result)) {
                    eventName = "PAYBACK_RECEIPT_OPENED"
                }
                "evotor.intent.action.receipt.sell.CLEARED" ->
                    if (EventWriter.writeReceiptEvent(ReceiptClearedEvent.create(intent.extras), result)) {
                    eventName = "SELL_RECEIPT_CLEARED"
                }
                "evotor.intent.action.receipt.payback.CLEARED" ->
                    if (EventWriter.writeReceiptEvent(ReceiptClearedEvent.create(intent.extras), result)) {
                    eventName = "PAYBACK_RECEIPT_CLEARED"
                }
                "evotor.intent.action.receipt.sell.RECEIPT_CLOSED" ->
                    if (EventWriter.writeReceiptEvent(ReceiptClosedEvent.create(intent.extras), result)) {
                    eventName = "SELL_RECEIPT_CLOSED"
                }
                "evotor.intent.action.receipt.payback.RECEIPT_CLOSED" ->
                    if (EventWriter.writeReceiptEvent(ReceiptClosedEvent.create(intent.extras), result)) {
                    eventName = "PAYBACK_RECEIPT_CLOSED"
                }
                "evotor.intent.action.receipt.sell.POSITION_ADDED" ->
                    if (EventWriter.writePositionEvent(PositionAddedEvent.create(intent.extras), result)) {
                    eventName = "SELL_RECEIPT_POSITION_ADDED"
                }
                "evotor.intent.action.receipt.payback.POSITION_ADDED" ->
                    if (EventWriter.writePositionEvent(PositionAddedEvent.create(intent.extras), result)) {
                    eventName = "PAYBACK_RECEIPT_POSITION_ADDED"
                }
                "evotor.intent.action.receipt.sell.POSITION_EDITED" ->
                    if (EventWriter.writePositionEvent(PositionEditedEvent.create(intent.extras), result)) {
                    eventName = "SELL_RECEIPT_POSITION_EDITED"
                }
                "evotor.intent.action.receipt.payback.POSITION_EDITED" ->
                    if (EventWriter.writePositionEvent(PositionEditedEvent.create(intent.extras), result)) {
                    eventName = "PAYBACK_RECEIPT_POSITION_EDITED"
                }
                "evotor.intent.action.receipt.sell.POSITION_REMOVED" ->
                    if (EventWriter.writePositionEvent(PositionRemovedEvent.create(intent.extras), result)) {
                    eventName = "SELL_RECEIPT_POSITION_REMOVED"
                }
                "evotor.intent.action.receipt.payback.POSITION_REMOVED" ->
                    if (EventWriter.writePositionEvent(PositionRemovedEvent.create(intent.extras), result)) {
                    eventName = "PAYBACK_RECEIPT_POSITION_REMOVED"
                }
                "evotor.intent.action.cashDrawer.OPEN" -> {
                    eventName = "CASH_DRAWER_OPEN"
                    result.putDouble("cashDrawerId", CashDrawerOpenEvent.create(intent.extras)!!.cashDrawerId.toDouble())
                }
                "evotor.intent.action.cashOperation.CASH_IN" -> {
                    val cashInEvent = CashInEvent.create(intent.extras)
                    if (cashInEvent != null) {
                        eventName = "CASH_IN"
                        result.putDouble("total", cashInEvent.total.toDouble())
                        result.putString("documentUuid", cashInEvent.documentUuid)
                    }
                }
                "evotor.intent.action.cashOperation.CASH_OUT" -> {
                    val cashOutEvent = CashOutEvent.create(intent.extras)
                    if (cashOutEvent != null) {
                        eventName = "CASH_OUT"
                        result.putDouble("total", cashOutEvent.total.toDouble())
                        result.putString("documentUuid", cashOutEvent.documentUuid)
                    }
                }
            }
            if (eventName != null) {
                result.putString("action", intent.action)
                EventModule.emit(context, eventName, result)
            }
        }
    }

}
