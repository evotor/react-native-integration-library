package com.evotor.converter.fromjs

import android.content.Context
import org.json.JSONException
import org.json.JSONObject
import ru.evotor.framework.calculator.MoneyCalculator
import ru.evotor.framework.calculator.PercentCalculator
import ru.evotor.framework.calculator.QuantityCalculator
import ru.evotor.framework.core.action.event.receipt.changes.position.*
import ru.evotor.framework.core.action.event.receipt.changes.receipt.print_extra.SetPrintExtra
import ru.evotor.framework.inventory.ProductType
import ru.evotor.framework.payment.PaymentPurpose
import ru.evotor.framework.payment.PaymentSystem
import ru.evotor.framework.payment.PaymentType
import ru.evotor.framework.receipt.*
import ru.evotor.framework.receipt.print_extras.*
import java.math.BigDecimal
import java.util.*

/**
 * Created by a.lunkov on 16.03.2018.
 */
object ReceiptReader {

    fun readPosition(source: Map<*, *>): Position {
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
                source["taxNumber"]?.let { TaxNumber.valueOf(it as String) },
                MoneyCalculator.toBigDecimal(source["price"] as Double),
                MoneyCalculator.toBigDecimal(source["priceWithDiscountPosition"] as Double),
                QuantityCalculator.toBigDecimal(source["quantity"] as Double),
                source["barcode"] as String?,
                source["mark"] as String?,
                source["alcoholByVolume"]?.let { PercentCalculator.toBigDecimal(it as Double) },
                source["alcoholProductKindCode"]?.let { (it as Double).toLong() },
                source["tareVolume"]?.let { QuantityCalculator.toBigDecimal(it as Double) },
                extraKeys,
                subPositionsResult
        )
    }

    fun readPositionAdds(source: List<*>): List<PositionAdd> =
            (0 until source.size).map {
                PositionAdd(readPosition(source[it] as Map<*, *>))
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

    fun readPaymentParts(source: List<*>): List<PaymentPurpose> =
            source.indices
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

    fun readSetPrintGroups(source: List<*>): List<SetPrintGroup> =
            source.indices.map { readSetPrintGroup(source[it] as Map<*, *>) }

    fun readSetPrintGroup(source: Map<*, *>): SetPrintGroup =
            SetPrintGroup(
                    source["printGroup"]?.let { readPrintGroup(it as Map<*, *>) },
                    source["paymentPurposeIds"] as List<String>,
                    source["positionUuids"] as List<String>
            )

    private fun readPrintGroup(source: Map<*, *>): PrintGroup =
            PrintGroup(
                    source["identifier"] as String?,
                    PrintGroup.Type.valueOf(source["type"] as String),
                    source["orgName"] as String?,
                    source["orgInn"] as String?,
                    source["orgAddress"] as String?,
                    source["taxationSystem"]?.let { TaxationSystem.valueOf(it as String) },
                    source["shouldPrintReceipt"] as Boolean
            )


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

    fun readSetPrintExtras(current: Context, source: List<*>): List<SetPrintExtra?> =
            source.indices.map { readSetPrintExtra(current, source[it] as Map<*, *>) }


    fun readSetPrintExtra(current: Context, source: Map<*, *>): SetPrintExtra? {
        val printExtraPlaceSource: Map<*, *> = source["printExtraPlace"] as Map<*, *>
        var printPlaceResult: PrintExtraPlace? = null
        when (printExtraPlaceSource["type"] as String) {
            "PrintExtraPlacePrintGroupTop" -> printPlaceResult = PrintExtraPlacePrintGroupTop(printExtraPlaceSource["printGroupId"] as String?)
            "PrintExtraPlacePrintGroupHeader" -> printPlaceResult = PrintExtraPlacePrintGroupHeader(printExtraPlaceSource["printGroupId"] as String?)
            "PrintExtraPlacePrintGroupSummary" -> printPlaceResult = PrintExtraPlacePrintGroupSummary(printExtraPlaceSource["printGroupId"] as String?)
            "PrintExtraPlacePositionFooter" -> printPlaceResult = PrintExtraPlacePositionFooter(printExtraPlaceSource["positionUuid"] as String?)
            "PrintExtraPlacePositionAllSubpositionsFooter" -> printPlaceResult = PrintExtraPlacePositionAllSubpositionsFooter(printExtraPlaceSource["positionUuid"] as String?)
        }
        return printPlaceResult?.let { SetPrintExtra(it, DeviceReader.readPrintables(current, source["printables"] as List<*>)) }
    }

    fun readPrintReceipts(source: List<*>): List<Receipt.PrintReceipt> {
        val result = ArrayList<Receipt.PrintReceipt>()
        for (i in source.indices) {
            val item = source[i] as Map<*, *>
            val positionsSource = item["positions"] as List<*>
            val positionsResult = positionsSource.indices.map { readPosition(positionsSource[it] as Map<*, *>) }
            var discounts: Map<String, BigDecimal>? = null
            if (item["discounts"] != null) {
                discounts = HashMap()
                for (sourceKey in (item["discounts"] as Map<*, *>).keys) {
                    discounts[sourceKey as String] = BigDecimal((item["discounts"] as Map<*, *>)[sourceKey] as Double)
                }
            }
            result.add(Receipt.PrintReceipt(
                    item["printGroup"]?.let { readPrintGroup(it as Map<*, *>) },
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
                val paymentSystem = if (payment.isNull("system")) null else payment.getJSONObject("system")
                result[Payment(
                        payment.getString("uuid"),
                        MoneyCalculator.toBigDecimal(payment.getDouble("value")),
                        if (paymentSystem != null)
                            PaymentSystem(
                                    PaymentType.valueOf(paymentSystem.getString("paymentType")),
                                    paymentSystem.getString("userDescription"),
                                    paymentSystem.getString("paymentSystemId")
                            )
                        else
                            null,
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

}