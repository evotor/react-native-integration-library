package com.evotor.converter

import android.content.Intent
import android.os.Bundle

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap

import org.json.JSONException
import org.json.JSONObject

import java.math.BigDecimal

import ru.evotor.devices.commons.scales.Weight
import ru.evotor.framework.Cursor
import ru.evotor.framework.core.action.command.open_receipt_command.OpenReceiptCommandResult
import ru.evotor.framework.core.action.command.print_receipt_command.PrintReceiptCommandResult
import ru.evotor.framework.inventory.ProductExtra
import ru.evotor.framework.inventory.ProductItem
import ru.evotor.framework.inventory.field.Field
import ru.evotor.framework.payment.PaymentSystem
import ru.evotor.framework.receipt.Payment
import ru.evotor.framework.receipt.Position
import ru.evotor.framework.receipt.PrintGroup
import ru.evotor.framework.receipt.Receipt
import ru.evotor.framework.users.Grant
import ru.evotor.framework.users.User

/**
 * Created by a.lunkov on 25.10.2017.
 */

object Writer {

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

    private fun writePaymentSystem(paymentSystem: PaymentSystem): WritableMap {
        val result = Arguments.createMap()
        result.putString("paymentSystemId", paymentSystem.paymentSystemId)
        result.putString("paymentType", paymentSystem.paymentType.name)
        result.putString("userDescription", paymentSystem.userDescription)
        return result
    }

    fun writeOpenReceiptCommandResult(source: OpenReceiptCommandResult): WritableMap {
        val result = Arguments.createMap()
        result.putString("receiptUuid", source.receiptUuid)
        return result
    }

    fun writePrintReceiptCommandResult(source: PrintReceiptCommandResult): WritableMap {
        val result = Arguments.createMap()
        result.putString("receiptNumber", source.receiptNumber)
        result.putString("receiptUuid", source.receiptUuid)
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

    fun writeReceiptHeaders(source: Cursor<*>): WritableArray {
        val result = Arguments.createArray()
        source.moveToFirst()
        while (source.moveToNext()) {
            result.pushMap(writeReceiptHeader(source.getValue() as Receipt.Header))
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

    fun writeBarcodes(source: List<String>): WritableArray {
        val result = Arguments.createArray()
        for (i in source.indices) {
            result.pushString(source[i])
        }
        return result
    }

    fun writeProductItem(source: ProductItem): WritableMap {
        val result = Arguments.createMap()
        result.putString("uuid", source.uuid)
        result.putString("parentUuid", source.parentUuid)
        result.putString("code", source.code)
        result.putString("name", source.name)
        if (source is ProductItem.Product) {
            result.putString("taxNumber", source.taxNumber.name)
            result.putString("type", source.type.name)
            result.putDouble("price", source.price.toDouble())
            result.putDouble("quantity", source.quantity.toDouble())
            result.putString("description", source.description)
            result.putString("measureName", source.measureName)
            result.putDouble("measurePrecision", source.measurePrecision.toDouble())
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
        } else if (source is ProductItem.ProductGroup) {
            result.putString("taxNumber", source.taxNumber.name)

        }
        return result
    }

    fun writeField(source: Field): WritableMap {
        val result = Arguments.createMap()
        result.putString("name", source.name)
        result.putString("fieldUUID", source.fieldUUID)
        result.putString("title", source.title)
        result.putString("type", source.type.name)
        return result
    }

    fun writeProductExtras(source: List<ProductExtra>): WritableArray {
        val result = Arguments.createArray()
        for (i in source.indices) {
            val (uuid, name, commodityUUID, fieldUUID, fieldValue, data) = source[i]
            val itemResult = Arguments.createMap()
            itemResult.putString("uuid", uuid)
            itemResult.putString("name", name)
            itemResult.putString("commodityUUID", commodityUUID)
            itemResult.putString("fieldUUID", fieldUUID)
            itemResult.putString("fieldValue", fieldValue?.toString())
            itemResult.putString("data", data)
            result.pushMap(itemResult)
        }
        return result
    }

    fun writeUser(source: User): WritableMap {
        val result = Arguments.createMap()
        result.putString("uuid", source.uuid)
        result.putString("secondName", source.secondName)
        result.putString("firstName", source.firstName)
        result.putString("phone", source.phone)
        result.putString("pin", source.pin)
        result.putString("roleUuid", source.roleUuid)
        result.putString("roleTitle", source.roleTitle)
        return result
    }

    fun writeUsers(source: List<User>): WritableArray {
        val result = Arguments.createArray()
        for (i in source.indices) {
            result.pushMap(writeUser(source[i]))
        }
        return result
    }

    fun writeGrants(source: List<Grant>): WritableArray {
        val result = Arguments.createArray()
        for (i in source.indices) {
            val item = Arguments.createMap()
            item.putString("title", source[i].title)
            item.putString("roleUuid", source[i].roleUuid)
            result.pushMap(item)
        }
        return result
    }

    fun writeWeight(source: Weight): WritableMap {
        val result = Arguments.createMap()
        result.putDouble("weightInGrams", source.weightInGrams.toDouble())
        result.putBoolean("supportStable", source.isSupportStable)
        result.putBoolean("stable", source.isStable)
        return result
    }

    /**
     * Navigation
     */

    fun writeIntent(source: Intent): WritableMap {
        val result = Arguments.createMap()
        result.putString("className", if (source.component == null) null else source.component.className)
        result.putString("packageName", source.`package`)
        result.putString("action", source.action)
        result.putMap("extras", if (source.extras == null) null else writeIntentExtras(source.extras))
        val categories = Arguments.createArray()
        if (source.categories != null) {
            for (item in source.categories) {
                categories.pushString(item)
            }
        }
        result.putArray("categories", categories)
        result.putInt("flags", source.flags)
        return result
    }

    fun writeIntentExtras(source: Bundle): WritableMap {
        val result = Arguments.createMap()
        for (key in source.keySet()) {
            writeIntentExtraObjectItem(key, source.get(key), result)
        }
        return result
    }

    private fun writeIntentExtraObjectItem(key: String, item: Any?, result: WritableMap) {
        if (item == null) {
            result.putNull(key)
        } else {
            when (item) {
                is Nothing -> result.putNull(key)
                is Boolean -> result.putBoolean(key, item)
                is Int -> result.putInt(key, item)
                is Double -> result.putDouble(key, item)
                is String -> result.putString(key, item)
                is Map<*, *> -> result.putMap(key, writeIntentExtraObject(item))
                is List<*> -> result.putArray(key, writeIntentExtraArray(item))
                is Bundle -> result.putMap(key, writeIntentExtras(item))
            }
        }
    }

    private fun writeIntentExtraObject(source: Map<*, *>): WritableMap {
        val result = Arguments.createMap()
        for (key in source.keys) {
            writeIntentExtraObjectItem(key as String, source[key], result)
        }
        return result
    }

    private fun writeIntentExtraArray(source: List<*>): WritableArray {
        val result = Arguments.createArray()
        for (item in source) {
            when (item) {
                is Nothing -> result.pushNull()
                is Boolean -> result.pushBoolean(item)
                is Int -> result.pushInt(item)
                is Double -> result.pushDouble(item)
                is String -> result.pushString(item)
                is Map<*, *> -> result.pushMap(writeIntentExtraObject(item))
                is List<*> -> result.pushArray(writeIntentExtraArray(item))
                is Bundle -> result.pushMap(writeIntentExtras(item))
            }
        }
        return result
    }

    fun writeError(type: String, message: String?): WritableMap {
        val result = Arguments.createMap()
        result.putString("error", type)
        result.putString("message", message)
        return result
    }

}
