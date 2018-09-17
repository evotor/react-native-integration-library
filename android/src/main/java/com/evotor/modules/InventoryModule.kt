package com.evotor.modules

import com.evotor.converter.to.js.InventoryWriter
import com.facebook.react.bridge.*
import ru.evotor.framework.inventory.*

import java.util.*

/**
 * Created by a.lunkov on 25.10.2017.
 */

class InventoryModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    override fun getName(): String {
        return "InventoryModule"
    }

    override fun getConstants(): Map<String, Any>? {
        return HashMap()
    }

    @ReactMethod
    fun getAllBarcodesForProduct(productUuid: String, getter: Callback) {
        getter.invoke(InventoryWriter.writeBarcodes(
                InventoryApi.getAllBarcodesForProduct(context, productUuid)
        ))
    }

    @ReactMethod
    fun getProductByUuid(uuid: String, getter: Callback) {
        getter.invoke(InventoryApi.getProductByUuid(context, uuid)?.let {
            InventoryWriter.writeProductItem(it)
        })
    }

    @ReactMethod
    fun getField(fieldUuid: String, getter: Callback) {
        getter.invoke(InventoryApi.getField(context, fieldUuid)?.let {
            InventoryWriter.writeField(it)
        })
    }

    @ReactMethod
    fun getProductExtras(productUuid: String, getter: Callback) {
        getter.invoke(InventoryWriter.writeProductExtras(
                InventoryApi.getProductExtras(context, productUuid)
        ))
    }

}
