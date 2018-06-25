package com.evotor.modules

import android.database.Cursor
import android.net.Uri
import android.util.Log
import com.evotor.converter.from.db.InventoryMapper
import com.evotor.converter.from.db.UserMapper
import com.evotor.converter.to.js.InventoryWriter
import com.evotor.converter.to.js.UserWriter
import com.facebook.react.bridge.*
import ru.evotor.framework.inventory.ProductTable
import ru.evotor.framework.users.GrantsTable
import ru.evotor.framework.users.UsersTable
import java.util.*

class QueryModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    override fun getName(): String {
        return "QueryModule"
    }

    override fun getConstants(): Map<String, Any>? {
        return HashMap()
    }

    @ReactMethod
    fun executeQuery(entityName: String, selection: String?, selectionArgs: ReadableArray?, sortOrderLimit: String?, getter: Callback) {
        Log.i("QueryModule", "Executing query: selection='$selection', selectionArgs='${if (selectionArgs != null) Arrays.toString(selectionArgs.toArrayList().toArray()) else null}', sortOrderLimit='$sortOrderLimit'")
        var writeValue: ((cursor: Cursor) -> WritableMap?)? = null
        getter.invoke(
                context.contentResolver.query(
                        when (entityName) {
                            "ProductItem" -> {
                                writeValue = { cursor ->
                                    InventoryMapper.createProductItem(cursor)?.let { productItem ->
                                        InventoryWriter.writeProductItem(productItem)
                                    }
                                }
                                ProductTable.URI
                            }
                            "User" -> {
                                writeValue = { cursor ->
                                    UserWriter.writeUser(UserMapper.createUser(cursor))
                                }
                                UsersTable.URI
                            }
                            "AuthenticatedUser" -> {
                                writeValue = { cursor ->
                                    UserWriter.writeUser(UserMapper.createUser(cursor))
                                }
                                UsersTable.URI_AUTHENTICATED
                            }
                            "Grant" -> {
                                writeValue = { cursor ->
                                    UserWriter.writeGrant(UserMapper.createGrant(cursor))
                                }
                                GrantsTable.URI
                            }
                            "AuthenticatedGrant" -> {
                                writeValue = { cursor ->
                                    UserWriter.writeGrant(UserMapper.createGrant(cursor))
                                }
                                GrantsTable.URI_GRANTS_OF_AUTHENTICATED_USER
                            }
                            else -> Uri.EMPTY
                        },
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
                )?.let {
                    val result = Arguments.createArray()
                    it.use {
                        if (it.moveToFirst()) {
                            result.pushMap(writeValue?.invoke(it))
                            while (it.moveToNext()) {
                                result.pushMap(writeValue?.invoke(it))
                            }
                        }
                    }
                    result
                }
        )
    }

}