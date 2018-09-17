package com.evotor.modules

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

import java.util.HashMap

import ru.evotor.framework.system.SystemStateApi

/**
 * Created by a.lunkov on 16.02.2018.
 */

class SessionModule(c: ReactApplicationContext) : ReactContextBaseJavaModule(c) {

    private val context: ReactContext

    init {
        context = c
    }

    override fun getName(): String {
        return "SessionModule"
    }

    override fun getConstants(): Map<String, Any>? {
        return HashMap()
    }

    @ReactMethod
    fun getLastSessionNumber(callback: Callback) {
        callback.invoke(SystemStateApi.getLastSessionNumber(context)?.toInt())
    }

    @ReactMethod
    fun isSessionOpened(callback: Callback) {
        callback.invoke(SystemStateApi.isSessionOpened(context))
    }

}
