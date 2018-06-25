package com.evotor.converter.to.js

import android.content.Intent
import android.os.Bundle

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap

import org.json.JSONException
import org.json.JSONObject

import java.math.BigDecimal

import ru.evotor.devices.commons.scales.Weight
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
import ru.evotor.query.Cursor

/**
 * Created by a.lunkov on 25.10.2017.
 */

object ErrorWriter {

    fun writeError(type: String, message: String?): WritableMap {
        val result = Arguments.createMap()
        result.putString("error", type)
        result.putString("message", message)
        return result
    }

}
