package com.evotor.modules

import android.os.Bundle

import com.evotor.converter.from.js.ReceiptReader
import com.evotor.converter.to.js.ErrorWriter
import com.evotor.converter.to.js.CommandWriter
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

import java.math.BigDecimal
import java.util.HashMap

import ru.evotor.framework.core.IntegrationException
import ru.evotor.framework.core.IntegrationManagerCallback
import ru.evotor.framework.core.IntegrationManagerFuture
import ru.evotor.framework.core.action.command.open_receipt_command.OpenBuyReceiptCommand
import ru.evotor.framework.core.action.command.open_receipt_command.OpenBuybackReceiptCommand
import ru.evotor.framework.core.action.command.open_receipt_command.OpenPaybackReceiptCommand
import ru.evotor.framework.core.action.command.open_receipt_command.OpenReceiptCommandResult
import ru.evotor.framework.core.action.command.open_receipt_command.OpenSellReceiptCommand
import ru.evotor.framework.core.action.command.print_receipt_command.PrintPaybackReceiptCommand
import ru.evotor.framework.core.action.command.print_receipt_command.PrintReceiptCommandResult
import ru.evotor.framework.core.action.command.print_receipt_command.PrintSellReceiptCommand
import ru.evotor.framework.core.action.command.print_z_report_command.PrintZReportCommand

/**
 * Created by a.lunkov on 14.02.2018.
 */

class CommandModule(c: ReactApplicationContext) : ReactContextBaseJavaModule(c) {

    override fun getName(): String {
        return "CommandModule"
    }

    override fun getConstants(): Map<String, Any>? {
        return HashMap()
    }

    @ReactMethod
    fun openReceipt(receiptType: String,
                    positionsSource: ReadableArray?,
                    extraSource: ReadableMap?,
                    resultCallback: Callback) {
        val callback = getIntegrationManagerCallback(
                { result ->
                    val resultData = OpenReceiptCommandResult.create(result)
                    resultCallback.invoke(
                            if (resultData == null)
                                null
                            else
                                CommandWriter.writeOpenReceiptCommandResult(resultData)
                    )
                },
                resultCallback
        )
        val positionsResult = positionsSource?.let { ReceiptReader.readPositionAdds(it.toArrayList()) }
        val extraResult = extraSource?.let { ReceiptReader.readSetExtra(it.toHashMap()) }
        try {
            when (receiptType) {
                "SELL" -> OpenSellReceiptCommand(
                        positionsResult,
                        extraResult
                ).process(currentActivity!!, callback)
                "PAYBACK" -> OpenPaybackReceiptCommand(
                        positionsResult,
                        extraResult
                ).process(currentActivity!!, callback)
                "BUY" -> OpenBuyReceiptCommand(
                        positionsResult,
                        extraResult
                ).process(currentActivity!!, callback)
                "BUYBACK" -> OpenBuybackReceiptCommand(
                        positionsResult,
                        extraResult
                ).process(currentActivity!!, callback)
            }
        } catch (e: NullPointerException) {
            resultCallback.invoke(ErrorWriter.writeError("NoActivityError", e.message))
        } catch (e: IntegrationException) {
            resultCallback.invoke(ErrorWriter.writeError("IntegrationError", e.message))
        }
    }

    @ReactMethod
    fun registerReceipt(receiptType: String,
                        printReceipts: ReadableArray,
                        extra: ReadableMap?,
                        phone: String?,
                        email: String?,
                        discount: String,
                        resultCallback: Callback) {
        val callback = getIntegrationManagerCallback(
                { result ->
                    val resultData = PrintReceiptCommandResult.create(result)
                    resultCallback.invoke(
                            resultData?.let { CommandWriter.writePrintReceiptCommandResult(it) }
                    )
                },
                resultCallback
        )
        try {
            when (receiptType) {
                "SELL" -> PrintSellReceiptCommand(
                        ReceiptReader.readPrintReceipts(printReceipts.toArrayList()),
                        extra?.let { ReceiptReader.readSetExtra(extra.toHashMap()) },
                        phone,
                        email,
                        if (discount.isEmpty()) null else BigDecimal(discount)
                ).process(currentActivity!!, callback)
                "PAYBACK" -> PrintPaybackReceiptCommand(
                        ReceiptReader.readPrintReceipts(printReceipts.toArrayList()),
                        extra?.let { ReceiptReader.readSetExtra(extra.toHashMap()) },
                        phone,
                        email,
                        if (discount.isEmpty()) null else BigDecimal(discount)
                ).process(currentActivity!!, callback)
            }
        } catch (e: Exception) {
            resultCallback.invoke(ErrorWriter.writeError("NoActivityError", e.message))
        }
    }

    @ReactMethod
    fun printZReport(callback: Callback) {
        try {
            PrintZReportCommand().process(
                    currentActivity!!,
                    getIntegrationManagerCallback({ callback.invoke() }, callback)
            )
        } catch (e: Exception) {
            callback.invoke(ErrorWriter.writeError("NoActivityError", e.message))
        }
    }

    private fun getIntegrationManagerCallback(successCallback: (result: Bundle) -> Unit,
                                              errorCallback: Callback): IntegrationManagerCallback {
        return IntegrationManagerCallback { integrationManagerFuture ->
            try {
                val result = integrationManagerFuture.result
                when (result?.type) {
                    IntegrationManagerFuture.Result.Type.OK -> successCallback.invoke(result.data)
                    IntegrationManagerFuture.Result.Type.ERROR -> errorCallback.invoke(ErrorWriter.writeError(
                            "IntegrationError",
                            result.error.message
                    ))
                }
            } catch (e: IntegrationException) {
                errorCallback.invoke(ErrorWriter.writeError(
                        "IntegrationError",
                        e.message
                ))
            }
        }
    }

}