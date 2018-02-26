package com.evotor.converter

import ru.evotor.framework.core.action.event.receipt.changes.position.IPositionChange
import ru.evotor.framework.core.action.event.receipt.changes.position.PositionAdd
import ru.evotor.framework.core.action.event.receipt.changes.position.PositionEdit
import ru.evotor.framework.core.action.event.receipt.changes.position.PositionRemove
import ru.evotor.framework.core.action.event.receipt.payment.system.event.*
import ru.evotor.framework.core.action.event.receipt.position_edited.PositionEvent
import ru.evotor.framework.core.action.event.receipt.receipt_edited.ReceiptEvent
import ru.evotor.framework.payment.PaymentSystem
import java.math.BigDecimal

/**
 * Created by a.lunkov on 16.02.2018.
 */
object PreWriter {

    fun preWriteChanges(source: List<IPositionChange>): Map<*, *> {
        val result = HashMap<Any, Any>()
        val changes = ArrayList<Any>()
        for (i in source.indices) {
            val changeResult = HashMap<Any, Any?>()
            changeResult["type"] = source[i].getType().name
            val changeSource = source[i]
            when (changeSource) {
                is PositionAdd -> {
                    changeResult["__name__"] = "PositionAdd"
                    changeResult["position"] = Writer.writePosition((changeSource).position).toHashMap()
                }
                is PositionEdit -> {
                    changeResult["__name__"] = "PositionEdit"
                    changeResult["position"] = Writer.writePosition((changeSource).position).toHashMap()
                }
                is PositionRemove -> {
                    changeResult["__name__"] = "PositionRemove"
                    changeResult["positionUuid"] = (changeSource).getPositionUuid()
                }
            }
            changes.add(changeResult)
        }
        result["changes"] = changes
        return result
    }

    fun preWriteReceiptDiscount(discount: BigDecimal, receiptUuid: String): Map<*, *> {
        val result = HashMap<Any, Any>()
        result["discount"] = discount.toDouble()
        result["receiptUuid"] = receiptUuid
        return result
    }

    fun preWritePaymentSystem(paymentSystem: PaymentSystem): Map<*, *> {
        val result = HashMap<Any, Any>()
        result["paymentSystemId"] = paymentSystem.paymentSystemId
        result["paymentType"] = paymentSystem.paymentType.name
        result["userDescription"] = paymentSystem.userDescription
        return result
    }

    fun preWritePaymentSystemEvent(source: PaymentSystemEvent): Map<*, *> {
        val result = HashMap<Any, Any?>()
        result["operationType"] = source.operationType.name
        result["event"] = when (source.operationType) {
            PaymentSystemEvent.OperationType.SELL -> preWritePaymentSystemSellEvent(source as PaymentSystemSellEvent)
            PaymentSystemEvent.OperationType.SELL_CANCEL -> preWritePaymentSystemSellCancelEvent(source as PaymentSystemSellCancelEvent)
            PaymentSystemEvent.OperationType.PAYBACK -> preWritePaymentSystemPaybackEvent(source as PaymentSystemPaybackEvent)
            PaymentSystemEvent.OperationType.PAYBACK_CANCEL -> preWritePaymentSystemPaybackCancelEvent(source as PaymentSystemPaybackCancelEvent)
            else -> null
        }
        return result
    }

    private fun preWritePaymentSystemSellEvent(source: PaymentSystemSellEvent): Map<*, *> {
        val result = HashMap<Any, Any?>()
        result["receiptUuid"] = source.receiptUuid
        result["accountId"] = source.accoundId
        result["sum"] = source.sum.toDouble()
        result["description"] = source.description
        return result
    }

    private fun preWritePaymentSystemSellCancelEvent(source: PaymentSystemSellCancelEvent): Map<*, *> {
        val result = HashMap<Any, Any?>()
        result["receiptUuid"] = source.receiptUuid
        result["accountId"] = source.accountId
        result["sum"] = source.sum.toDouble()
        result["sum"] = source.rrn
        result["description"] = source.description
        return result
    }

    private fun preWritePaymentSystemPaybackEvent(source: PaymentSystemPaybackEvent): Map<*, *> {
        val result = HashMap<Any, Any?>()
        result["receiptUuid"] = source.receiptUuid
        result["accountId"] = source.accountId
        result["sum"] = source.sum.toDouble()
        result["sum"] = source.rrn
        result["description"] = source.description
        return result
    }

    private fun preWritePaymentSystemPaybackCancelEvent(source: PaymentSystemPaybackCancelEvent): Map<*, *> {
        val result = HashMap<Any, Any?>()
        result["receiptUuid"] = source.receiptUuid
        result["accountId"] = source.accountId
        result["sum"] = source.sum.toDouble()
        result["sum"] = source.rrn
        result["description"] = source.description
        return result
    }

    fun preWriteReceiptEvent(source: ReceiptEvent?, result: MutableMap<Any, Any>): Boolean {
        return if (source != null) {
            result["receiptUuid"] = source.receiptUuid
            true
        } else {
            false
        }
    }

    fun preWritePositionEvent(source: PositionEvent?, result: MutableMap<Any, Any>): Boolean {
        return if (source != null) {
            result["receiptUuid"] = source.receiptUuid
            result["position"] = Writer.writePosition(source.position).toHashMap()
            true
        } else {
            false
        }
    }

}