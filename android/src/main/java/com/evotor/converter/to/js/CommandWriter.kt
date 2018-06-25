package com.evotor.converter.to.js

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import ru.evotor.framework.core.action.command.open_receipt_command.OpenReceiptCommandResult
import ru.evotor.framework.core.action.command.print_receipt_command.PrintReceiptCommandResult

/**
 * Created by a.lunkov on 16.03.2018.
 */
object CommandWriter {

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

}