package com.evotor.modules

import com.evotor.WritableArrayExt
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import ru.evotor.framework.kkt.api.KktApi
import java.util.*

class KktModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    override fun getName(): String {
        return "KktModule"
    }

    override fun getConstants(): Map<String, Any>? {
        return HashMap()
    }

    @ReactMethod
    fun getSupportedFfdVersion(callback: Callback) {
        callback.invoke(KktApi.getSupportedFfdVersion(context).name)
    }

    @ReactMethod
    fun getRegisteredAgentTypes(callback: Callback) {
        callback.invoke(KktApi.getRegisteredAgentTypes(context)?.let { WritableArrayExt.fromList(it) })
    }

    @ReactMethod
    fun getRegisteredSubagentTypes(callback: Callback) {
        callback.invoke(KktApi.getRegisteredSubagentTypes(context)?.let { WritableArrayExt.fromList(it) })
    }

}
