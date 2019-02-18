package com.evotor.converter.from.js

import android.content.Context
import org.json.JSONException
import org.json.JSONObject
import ru.evotor.framework.calculator.MoneyCalculator
import ru.evotor.framework.calculator.PercentCalculator
import ru.evotor.framework.calculator.QuantityCalculator
import ru.evotor.framework.component.PaymentPerformer
import ru.evotor.framework.core.action.event.receipt.changes.position.*
import ru.evotor.framework.core.action.event.receipt.changes.receipt.print_extra.SetPrintExtra
import ru.evotor.framework.counterparties.collaboration.agent_scheme.Agent
import ru.evotor.framework.counterparties.collaboration.agent_scheme.Principal
import ru.evotor.framework.counterparties.collaboration.agent_scheme.Subagent
import ru.evotor.framework.counterparties.collaboration.agent_scheme.TransactionOperator
import ru.evotor.framework.inventory.ProductType
import ru.evotor.framework.payment.PaymentPurpose
import ru.evotor.framework.payment.PaymentSystem
import ru.evotor.framework.payment.PaymentType
import ru.evotor.framework.receipt.*
import ru.evotor.framework.receipt.position.AgentRequisites
import ru.evotor.framework.receipt.position.SettlementMethod
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
        return Position.Builder.copyFrom(Position(
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
        )).apply {
            this.setAgentRequisites(readAgentRequisites(source["agentRequisites"] as Map<*, *>?))
            readSettlementMethod(source["settlementMethod"] as Map<*, *>?)?.let {
                this.setSettlementMethod(it)
            }
        }.build()
    }

    private fun readAgentRequisites(source: Map<*, *>?): AgentRequisites? = source?.let {
        AgentRequisites(
                readAgent(it["agent"] as Map<*, *>?),
                readSubagent(it["subagent"] as Map<*, *>?),
                readPrincipal(it["principal"] as Map<*, *>),
                readTransactionOperator(it["transactionOperator"] as Map<*, *>?),
                it["operationDescription"] as String?
        )
    }

    private fun readSettlementMethod(source: Map<*, *>?): SettlementMethod? = source?.let {
        when (it["type"] as String) {
            "FULL_PREPAYMENT" -> SettlementMethod.FullPrepayment()
            "PARTIAL_PREPAYMENT" -> SettlementMethod.PartialPrepayment()
            "ADVANCE_PAYMENT" -> SettlementMethod.AdvancePayment()
            "FULL_SETTLEMENT" -> SettlementMethod.FullSettlement()
            "PARTIAL_SETTLEMENT" -> SettlementMethod.PartialSettlement(BigDecimal(it["initialPaymentAmount"] as Double))
            "LEND" -> SettlementMethod.Lend()
            "LOAN_PAYMENT" -> SettlementMethod.LoanPayment()
            else -> null
        }
    }

    private fun readAgent(source: Map<*, *>?): Agent? = source?.let {
        Agent(
                CounterpartyReader.readUuid(it),
                (it["type"] as String?)?.let { type -> Agent.Type.valueOf(type) },
                CounterpartyReader.readCounterpartyType(it),
                CounterpartyReader.readFullName(it),
                CounterpartyReader.readShortName(it),
                CounterpartyReader.readInn(it),
                CounterpartyReader.readKpp(it),
                CounterpartyReader.readPhones(it),
                CounterpartyReader.readAddresses(it)
        )
    }

    private fun readSubagent(source: Map<*, *>?): Subagent? = source?.let {
        Subagent(
                CounterpartyReader.readUuid(it),
                Subagent.Type.valueOf(it["type"] as String),
                CounterpartyReader.readCounterpartyType(it),
                CounterpartyReader.readFullName(it),
                CounterpartyReader.readShortName(it),
                CounterpartyReader.readInn(it),
                CounterpartyReader.readKpp(it),
                CounterpartyReader.readPhones(it),
                CounterpartyReader.readAddresses(it)
        )
    }

    private fun readPrincipal(source: Map<*, *>): Principal =
            Principal(
                    CounterpartyReader.readUuid(source),
                    CounterpartyReader.readCounterpartyType(source),
                    CounterpartyReader.readFullName(source),
                    CounterpartyReader.readShortName(source),
                    CounterpartyReader.readInn(source)!!,
                    CounterpartyReader.readKpp(source),
                    CounterpartyReader.readPhones(source)!!,
                    CounterpartyReader.readAddresses(source)
            )

    private fun readTransactionOperator(source: Map<*, *>?): TransactionOperator? = source?.let {
        TransactionOperator(
                CounterpartyReader.readUuid(it),
                CounterpartyReader.readCounterpartyType(it),
                CounterpartyReader.readFullName(it),
                CounterpartyReader.readShortName(it),
                CounterpartyReader.readInn(it),
                CounterpartyReader.readKpp(it),
                CounterpartyReader.readPhones(it),
                CounterpartyReader.readAddresses(it)
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

    private fun readPaymentSystem(source: Map<*, *>): PaymentSystem =
            PaymentSystem(
                    PaymentType.valueOf(source["paymentType"] as String),
                    source["userDescription"] as String,
                    source["paymentSystemId"] as String
            )

    fun readPaymentParts(source: List<*>): List<PaymentPurpose> =
            source.indices
                    .map { source[it] as Map<*, *> }
                    .map { readPaymentPurpose(it) }

    fun readPaymentPurpose(source: Map<*, *>) =
            PaymentPurpose(
                    source["identifier"] as String?,
                    source["paymentSystemId"] as String?,
                    source["paymentPerformer"]?.let { readPaymentPerformer(it as Map<*, *>) },
                    MoneyCalculator.toBigDecimal(source["total"] as Double),
                    source["accountId"] as String?,
                    source["userMessage"] as String?
            )

    private fun readPaymentPerformer(source: Map<*, *>) =
            PaymentPerformer(
                    source["paymentSystem"]?.let { readPaymentSystem(it as Map<*, *>) },
                    source["packageName"] as String?,
                    source["componentName"] as String?,
                    source["appUuid"] as String?,
                    source["appName"] as String?
            )

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
                    readPayments(item["payments"] as List<*>),
                    readPayments(item["changes"] as List<*>),
                    discounts
            ))
        }
        return result
    }

    private fun readPayments(source: List<*>): Map<Payment, BigDecimal> {
        val result = HashMap<Payment, BigDecimal>()
        source.forEach { it ->
            it as Map<*, *>
            val key = it["key"] as Map<*, *>
            result[Payment(
                    key["uuid"] as String,
                    MoneyCalculator.toBigDecimal(key["value"] as Double),
                    key["system"]?.let { readPaymentSystem(it as Map<*, *>) },
                    readPaymentPerformer(key["paymentPerformer"] as Map<*, *>),
                    key["purposeIdentifier"] as String?,
                    key["accountId"] as String?,
                    key["accountUserDescription"] as String?,
                    key["identifier"] as String?
            )] = MoneyCalculator.toBigDecimal(it["value"] as Double)
        }
        return result
    }

}