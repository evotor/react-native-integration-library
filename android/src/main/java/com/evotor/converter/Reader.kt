package com.evotor.converter

import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import com.evotor.modules.EventModule

import com.evotor.modules.IntegrationModule
import com.facebook.react.bridge.Callback

import org.json.JSONException
import org.json.JSONObject

import java.io.IOException
import java.io.Serializable
import java.math.BigDecimal
import java.util.ArrayList
import java.util.HashMap

import ru.evotor.devices.commons.printer.printable.IPrintable
import ru.evotor.devices.commons.printer.printable.PrintableBarcode
import ru.evotor.devices.commons.printer.printable.PrintableImage
import ru.evotor.devices.commons.printer.printable.PrintableText
import ru.evotor.framework.calculator.MoneyCalculator
import ru.evotor.framework.calculator.PercentCalculator
import ru.evotor.framework.calculator.QuantityCalculator
import ru.evotor.framework.core.action.event.receipt.changes.position.IPositionChange
import ru.evotor.framework.core.action.event.receipt.changes.position.PositionAdd
import ru.evotor.framework.core.action.event.receipt.changes.position.PositionEdit
import ru.evotor.framework.core.action.event.receipt.changes.position.PositionRemove
import ru.evotor.framework.core.action.event.receipt.changes.position.SetExtra
import ru.evotor.framework.core.action.event.receipt.changes.position.SetPrintGroup
import ru.evotor.framework.core.action.event.receipt.changes.receipt.print_extra.SetPrintExtra
import ru.evotor.framework.inventory.ProductType
import ru.evotor.framework.payment.PaymentPurpose
import ru.evotor.framework.payment.PaymentSystem
import ru.evotor.framework.payment.PaymentType
import ru.evotor.framework.receipt.ExtraKey
import ru.evotor.framework.receipt.Payment
import ru.evotor.framework.receipt.Position
import ru.evotor.framework.receipt.PrintGroup
import ru.evotor.framework.receipt.Receipt
import ru.evotor.framework.receipt.TaxNumber
import ru.evotor.framework.receipt.TaxationSystem
import ru.evotor.framework.receipt.print_extras.PrintExtraPlace
import ru.evotor.framework.receipt.print_extras.PrintExtraPlacePositionAllSubpositionsFooter
import ru.evotor.framework.receipt.print_extras.PrintExtraPlacePositionFooter
import ru.evotor.framework.receipt.print_extras.PrintExtraPlacePrintGroupHeader
import ru.evotor.framework.receipt.print_extras.PrintExtraPlacePrintGroupSummary
import ru.evotor.framework.receipt.print_extras.PrintExtraPlacePrintGroupTop

/**
 * Created by a.lunkov on 25.10.2017.
 */

object Reader {

    private fun readPosition(source: Map<*, *>): Position {
        val extraKeys = (source["extraKeys"] as List<*>)
                .map {
                    ExtraKey(
                            (it as Map<*, *>)["identity"] as String?,
                            it["appId"] as String?,
                            it["description"] as String?
                    )
                }
                .toSet()
        val subPositionsSource = source["subPositions"] as List<*>
        val subPositionsResult = ArrayList<Position>()
        if (subPositionsSource.isNotEmpty()) {
            subPositionsResult.add(readPosition(subPositionsSource[0] as Map<*, *>))
        }
        return Position(
                source["uuid"] as String?,
                source["productUuid"] as String?,
                source["productCode"] as String?,
                ProductType.valueOf(source["productType"] as String),
                source["name"] as String,
                source["measureName"] as String,
                (source["measurePrecision"] as Double).toInt(),
                if (source["taxNumber"] == null) null else TaxNumber.valueOf(source["taxNumber"] as String),
                MoneyCalculator.toBigDecimal(source["price"] as Double),
                MoneyCalculator.toBigDecimal(source["priceWithDiscountPosition"] as Double),
                QuantityCalculator.toBigDecimal(source["quantity"] as Double),
                source["barcode"] as String?,
                source["mark"] as String?,
                if (source["alcoholByVolume"] == null) null else PercentCalculator.toBigDecimal(source["alcoholByVolume"] as Double),
                if (source["alcoholProductKindCode"] == null) null else (source["alcoholProductKindCode"] as Double).toLong(),
                if (source["tareVolume"] == null) null else QuantityCalculator.toBigDecimal(source["tareVolume"] as Double),
                extraKeys,
                subPositionsResult
        )
    }

