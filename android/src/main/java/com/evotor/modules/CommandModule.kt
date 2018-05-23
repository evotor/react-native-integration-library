package com.evotor.modules

import android.os.Bundle

import com.evotor.converter.fromjs.ReceiptReader
import com.evotor.converter.tojs.ErrorWriter
import com.evotor.converter.tojs.CommandWriter
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
                    source: ReadableArray?,
                    extra: ReadableMap?,
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
        try {
            when (receiptType) {
                "SELL" -> OpenSellReceiptCommand(
                        if (source == null) null else ReceiptReader.readPositionAdds(source.toArrayList()),
                        if (extra == null) null else ReceiptReader.readSetExtra(extra.toHashMap())
                ).process(currentActivity!!, callback)
                "PAYBACK" -> OpenPaybackReceiptCommand(
                        if (source == null) null else ReceiptReader.readPositionAdds(source.toArrayList()),
                        if (extra == null) null else ReceiptReader.readSetExtra(extra.toHashMap())
                ).process(currentActivity!!, callback)
                "BUY" -> OpenBuyReceiptCommand(
                        if (source == null) null else ReceiptReader.readPositionAdds(source.toArrayList()),
                        if (extra == null) null else ReceiptReader.readSetExtra(extra.toHashMap())
                ).process(currentActivity!!, callback)
                "BUYBACK" -> OpenBuybackReceiptCommand(
                        if (source == null) null else ReceiptReader.readPositionAdds(source.toArrayList()),
                        if (extra == null) null else ReceiptReader.readSetExtra(extra.toHashMap())
                ).process(currentActivity!!, callback)
            }
        } catch (e: Exception) {
            resultCallback.invoke(ErrorWriter.writeError("NoActivityError", e.message))
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
                            if (resultData == null)
                                null
                            else
                                CommandWriter.writePrintReceiptCommandResult(resultData)
                    )
                },
                resultCallback
        )
        try {
            when (receiptType) {
                "SELL" -> PrintSellReceiptCommand(
                        ReceiptReader.readPrintReceipts(printReceipts.toArrayList()),
                        if (extra == null) null else ReceiptReader.readSetExtra(extra.toHashMap()),
                        phone,
                        email,
                        if (discount.isEmpty()) null else BigDecimal(discount)
                ).process(currentActivity!!, callback)
                "PAYBACK" -> PrintPaybackReceiptCommand(
                        ReceiptReader.readPrintReceipts(printReceipts.toArrayList()),
                        if (extra == null) null else ReceiptReader.readSetExtra(extra.toHashMap()),
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