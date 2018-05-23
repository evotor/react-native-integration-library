package com.evotor.converter.tojs

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import org.json.JSONException
import org.json.JSONObject
import ru.evotor.framework.core.action.event.receipt.changes.position.IPositionChange
import ru.evotor.framework.core.action.event.receipt.changes.position.PositionAdd
import ru.evotor.framework.core.action.event.receipt.changes.position.PositionEdit
import ru.evotor.framework.core.action.event.receipt.changes.position.PositionRemove
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
                    changeResult.putMap("position", ReceiptWriter.writePosition((changeSource).position))
                }
                is PositionEdit -> {
                    changeResult.putString("__name__", "PositionEdit")
                    changeResult.putMap("position", ReceiptWriter.writePosition((changeSource).position))
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

    fun writeReceipt(source: Receipt): WritableMap {
        val result = Arguments.createMap()
        result.putMap("header", writeReceiptHeader(source.header))
        val printDocuments = Arguments.createArray()
        for (i in 0 until source.printDocuments.size) {
            val (printGroup, positions1, payments, changes) = source.printDocuments[i]
            val printReceiptResult = Arguments.createMap()
            printReceiptResult.putMap("printGroup", if (printGroup == null) null else writePrintGroup(printGroup))
            val positions = Arguments.createArray()
            for (j in 0 until positions1.size) {
                positions.pushMap(writePosition(positions1[j]))
            }
            printReceiptResult.putArray("positions", positions)
            printReceiptResult.putMap("payments", writePayments(payments))
            printReceiptResult.putMap("changes", writePayments(changes))
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
        result.putString("date", if (source.date == null) null else source.date.toString())
        result.putString("clientEmail", source.clientEmail)
        result.putString("clientPhone", source.clientPhone)
        result.putString("extra", source.extra)
        return result
    }

    fun writeReceiptHeaders(source: Cursor<Receipt.Header?>?): WritableArray {
        val result = Arguments.createArray()
        if (source != null && source.moveToFirst()) {
            while (source.moveToNext()) {
                val item = source.getValue()
                result.pushMap(if (item == null) null else writeReceiptHeader(item))
            }
            source.close()
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
        result.putString("taxationSystem", source.taxationSystem.name)
        result.putBoolean("shouldPrintReceipt", source.isShouldPrintReceipt)
        return result
    }

    private fun writePayments(source: Map<Payment, BigDecimal>): WritableMap {
        val result = Arguments.createMap()
        for (key in source.keys) {
            val payment = JSONObject()
            try {
                payment.put("uuid", key.uuid)
                payment.put("value", key.value.toDouble())
                payment.put("system", if (key.system == null) null else writePaymentSystem(key.system!!))
                payment.put("purposeIdentifier", key.purposeIdentifier)
                payment.put("accountId", key.accountId)
                payment.put("accountUserDescription", key.accountUserDescription)
            } catch (e: JSONException) {
                e.printStackTrace()
            }
            val value = source[key]
            if (value != null) {
                result.putDouble(
                        payment.toString(),
                        value.toDouble()
                )
            } else {
                result.putNull(payment.toString())
            }
        }
        return result
    }

}