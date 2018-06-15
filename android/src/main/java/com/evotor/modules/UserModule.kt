package com.evotor.modules

import com.evotor.converter.tojs.UserWriter
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

import java.util.HashMap

import ru.evotor.framework.users.Grant
import ru.evotor.framework.users.User
import ru.evotor.framework.users.UserApi

/**
 * Created by a.lunkov on 24.10.2017.
 */

class UserModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    override fun getName(): String {
        return "UserModule"
    }

    override fun getConstants(): Map<String, Any>? {
        return HashMap()
    }

    @ReactMethod
    fun getAllUsers(callback: Callback) {
        callback.invoke(UserApi.getAllUsers(context)?.let { UserWriter.writeUsers(it) })
    }

    @ReactMethod
    fun getAuthenticatedUser(callback: Callback) {
        callback.invoke(UserApi.getAuthenticatedUser(context)?.let { UserWriter.writeUser(it) })
    }

    @ReactMethod
    fun getAllGrants(callback: Callback) {
        callback.invoke(UserApi.getAllGrants(context)?.let { UserWriter.writeGrants(it) })
    }

    @ReactMethod
    fun getGrantsOfAuthenticatedUser(callback: Callback) {
        val grants = UserApi.getGrantsOfAuthenticatedUser(context)
        callback.invoke(UserApi.getGrantsOfAuthenticatedUser(context)?.let { UserWriter.writeGrants(it) })
    }

}
