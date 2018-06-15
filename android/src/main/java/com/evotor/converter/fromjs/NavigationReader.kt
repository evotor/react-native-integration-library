package com.evotor.converter.fromjs

import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import com.evotor.converter.tojs.ErrorWriter

import com.evotor.modules.IntegrationModule
import com.evotor.services.EventEmissionService
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap

import java.io.Serializable

import ru.evotor.framework.core.action.event.receipt.changes.position.PositionAdd
import ru.evotor.framework.core.action.event.receipt.changes.position.PositionEdit
import ru.evotor.framework.core.action.event.receipt.changes.position.PositionRemove

/**
 * Created by a.lunkov on 25.10.2017.
 */

object NavigationReader {

    fun readIntent(current: Context, source: Map<*, *>, callback: Callback): Intent? {
        val result = createIntent(
                current,
                source["packageName"] as String?,
                source["className"] as String?,
                source["action"] as String?,
                source["customServiceEventName"] as String?,
                callback
        )
        if (result != null) {
            val extrasSource = source["extras"] as Map<*, *>
            if (!extrasSource.isEmpty()) {
                val extrasResult = Bundle()
                for (key in extrasSource.keys) {
                    readDefaultIntentExtra(
                            current,
                            key as String,
                            extrasSource[key],
                            extrasResult,
                            source["convertEvotorBundles"] as Boolean
                    )
                }
                if (result.hasExtra("type")) {
                    result.putExtra("extras", extrasResult)
                } else {
                    result.putExtras(extrasResult)
                }
            }
            for (category in source["categories"] as List<*>) {
                result.addCategory(category as String)
            }
            for (flag in source["flags"] as List<*>) {
                result.addFlags(flag as? Int ?: (flag as Double).toInt())
            }
        }
        return result
    }

    private fun createIntent(current: Context,
                             packageName: String?,
                             className: String?,
                             action: String?,
                             customServiceEventName: String?,
                             callback: Callback): Intent? {
        var result: Intent? = null
        if (customServiceEventName != null) {
            result = if (packageName != null) {
                createIntentWithPackageAndClass(
                        current.packageManager,
                        packageName,
                        "com.navigation.EventEmissionService",
                        callback
                )
            } else {
                Intent(current, EventEmissionService::class.java)
            }
            result?.putExtra("type", customServiceEventName)
        } else {
            if (className != null) {
                if (packageName != null) {
                    result = createIntentWithPackageAndClass(
                            current.packageManager,
                            packageName,
                            className,
                            callback
                    )
                } else {
                    try {
                        val dest = Class.forName(className)
                        result = Intent(current, dest)
                    } catch (e: ClassNotFoundException) {
                        callback.invoke(ErrorWriter.writeError(
                                "NavigationError",
                                "TARGET_CLASS_NOT_FOUND"
                        ))
                    }
                }

            } else if (packageName != null) {
                result = current.packageManager.getLaunchIntentForPackage(packageName)
                if (result == null) {
                    callback.invoke(ErrorWriter.writeError(
                            "NavigationError",
                            "TARGET_PACKAGE_NOT_FOUND"
                    ))
                }
            } else {
                result = Intent()
            }
            if (action != null) {
                result?.action = action
            }
        }
        return result
    }

    private fun createIntentWithPackageAndClass(manager: PackageManager,
                                                packageName: String,
                                                className: String,
                                                callback: Callback): Intent? {
        var result: Intent? = null
        try {
            manager.getPackageInfo(packageName, 0)
            result = Intent()
        } catch (e: PackageManager.NameNotFoundException) {
            callback.invoke(ErrorWriter.writeError(
                    "NavigationError",
                    "TARGET_PACKAGE_NOT_FOUND"
            ))
        }
        if (result != null) {
            result.component = ComponentName(packageName, className)
            var list = manager.queryIntentActivities(
                    result,
                    PackageManager.MATCH_DEFAULT_ONLY
            )
            if (list.size == 0) {
                list = manager.queryIntentServices(
                        result,
                        PackageManager.MATCH_DEFAULT_ONLY
                )
                if (list.size == 0) {
                    result = null
                    callback.invoke(ErrorWriter.writeError(
                            "NavigationError",
                            "TARGET_CLASS_NOT_FOUND"
                    ))
                }
            }
        }
        return result
    }

