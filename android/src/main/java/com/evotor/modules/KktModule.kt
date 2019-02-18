package com.evotor.modules

import com.evotor.WritableArrayExt
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import ru.evotor.framework.kkt.api.KktApi
import java.lang.Exception
import java.util.*

class KktModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    override fun getName(): String {
        return "KktModule"
    }

    override fun getConstants(): Map<String, Any>? {
        return HashMap()
    }

    @ReactMethod
    fun getSupportedFfdVersion(callback: Callback) = try {
        callback.invoke(KktApi.getRegisteredFfdVersion(context)?.name)
    } catch (e: Exception) {
        callback.invoke(null)
    }


    @ReactMethod
    fun getRegisteredAgentTypes(callback: Callback) = try {
        callback.invoke(KktApi.getRegisteredAgentTypes(context)?.let { WritableArrayExt.fromList(it) })
    } catch (e: Exception) {
        callback.invoke(null)
    }

    @ReactMethod
    fun getRegisteredSubagentTypes(callback: Callback) = try {
        callback.invoke(KktApi.getRegisteredSubagentTypes(context)?.let { WritableArrayExt.fromList(it) })
    } catch (e: Exception) {
        callback.invoke(null)
    }

    @ReactMethod
    fun isVatRate20Available(callback: Callback) = try {
        callback.invoke(KktApi.isVatRate20Available(context))
    } catch (e: Exception) {
        callback.invoke(null)
    }

}
