package com.evotor.converter.tojs

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import ru.evotor.framework.inventory.ProductExtra
import ru.evotor.framework.inventory.ProductItem
import ru.evotor.framework.inventory.field.Field
import ru.evotor.query.Cursor

/**
 * Created by a.lunkov on 16.03.2018.
 */
object InventoryWriter {

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

    fun writeProductItems(source: Cursor<ProductItem?>?): WritableArray {
        val result = Arguments.createArray()
        if (source != null && source.moveToFirst()) {
            var item = source.getValue()
            result.pushMap(if (item == null) null else writeProductItem(item))
            while (source.moveToNext()) {
                item = source.getValue()
                result.pushMap(if (item == null) null else writeProductItem(item))
            }
            source.close()
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

}