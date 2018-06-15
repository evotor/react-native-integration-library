package com.evotor.converter.tojs

import android.content.Intent
import android.os.Bundle
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap

/**
 * Created by a.lunkov on 16.03.2018.
 */
object NavigationWriter {

    fun writeIntent(source: Intent): WritableMap {
        val result = Arguments.createMap()
        result.putString("className", source.component?.className)
        result.putString("packageName", source.`package`)
        result.putString("action", source.action)
        result.putMap("extras", source.extras?.let { writeBundle(it) })
        val categories = Arguments.createArray()
        if (source.categories != null) {
            for (item in source.categories) {
                categories.pushString(item)
            }
        }
        result.putArray("categories", categories)
        result.putInt("flags", source.flags)
        return result
    }

    fun writeBundle(source: Bundle): WritableMap {
        val result = Arguments.createMap()
        for (key in source.keySet()) {
            writeMapItem(key, source.get(key), result)
        }
        return result
    }

    fun writeMapItem(key: String, item: Any?, result: WritableMap) {
        when (item) {
            is Nothing -> result.putNull(key)
            is Boolean -> result.putBoolean(key, item)
            is Int -> result.putInt(key, item)
            is Double -> result.putDouble(key, item)
            is String -> result.putString(key, item)
            is Map<*, *> -> result.putMap(key, writeMap(item))
            is List<*> -> result.putArray(key, writeList(item))
            is WritableMap -> result.putMap(key, item)
            is WritableArray -> result.putArray(key, item)
            is Bundle -> result.putMap(key, writeBundle(item))
        }
    }

    private fun writeMap(source: Map<*, *>): WritableMap {
        val result = Arguments.createMap()
        for (key in source.keys) {
            writeMapItem(key as String, source[key], result)
        }
        return result
    }

    private fun writeList(source: List<*>): WritableArray {
        val result = Arguments.createArray()
        for (item in source) {
            when (item) {
                is Nothing -> result.pushNull()
                is Boolean -> result.pushBoolean(item)
                is Int -> result.pushInt(item)
                is Double -> result.pushDouble(item)
                is String -> result.pushString(item)
                is Map<*, *> -> result.pushMap(writeMap(item))
                is List<*> -> result.pushArray(writeList(item))
                is WritableMap -> result.pushMap(item)
                is WritableArray -> result.pushArray(item)
                is Bundle -> result.pushMap(writeBundle(item))
            }
        }
        return result
    }

}