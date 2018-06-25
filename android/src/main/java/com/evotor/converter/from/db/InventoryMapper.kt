package com.evotor.converter.from.db

import android.database.Cursor
import ru.evotor.framework.Utils
import ru.evotor.framework.inventory.ProductItem
import ru.evotor.framework.inventory.ProductTable
import ru.evotor.framework.inventory.ProductType
import ru.evotor.framework.receipt.TaxNumber
import java.math.BigDecimal

object InventoryMapper {

    fun createProductItem(cursor: Cursor): ProductItem? {
        try {
            return if (cursor.getInt(cursor.getColumnIndex(ProductTable.ROW_IS_GROUP)) > 0) {
                createProductGroup(cursor)
            } else {
                createProduct(cursor)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return null
    }

    private fun createProduct(cursor: Cursor): ProductItem.Product =
            ProductItem.Product(
                    uuid = cursor.getString(cursor.getColumnIndex(ProductTable.ROW_UUID)),
                    parentUuid = cursor.getString(cursor.getColumnIndex(ProductTable.ROW_PARENT_UUID)),
                    code = cursor.getString(cursor.getColumnIndex(ProductTable.ROW_CODE)),
                    type = Utils.safeValueOf(ProductType::class.java, cursor.getString(cursor.getColumnIndex(ProductTable.ROW_TYPE)), ProductType.NORMAL),
                    name = cursor.getString(cursor.getColumnIndex(ProductTable.ROW_NAME)),
                    description = cursor.getString(cursor.getColumnIndex(ProductTable.ROW_DESCRIPTION)),
                    price = BigDecimal(cursor.getLong(cursor.getColumnIndex(ProductTable.ROW_PRICE_OUT))).divide(BigDecimal(100)),
                    quantity = BigDecimal(cursor.getLong(cursor.getColumnIndex(ProductTable.ROW_QUANTITY))).divide(BigDecimal(1000)),
                    measureName = cursor.getString(cursor.getColumnIndex(ProductTable.ROW_MEASURE_NAME)),
                    measurePrecision = cursor.getInt(cursor.getColumnIndex(ProductTable.ROW_MEASURE_PRECISION)),
                    alcoholByVolume = cursor.getLong(cursor.getColumnIndex(ProductTable.ROW_ALCOHOL_BY_VOLUME)).let { BigDecimal(it).divide(BigDecimal(1000)) },
                    alcoholProductKindCode = cursor.getLong(cursor.getColumnIndex(ProductTable.ROW_ALCOHOL_PRODUCT_KIND_CODE)),
                    tareVolume = cursor.getLong(cursor.getColumnIndex(ProductTable.ROW_TARE_VOLUME)).let { BigDecimal(it).divide(BigDecimal(1000)) },
                    taxNumber = Utils.safeValueOf(TaxNumber::class.java, cursor.getString(cursor.getColumnIndex(ProductTable.ROW_TAX_NUMBER)), TaxNumber.NO_VAT)
            )

    private fun createProductGroup(cursor: Cursor): ProductItem.ProductGroup =
            ProductItem.ProductGroup(
                    uuid = cursor.getString(cursor.getColumnIndex(ProductTable.ROW_UUID)),
                    parentUuid = cursor.getString(cursor.getColumnIndex(ProductTable.ROW_PARENT_UUID)),
                    code = cursor.getString(cursor.getColumnIndex(ProductTable.ROW_CODE)),
                    name = cursor.getString(cursor.getColumnIndex(ProductTable.ROW_NAME)),
                    taxNumber = Utils.safeValueOf(TaxNumber::class.java, cursor.getString(cursor.getColumnIndex(ProductTable.ROW_TAX_NUMBER)), TaxNumber.NO_VAT)
            )

}