    fun readDefaultIntentExtra(current: Context,
                               key: String,
                               item: Any?,
                               extras: Bundle,
                               convertEvotorBundles: Boolean = false) {
        when (item) {
            is Boolean -> extras.putBoolean(key, item)
            is Int -> extras.putInt(key, item)
            is Double -> extras.putDouble(key, item)
            is String -> extras.putString(key, item)
            is WritableMap -> extras.putSerializable(key, item.toHashMap() as Serializable)
            is WritableArray -> extras.putSerializable(key, item.toArrayList() as Serializable)
            else -> readCustomIntentExtra(
                    current,
                    item,
                    object : IntentExtraReadingFinisher {
                        override fun finishReading(itemItem: Any?) {
                            if (itemItem is Bundle) {
                                extras.putBundle(key, itemItem as Bundle?)
                            } else {
                                extras.putSerializable(key, itemItem as Serializable?)
                            }
                        }
                    },
                    convertEvotorBundles
            )
        }
    }

    private fun readCustomIntentExtra(current: Context,
                                      item: Any?,
                                      itemReader: IntentExtraReadingFinisher,
                                      convertEvotorBundles: Boolean) {
        when (item) {
            is Map<*, *> -> {
                if (convertEvotorBundles) {
                    if (item.containsKey("__value__")) {
                        itemReader.finishReading(readEvotorIntentExtra(
                                current,
                                item["__value__"] as Map<*, *>
                        ))
                    } else {
                        val itemMutable = item.toMutableMap()
                        for (itemKey in item.keys) {
                            readCustomIntentExtra(
                                    current,
                                    item[itemKey],
                                    object : IntentExtraReadingFinisher {
                                        override fun finishReading(itemItem: Any?) {
                                            itemMutable[itemKey] = itemItem
                                        }
                                    },
                                    convertEvotorBundles
                            )
                        }
                        itemReader.finishReading(itemMutable)
                    }
                } else {
                    itemReader.finishReading(item)
                }
            }
            is List<*> -> {
                if (convertEvotorBundles) {
                    val itemMutable = item.toMutableList()
                    for (i in item.indices) {
                        readCustomIntentExtra(
                                current,
                                item[i],
                                object : IntentExtraReadingFinisher {
                                    override fun finishReading(itemItem: Any?) {
                                        itemMutable[i] = itemItem
                                    }
                                },
                                convertEvotorBundles
                        )
                    }
                    itemReader.finishReading(itemMutable)
                } else {
                    itemReader.finishReading(item)
                }
            }
        }
    }

    private fun readEvotorIntentExtra(current: Context, source: Map<*, *>): Bundle? {
        return when (source["__name__"] as String) {
            "PositionAdd" -> PositionAdd(ReceiptReader.readPosition(source["position"] as Map<*, *>)).toBundle()
            "PositionEdit" -> PositionEdit(ReceiptReader.readPosition(source["position"] as Map<*, *>)).toBundle()
            "PositionRemove" -> PositionRemove(source["positionUuid"] as String).toBundle()
            "SetExtra" -> ReceiptReader.readSetExtra(source).toBundle()
            "SetPrintGroup" -> ReceiptReader.readSetPrintGroup(source).toBundle()
            "SetPrintExtra" -> ReceiptReader.readSetPrintExtra(current, source)?.toBundle()
            "BeforePositionsEditedEventResult" -> IntegrationModule.resultReaders["BEFORE_POSITIONS_EDITED"]?.read(current, source)?.toBundle()
            "ReceiptDiscountEventResult" -> IntegrationModule.resultReaders["RECEIPT_DISCOUNT"]?.read(current, source)?.toBundle()
            "PaymentSelectedEventResult" -> IntegrationModule.resultReaders["PAYMENT_SELECTED"]?.read(current, source)?.toBundle()
            "PaymentSystemPaymentOkResult" -> IntegrationModule.resultReaders["PAYMENT_SYSTEM"]?.read(current, source)?.toBundle()
            "PaymentSystemPaymentErrorResult" -> IntegrationModule.resultReaders["PAYMENT_SYSTEM"]?.read(current, source)?.toBundle()
            "PrintGroupRequiredEventResult" -> IntegrationModule.resultReaders["PRINT_GROUP_REQUIRED"]?.read(current, source)?.toBundle()
            "PrintExtraRequiredEventResult" -> IntegrationModule.resultReaders["PRINT_EXTRA_REQUIRED"]?.read(current, source)?.toBundle()
            else -> null
        }
    }

    private interface IntentExtraReadingFinisher {
        fun finishReading(itemItem: Any?)
    }

}
