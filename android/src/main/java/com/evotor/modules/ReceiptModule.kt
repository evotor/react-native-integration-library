package com.evotor.modules

import com.evotor.converter.to.js.ReceiptWriter
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

import java.util.HashMap

import ru.evotor.framework.receipt.Receipt
import ru.evotor.framework.receipt.ReceiptApi

class ReceiptModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    override fun getName(): String {
        return "ReceiptModule"
    }

    override fun getConstants(): Map<String, Any>? {
        return HashMap()
    }

    @ReactMethod
    fun getPositionsByBarcode(barcode: String, callback: Callback) {
        callback.invoke(ReceiptWriter.writePositions(
                ReceiptApi.getPositionsByBarcode(context, barcode)
        ))
    }

    @ReactMethod
    fun getReceiptByType(type: String, callback: Callback) {
        callback.invoke(ReceiptApi.getReceipt(context, Receipt.Type.valueOf(type))?.let {
            ReceiptWriter.writeReceipt(it)
        })
    }

    @ReactMethod
    fun getReceiptByUuid(uuid: String, callback: Callback) {
        callback.invoke(ReceiptApi.getReceipt(context, uuid)?.let {
            ReceiptWriter.writeReceipt(it)
        })
    }

    @ReactMethod
    fun getReceiptHeaders(type: String?, callback: Callback) {
        callback.invoke(ReceiptWriter.writeReceiptHeaders(
                ReceiptApi.getReceiptHeaders(context, type?.let{Receipt.Type.valueOf(type)})
        ))
    }

}