    fun readPositionAdds(source: List<*>): List<PositionAdd> {
        return (0 until source.size).map {
            PositionAdd(readPosition(source[it] as Map<*, *>))
        }
    }

    fun readChanges(source: List<*>): List<IPositionChange> {
        val result = ArrayList<IPositionChange>()
        source.indices
                .map { source[it] as Map<*, *> }
                .forEach {
                    when (it["type"] as String) {
                        "POSITION_ADD" -> result.add(PositionAdd(readPosition(it["position"] as Map<*, *>)))
                        "POSITION_EDIT" -> result.add(PositionEdit(readPosition(it["position"] as Map<*, *>)))
                        "POSITION_REMOVE" -> result.add(PositionRemove(it["positionUuid"] as String))
                    }
                }
        return result
    }

    fun readPaymentParts(source: List<*>): List<PaymentPurpose> {
        return source.indices
                .map { source[it] as Map<*, *> }
                .map {
                    PaymentPurpose(
                            it["identifier"] as String?,
                            it["paymentSystemId"] as String?,
                            MoneyCalculator.toBigDecimal(it["total"] as Double),
                            it["accountId"] as String?,
                            it["userMessage"] as String?
                    )
                }
    }

    fun readSetPrintGroups(source: List<*>): List<SetPrintGroup> {
        return source.indices.map { readSetPrintGroup(source[it] as Map<*, *>) }
    }

    private fun readSetPrintGroup(source: Map<*, *>): SetPrintGroup {
        return SetPrintGroup(
                if (source["printGroup"] == null) null else readPrintGroup(source["printGroup"] as Map<*, *>),
                source["paymentPurposeIds"] as List<String>,
                source["positionUuids"] as List<String>
        )
    }

    private fun readPrintGroup(source: Map<*, *>): PrintGroup {
        return PrintGroup(
                source["identifier"] as String?,
                PrintGroup.Type.valueOf(source["type"] as String),
                source["orgName"] as String?,
                source["orgInn"] as String?,
                source["orgAddress"] as String?,
                if (source["taxationSystem"] == null) null else TaxationSystem.valueOf(source["taxationSystem"] as String),
                source["shouldPrintReceipt"] as Boolean
        )
    }

    fun readSetExtra(source: Map<*, *>): SetExtra {
        val result = JSONObject()
        val sourceExtra = source["extra"] as Map<*, *>
        for (key in sourceExtra.keys) {
            try {
                result.put(key as String?, sourceExtra[key])
            } catch (e: JSONException) {
                e.printStackTrace()
            }

        }
        return SetExtra(result)
    }

    fun readSetPrintExtras(current: Context, source: List<*>): List<SetPrintExtra?> {
        return source.indices.map { readSetPrintExtra(current, source[it] as Map<*, *>) }
    }

    private fun readSetPrintExtra(current: Context, source: Map<*, *>): SetPrintExtra? {
        val printExtraPlaceSource: Map<*, *> = source["printExtraPlace"] as Map<*, *>
        var printPlaceResult: PrintExtraPlace? = null
        when (printExtraPlaceSource["printExtraPlaceType"] as String) {
            "PrintExtraPlacePrintGroupTop" -> printPlaceResult = PrintExtraPlacePrintGroupTop(printExtraPlaceSource["printGroupId"] as String)
            "PrintExtraPlacePrintGroupHeader" -> printPlaceResult = PrintExtraPlacePrintGroupHeader(printExtraPlaceSource["printGroupId"] as String)
            "PrintExtraPlacePrintGroupSummary" -> printPlaceResult = PrintExtraPlacePrintGroupSummary(printExtraPlaceSource["printGroupId"] as String)
            "PrintExtraPlacePositionFooter" -> printPlaceResult = PrintExtraPlacePositionFooter(printExtraPlaceSource["positionUuid"] as String)
            "PrintExtraPlacePositionAllSubpositionsFooter" -> printPlaceResult = PrintExtraPlacePositionAllSubpositionsFooter(printExtraPlaceSource["positionUuid"] as String)
        }
        return printPlaceResult?.let { SetPrintExtra(it, readPrintables(current, source["printables"] as List<*>)) }
    }

