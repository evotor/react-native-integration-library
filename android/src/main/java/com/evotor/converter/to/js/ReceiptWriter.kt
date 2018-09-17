package com.evotor.converter.to.js

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import ru.evotor.framework.component.PaymentPerformer
import ru.evotor.framework.core.action.event.receipt.changes.position.IPositionChange
import ru.evotor.framework.core.action.event.receipt.changes.position.PositionAdd
import ru.evotor.framework.core.action.event.receipt.changes.position.PositionEdit
import ru.evotor.framework.core.action.event.receipt.changes.position.PositionRemove
import ru.evotor.framework.payment.PaymentPurpose
import ru.evotor.framework.payment.PaymentSystem
import ru.evotor.framework.receipt.Payment
import ru.evotor.framework.receipt.Position
import ru.evotor.framework.receipt.PrintGroup
import ru.evotor.framework.receipt.Receipt
import ru.evotor.query.Cursor
import java.math.BigDecimal

/**
 * Created by a.lunkov on 16.03.2018.
 */
object ReceiptWriter {

    fun writePosition(source: Position): WritableMap {
        val result = Arguments.createMap()
        result.putString("uuid", source.uuid)
        result.putString("productUuid", source.productUuid)
        result.putString("productCode", source.productCode)
        result.putString("productType", source.productType.name)
        result.putString("name", source.name)
        result.putString("measureName", source.measureName)
        result.putInt("measurePrecision", source.measurePrecision)
        result.putString("taxNumber", source.taxNumber?.name)
        result.putDouble("price", source.price.toDouble())
        result.putDouble("priceWithDiscountPosition", source.priceWithDiscountPosition.toDouble())
        result.putDouble("quantity", source.quantity.toDouble())
        result.putString("barcode", source.barcode)
        result.putString("mark", source.mark)
        val alcoholByVolume = source.alcoholByVolume
        if (alcoholByVolume != null) {
            result.putDouble("alcoholByVolume", alcoholByVolume.toDouble())
        } else {
            result.putNull("alcoholByVolume")
        }
        val alcoholProductKindCode = source.alcoholProductKindCode
        if (alcoholProductKindCode != null) {
            result.putInt("alcoholProductKindCode", alcoholProductKindCode.toInt())
        } else {
            result.putNull("alcoholProductKindCode")
        }
        val tareVolume = source.tareVolume
        if (tareVolume != null) {
            result.putDouble("tareVolume", tareVolume.toDouble())
        } else {
            result.putNull("tareVolume")
        }
        val extras = Arguments.createArray()
        for (e in source.extraKeys) {
            val extra = Arguments.createMap()
            extra.putString("identity", e.identity)
            extra.putString("appId", e.appId)
            extra.putString("description", e.description)
            extras.pushMap(extra)
        }
        result.putArray("extraKeys", extras)
        val subPositions = Arguments.createArray()
        if (source.subPositions.size > 0) {
            subPositions.pushMap(writePosition(source.subPositions[0]))
        }
        result.putArray("subPositions", subPositions)
        return result
    }

    fun writePositions(source: List<Position>): WritableArray {
        val result = Arguments.createArray()
        for (i in source.indices) {
            result.pushMap(writePosition(source[i]))
        }
        return result
    }

    fun writeChanges(source: List<IPositionChange>): WritableArray {
        val result = Arguments.createArray()
        for (i in source.indices) {
            val changeResult = Arguments.createMap()
            changeResult.putString("type", source[i].getType().name)
            val changeSource = source[i]
            when (changeSource) {
                is PositionAdd -> {
                    changeResult.putString("__name__", "PositionAdd")
                    changeResult.putMap("position", writePosition((changeSource).position))
                }
                is PositionEdit -> {
                    changeResult.putString("__name__", "PositionEdit")
                    changeResult.putMap("position", writePosition((changeSource).position))
                }
                is PositionRemove -> {
                    changeResult.putString("__name__", "PositionRemove")
                    changeResult.putString("positionUuid", changeSource.getPositionUuid())
                }
            }
            result.pushMap(changeResult)
        }
        return result
    }

    fun writePaymentSystem(paymentSystem: PaymentSystem): WritableMap {
        val result = Arguments.createMap()
        result.putString("paymentSystemId", paymentSystem.paymentSystemId)
        result.putString("paymentType", paymentSystem.paymentType.name)
        result.putString("userDescription", paymentSystem.userDescription)
        return result
    }

