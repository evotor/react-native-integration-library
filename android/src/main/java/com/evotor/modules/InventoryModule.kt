package com.evotor.modules

import android.util.Log
import com.evotor.converter.tojs.InventoryWriter
import com.facebook.react.bridge.*
import ru.evotor.framework.Utils
import ru.evotor.framework.inventory.*

import ru.evotor.framework.receipt.TaxNumber
import ru.evotor.query.Cursor
import java.math.BigDecimal
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
        val productItem = InventoryApi.getProductByUuid(context, uuid)
        getter.invoke(if (productItem == null) null else InventoryWriter.writeProductItem(productItem))
    }

    @ReactMethod
    fun getField(fieldUuid: String, getter: Callback) {
        val field = InventoryApi.getField(context, fieldUuid)
        getter.invoke(if (field == null) null else InventoryWriter.writeField(field))
    }

    @ReactMethod
    fun getProductExtras(productUuid: String, getter: Callback) {
        getter.invoke(InventoryWriter.writeProductExtras(
                InventoryApi.getProductExtras(context, productUuid)
        ))
    }

    @ReactMethod
    fun query(selection: String?, selectionArgs: ReadableArray?, sortOrderLimit: String?, getter: Callback) {
        Log.v("InventoryModule", "Executing ProductQuery: selection='$selection', selectionArgs='${if (selectionArgs != null) Arrays.toString(selectionArgs.toArrayList().toArray()) else null}', sortOrderLimit='$sortOrderLimit'")
        getter.invoke(InventoryWriter.writeProductItems(
                object : Cursor<ProductItem?>(
                        reactApplicationContext.contentResolver.query(
                                ProductTable.URI,
                                null,
                                selection,
                                selectionArgs?.toArrayList()?.let { source ->
                                    Array(
                                            source.size,
                                            { result ->
                                                if (source[result] is String) source[result] as String else null
                                            }
                                    )
                                },
                                sortOrderLimit
                        )
                ) {
                    override fun getValue(): ProductItem? {
                        try {
                            if (getInt(getColumnIndex(ProductTable.ROW_IS_GROUP)) > 0) {
                                return ProductItem.ProductGroup(
                                        uuid = getString(getColumnIndex(ProductTable.ROW_UUID)),
                                        parentUuid = getString(getColumnIndex(ProductTable.ROW_PARENT_UUID)),
                                        code = getString(getColumnIndex(ProductTable.ROW_CODE)),
                                        name = getString(getColumnIndex(ProductTable.ROW_NAME)),
                                        taxNumber = Utils.safeValueOf(TaxNumber::class.java, getString(getColumnIndex(ProductTable.ROW_TAX_NUMBER)), TaxNumber.NO_VAT)
                                )
                            } else {
                                return ProductItem.Product(
                                        uuid = getString(getColumnIndex(ProductTable.ROW_UUID)),
                                        parentUuid = getString(getColumnIndex(ProductTable.ROW_PARENT_UUID)),
                                        code = getString(getColumnIndex(ProductTable.ROW_CODE)),
                                        type = Utils.safeValueOf(ProductType::class.java, getString(getColumnIndex(ProductTable.ROW_TYPE)), ProductType.NORMAL),
                                        name = getString(getColumnIndex(ProductTable.ROW_NAME)),
                                        description = getString(getColumnIndex(ProductTable.ROW_DESCRIPTION)),
                                        price = BigDecimal(getLong(getColumnIndex(ProductTable.ROW_PRICE_OUT))).divide(BigDecimal(100)),
                                        quantity = BigDecimal(getLong(getColumnIndex(ProductTable.ROW_QUANTITY))).divide(BigDecimal(1000)),
                                        measureName = getString(getColumnIndex(ProductTable.ROW_MEASURE_NAME)),
                                        measurePrecision = getInt(getColumnIndex(ProductTable.ROW_MEASURE_PRECISION)),
                                        alcoholByVolume = getLong(getColumnIndex(ProductTable.ROW_ALCOHOL_BY_VOLUME)).let { BigDecimal(it).divide(BigDecimal(1000)) },
                                        alcoholProductKindCode = getLong(getColumnIndex(ProductTable.ROW_ALCOHOL_PRODUCT_KIND_CODE)),
                                        tareVolume = getLong(getColumnIndex(ProductTable.ROW_TARE_VOLUME)).let { BigDecimal(it).divide(BigDecimal(1000)) },
                                        taxNumber = Utils.safeValueOf(TaxNumber::class.java, getString(getColumnIndex(ProductTable.ROW_TAX_NUMBER)), TaxNumber.NO_VAT)
                                )
                            }
                        } catch (e: Exception) {
                            e.printStackTrace()
                        }
                        return null
                    }
                }
        ))
    }

}