    fun readPrintables(current: Context, source: List<*>): Array<IPrintable> {
        val result = ArrayList<IPrintable>()
        source
                .map { it as Map<*, *> }
                .forEach {
                    when (it["type"] as String) {
                        "TEXT" -> result.add(PrintableText(it["value"] as String))
                        "BARCODE" -> result.add(PrintableBarcode(
                                it["value"] as String,
                                PrintableBarcode.BarcodeType.valueOf(it["barcodeType"] as String))
                        )
                        "IMAGE" -> try {
                            result.add(PrintableImage(
                                    MediaStore.Images.Media.getBitmap(
                                            current.contentResolver,
                                            Uri.parse(it["uri"] as String)
                                    )
                            ))
                        } catch (e: IOException) {
                            e.printStackTrace()
                        }

                    }
                }
        return result.toTypedArray()
    }

    fun readPrintReceipts(source: List<*>): List<Receipt.PrintReceipt> {
        val result = ArrayList<Receipt.PrintReceipt>()
        for (i in source.indices) {
            val item = source[i] as Map<*, *>
            val positionsSource = item["positions"] as List<*>
            val positionsResult = positionsSource.indices.map { readPosition(positionsSource[it] as Map<*, *>) }
            var discounts: Map<String, BigDecimal>? = null
            if(item["discounts"] != null) {
                discounts = HashMap()
                for (sourceKey in (item["discounts"] as Map<*, *>).keys) {
                    discounts[sourceKey as String] = BigDecimal((item["discounts"] as Map<*, *>)[sourceKey] as Double)
                }
            }
            result.add(Receipt.PrintReceipt(
                    readPrintGroup(item["printGroup"] as Map<*, *>),
                    positionsResult,
                    readPayments(item["payments"] as Map<*, *>),
                    readPayments(item["changes"] as Map<*, *>),
                    discounts
            ))
        }
        return result
    }

    private fun readPayments(source: Map<*, *>): Map<Payment, BigDecimal> {
        val result = HashMap<Payment, BigDecimal>()
        for (key in source.keys) {
            try {
                val payment = JSONObject(key as String)
                val paymentSystem = payment.getJSONObject("system")
                result[Payment(
                        payment.getString("uuid"),
                        MoneyCalculator.toBigDecimal(payment.getDouble("value")),
                        PaymentSystem(
                                PaymentType.valueOf(paymentSystem.getString("paymentType")),
                                paymentSystem.getString("userDescription"),
                                paymentSystem.getString("paymentSystemId")
                        ),
                        payment.getString("purposeIdentifier"),
                        payment.getString("accountId"),
                        payment.getString("accountUserDescription")
                )] = MoneyCalculator.toBigDecimal(source[key] as Double)
            } catch (e: JSONException) {
                e.printStackTrace()
            }

        }
        return result
    }

    /**
     * Navigation
     */

    fun readIntent(current: Context, source: Map<*, *>, callback: Callback): Intent? {
        val result = createIntent(
                current,
                source["className"] as String?,
                source["packageName"] as String?,
                source["action"] as String?,
                source["customServiceEventName"] as String?,
                callback
        )
        if (result != null) {
            val extrasSource = source["extras"] as Map<*, *>
            if (!extrasSource.isEmpty()) {
                val extrasResult = Bundle()
                for (key in extrasSource.keys) {
                    readDefaultIntentExtra(current, key as String, extrasSource[key], extrasResult)
                }
                if (result.hasExtra("type")) {
                    result.putExtra("extras", extrasResult)
                } else {
                    result.putExtras(extrasResult)
                }
            }
            for (category in source["categories"] as List<*>) {
                result.addCategory(category as String)
            }
            for (flag in source["flags"] as List<*>) {
                result.addFlags(flag as? Int ?: (flag as Double).toInt())
            }
        }
        return result
    }

    private fun createIntent(current: Context, className: String?, packageName: String?, action: String?, customServiceEventName: String?, callback: Callback): Intent? {
        var result: Intent? = null
        if (customServiceEventName != null) {
            result = EventModule.createServiceIntent(current, customServiceEventName, true)
        } else {
            val manager = current.packageManager
            if (className != null) {
                if (packageName != null) {
                    try {
                        manager.getPackageInfo(packageName, 0)
                        result = Intent()
                    } catch (e: PackageManager.NameNotFoundException) {
                        callback.invoke(Writer.writeError("NavigationError", "TARGET_PACKAGE_NOT_FOUND"))
                    }

                    if (result != null) {
                        result.component = ComponentName(packageName, className)
                        val list = manager.queryIntentActivities(
                                result,
                                PackageManager.MATCH_DEFAULT_ONLY
                        )
                        if (list.size == 0) {
                            result = null
                            callback.invoke(Writer.writeError("NavigationError", "TARGET_CLASS_NOT_FOUND"))
                        }
                    }
                } else {
                    try {
                        val dest = Class.forName(className)
                        result = Intent(current, dest)
                    } catch (e: ClassNotFoundException) {
                        callback.invoke(Writer.writeError("NavigationError", "TARGET_CLASS_NOT_FOUND"))
                    }

                }
                if (result != null && action != null) {
                    result.action = action
                }
            } else if (packageName != null) {
                result = manager.getLaunchIntentForPackage(packageName)
                if (result == null) {
                    callback.invoke(Writer.writeError("NavigationError", "TARGET_PACKAGE_NOT_FOUND"))
                } else if (action != null) {
                    result.action = action
                }
            } else if (action != null) {
                result = Intent(action)
            } else {
                result = Intent()
            }
        }
        return result
    }


