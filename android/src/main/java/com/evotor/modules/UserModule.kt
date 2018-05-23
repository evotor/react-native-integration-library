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
        val users = UserApi.getAllUsers(context)
        callback.invoke(if (users == null) null else UserWriter.writeUsers(users))
    }

    @ReactMethod
    fun getAuthenticatedUser(callback: Callback) {
        val user = UserApi.getAuthenticatedUser(context)
        callback.invoke(if (user == null) null else UserWriter.writeUser(user))
    }

    @ReactMethod
    fun getAllGrants(callback: Callback) {
        val grants = UserApi.getAllGrants(context)
        callback.invoke(if (grants == null) null else UserWriter.writeGrants(grants))
    }

    @ReactMethod
    fun getGrantsOfAuthenticatedUser(callback: Callback) {
        val grants = UserApi.getGrantsOfAuthenticatedUser(context)
        callback.invoke(if (grants == null) null else UserWriter.writeGrants(grants))
    }

}
