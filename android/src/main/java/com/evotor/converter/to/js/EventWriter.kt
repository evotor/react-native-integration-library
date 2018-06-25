package com.evotor.converter.to.js

import android.content.Intent
import android.os.Bundle
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import ru.evotor.framework.core.action.event.receipt.payment.system.event.*
import ru.evotor.framework.core.action.event.receipt.position_edited.PositionEvent
import ru.evotor.framework.core.action.event.receipt.receipt_edited.ReceiptEvent
import java.math.BigDecimal

/**
 * Created by a.lunkov on 16.03.2018.
 */
object EventWriter {

    fun writeLocalEvent(eventName: String, data: Any?): WritableMap {
        val result = Arguments.createMap()
        result.putString("type", eventName)
        NavigationWriter.writeMapItem("extras", data, result)
        return result
    }

    fun writeReceiptDiscountEvent(discount: BigDecimal, receiptUuid: String): WritableArray {
        val result = Arguments.createArray()
        result.pushDouble(discount.toDouble())
        result.pushString(receiptUuid)
        return result
    }

    fun writePaymentSystemEvent(source: PaymentSystemEvent): WritableArray {
        val result = Arguments.createArray()
        result.pushString(source.operationType.name)
        result.pushMap(
                when (source.operationType) {
                    PaymentSystemEvent.OperationType.SELL -> writePaymentSystemSellEvent(source as PaymentSystemSellEvent)
                    PaymentSystemEvent.OperationType.SELL_CANCEL -> writePaymentSystemSellCancelEvent(source as PaymentSystemSellCancelEvent)
                    PaymentSystemEvent.OperationType.PAYBACK -> writePaymentSystemPaybackEvent(source as PaymentSystemPaybackEvent)
                    PaymentSystemEvent.OperationType.PAYBACK_CANCEL -> writePaymentSystemPaybackCancelEvent(source as PaymentSystemPaybackCancelEvent)
                    else -> null
                }
        )
        return result
    }

    private fun writePaymentSystemSellEvent(source: PaymentSystemSellEvent): WritableMap {
        val result = Arguments.createMap()
        result.putString("receiptUuid", source.receiptUuid)
        result.putString("accountId", source.accoundId)
        result.putDouble("sum", source.sum.toDouble())
        result.putString("description", source.description)
        return result
    }

    private fun writePaymentSystemSellCancelEvent(source: PaymentSystemSellCancelEvent): WritableMap {
        val result = Arguments.createMap()
        result.putString("receiptUuid", source.receiptUuid)
        result.putString("accountId", source.accountId)
        result.putDouble("sum", source.sum.toDouble())
        result.putString("rrn", source.rrn)
        result.putString("description", source.description)
        return result
    }

    private fun writePaymentSystemPaybackEvent(source: PaymentSystemPaybackEvent): WritableMap {
        val result = Arguments.createMap()
        result.putString("receiptUuid", source.receiptUuid)
        result.putString("accountId", source.accountId)
        result.putDouble("sum", source.sum.toDouble())
        result.putString("rrn", source.rrn)
        result.putString("description", source.description)
        return result
    }

    private fun writePaymentSystemPaybackCancelEvent(source: PaymentSystemPaybackCancelEvent): WritableMap {
        val result = Arguments.createMap()
        result.putString("receiptUuid", source.receiptUuid)
        result.putString("accountId", source.accountId)
        result.putDouble("sum", source.sum.toDouble())
        result.putString("rrn", source.rrn)
        result.putString("description", source.description)
        return result
    }

    fun writeReceiptEvent(source: ReceiptEvent?, result: WritableMap): Boolean =
            if (source != null) {
                result.putString("receiptUuid", source.receiptUuid)
                true
            } else {
                false
            }


    fun writePositionEvent(source: PositionEvent?, result: WritableMap): Boolean =
            if (source != null) {
                result.putString("receiptUuid", source.receiptUuid)
                result.putMap("position", ReceiptWriter.writePosition(source.position))
                true
            } else {
                false
            }


    fun writeActivityResultEvent(requestCode: Int, resultCode: Int, data: Intent?): WritableArray {
        val result = Arguments.createArray()
        result.pushInt(requestCode)
        result.pushInt(resultCode)
        result.pushMap(data?.let { NavigationWriter.writeIntent(it) })
        return result
    }

    fun writePushNotification(data: Bundle, messageId: Long): WritableArray {
        val result = Arguments.createArray()
        result.pushMap(NavigationWriter.writeBundle(data))
        result.pushInt(messageId.toInt())
        return result
    }

}