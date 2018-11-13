package com.evotor

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray

object WritableArrayExt {
    fun <T> fromList(list: List<T>?): WritableArray? = list?.let {
        Arguments.createArray().apply {
            it.forEach { item ->
                when (item) {
                    is String -> this.pushString(item)
                    is Enum<*> -> this.pushString(item.name)
                }
            }
        }
    }
}