    fun writePaymentPurpose(source: PaymentPurpose): WritableMap {
        val result = Arguments.createMap()
        result.putString("identifier", source.identifier)
        result.putString("paymentSystemId", source.paymentSystemId)
        result.putMap("paymentPerformer", source.paymentPerformer?.let { writePaymentPerformer(it) })
        result.putDouble("total", source.total.toDouble())
        result.putString("accountId", source.accountId)
        result.putString("userMessage", source.userMessage)
        return result
    }

    private fun writePaymentPerformer(source: PaymentPerformer): WritableMap {
        val result = Arguments.createMap()
        result.putMap("paymentSystem", source.paymentSystem?.let { writePaymentSystem(it) })
        result.putString("packageName", source.packageName)
        result.putString("componentName", source.componentName)
        result.putString("appUuid", source.appUuid)
        result.putString("appName", source.appName)
        return result
    }

    fun writePaymentPerformers(source: List<PaymentPerformer>): WritableArray {
        val result = Arguments.createArray()
        source.forEach {
            result.pushMap(writePaymentPerformer(it))
        }
        return result
    }

    fun writeReceipt(source: Receipt): WritableMap {
        val result = Arguments.createMap()
        result.putMap("header", writeReceiptHeader(source.header))
        val printDocuments = Arguments.createArray()
        for (i in 0 until source.printDocuments.size) {
            val (printGroup, positions1, payments, changes, discounts) = source.printDocuments[i]
            val printReceiptResult = Arguments.createMap()
            printReceiptResult.putMap("printGroup", printGroup?.let { writePrintGroup(it) })
            val positions = Arguments.createArray()
            for (j in 0 until positions1.size) {
                positions.pushMap(writePosition(positions1[j]))
            }
            printReceiptResult.putArray("positions", positions)
            printReceiptResult.putArray("payments", writePayments(payments))
            printReceiptResult.putArray("changes", writePayments(changes))
            discounts?.let {
                val discountsResult = Arguments.createMap()
                for (key in discounts.keys) {
                    discountsResult.putDouble(key, discounts[key]?.toDouble() ?: (0).toDouble())
                }
                printReceiptResult.putMap("discounts", discountsResult)
            }
            printDocuments.pushMap(printReceiptResult)
        }
        result.putArray("printDocuments", printDocuments)
        return result
    }

    private fun writeReceiptHeader(source: Receipt.Header): WritableMap {
        val result = Arguments.createMap()
        result.putString("uuid", source.uuid)
        result.putString("number", source.number)
        result.putString("type", source.type.name)
        result.putString("date", source.date?.toString())
        result.putString("clientEmail", source.clientEmail)
        result.putString("clientPhone", source.clientPhone)
        result.putString("extra", source.extra)
        return result
    }

    fun writeReceiptHeaders(source: Cursor<Receipt.Header?>?): WritableArray {
        val result = Arguments.createArray()
        source?.use {
            if (it.moveToFirst()) {
                result.pushMap(it.getValue()?.let { value -> writeReceiptHeader(value) })
                while (it.moveToNext()) {
                    result.pushMap(it.getValue()?.let { value -> writeReceiptHeader(value) })
                }
            }
        }
        return result
    }

    private fun writePrintGroup(source: PrintGroup): WritableMap {
        val result = Arguments.createMap()
        result.putString("identifier", source.identifier)
        result.putString("type", source.type.name)
        result.putString("orgName", source.orgName)
        result.putString("orgInn", source.orgInn)
        result.putString("orgAddress", source.orgAddress)
        result.putString("taxationSystem", source.taxationSystem?.name)
        result.putBoolean("shouldPrintReceipt", source.isShouldPrintReceipt)
        return result
    }

    private fun writePayments(source: Map<Payment, BigDecimal>): WritableArray {
        val result = Arguments.createArray()
        for (keySource in source.keys) {
            val payment = Arguments.createMap()
            val keyResult = Arguments.createMap()
            keyResult.putString("uuid", keySource.uuid)
            keyResult.putDouble("value", keySource.value.toDouble())
            keyResult.putMap("system", keySource.paymentSystem?.let { writePaymentSystem(it) })
            keyResult.putString("purposeIdentifier", keySource.purposeIdentifier)
            keyResult.putString("accountId", keySource.accountId)
            keyResult.putString("accountUserDescription", keySource.accountUserDescription)
            payment.putMap("key", keyResult)
            payment.putDouble("value", source[keySource]!!.toDouble())
        }
        return result
    }

}