    private fun readDefaultIntentExtra(current: Context, key: String, item: Any?, extras: Bundle) {
        when (item) {
            is Boolean -> extras.putBoolean(key, item)
            is Int -> extras.putInt(key, item)
            is Double -> extras.putDouble(key, item)
            is String -> extras.putString(key, item)
            else -> readCustomIntentExtra(
                    current,
                    item,
                    object : IntentExtraReadingFinisher {
                        override fun finishReading(itemItem: Any?) {
                            if (itemItem is Bundle) {
                                extras.putBundle(key, itemItem as Bundle?)
                            } else {
                                extras.putSerializable(key, itemItem as Serializable?)
                            }
                        }
                    })
        }
    }

    private fun readCustomIntentExtra(current: Context, item: Any?, itemReader: IntentExtraReadingFinisher) {
        if (item is Map<*, *>) {
            if (item.containsKey("__value__")) {
                itemReader.finishReading(readEvotorIntentExtra(
                        current,
                        item["__value__"] as Map<*, *>
                ))
            } else {
                val itemMutable = item.toMutableMap()
                for (itemKey in item.keys) {
                    readCustomIntentExtra(
                            current,
                            item[itemKey],
                            object : IntentExtraReadingFinisher {
                                override fun finishReading(itemItem: Any?) {
                                    itemMutable[itemKey] = itemItem
                                }
                            }
                    )
                }
                itemReader.finishReading(itemMutable)
            }
        } else if (item is List<*>) {
            val itemMutable = item.toMutableList()
            for (i in item.indices) {
                readCustomIntentExtra(
                        current,
                        item[i],
                        object : IntentExtraReadingFinisher {
                            override fun finishReading(itemItem: Any?) {
                                itemMutable[i] = itemItem
                            }
                        }
                )
            }
            itemReader.finishReading(itemMutable)
        }
    }

    private fun readEvotorIntentExtra(current: Context, source: Map<*, *>): Bundle? {
        return when (source["__name__"] as String) {
            "PositionAdd" -> PositionAdd(readPosition(source["position"] as Map<*, *>)).toBundle()
            "PositionEdit" -> PositionEdit(readPosition(source["position"] as Map<*, *>)).toBundle()
            "PositionRemove" -> PositionRemove(source["positionUuid"] as String).toBundle()
            "SetExtra" -> readSetExtra(source).toBundle()
            "SetPrintGroup" -> readSetPrintGroup(source).toBundle()
            "SetPrintExtra" -> readSetPrintExtra(current, source)?.toBundle()
            "BeforePositionsEditedEventResult" -> IntegrationModule.resultReaders["BEFORE_POSITIONS_EDITED"]?.read(current, source)?.toBundle()
            "ReceiptDiscountEventResult" -> IntegrationModule.resultReaders["RECEIPT_DISCOUNT"]?.read(current, source)?.toBundle()
            "PaymentSelectedEventResult" -> IntegrationModule.resultReaders["PAYMENT_SELECTED"]?.read(current, source)?.toBundle()
            "PaymentSystemPaymentOkResult" -> IntegrationModule.resultReaders["PAYMENT_SYSTEM"]?.read(current, source)?.toBundle()
            "PaymentSystemPaymentErrorResult" -> IntegrationModule.resultReaders["PAYMENT_SYSTEM"]?.read(current, source)?.toBundle()
            "PrintGroupRequiredEventResult" -> IntegrationModule.resultReaders["PRINT_GROUP_REQUIRED"]?.read(current, source)?.toBundle()
            "PrintExtraRequiredEventResult" -> IntegrationModule.resultReaders["PRINT_EXTRA_REQUIRED"]?.read(current, source)?.toBundle()
            else -> null
        }
    }

    private interface IntentExtraReadingFinisher {
        fun finishReading(itemItem: Any?)
    }

}
