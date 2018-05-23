package com.evotor.converter.tojs

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import ru.evotor.framework.users.Grant
import ru.evotor.framework.users.User

/**
 * Created by a.lunkov on 16.03.2018.
 */
object UserWriter {

    fun writeUser(source: User): WritableMap {
        val result = Arguments.createMap()
        result.putString("uuid", source.uuid)
        result.putString("secondName", source.secondName)
        result.putString("firstName", source.firstName)
        result.putString("phone", source.phone)
        result.putString("pin", source.pin)
        result.putString("roleUuid", source.roleUuid)
        result.putString("roleTitle", source.roleTitle)
        return result
    }

    fun writeUsers(source: List<User>): WritableArray {
        val result = Arguments.createArray()
        for (i in source.indices) {
            result.pushMap(writeUser(source[i]))
        }
        return result
    }

    fun writeGrants(source: List<Grant>): WritableArray {
        val result = Arguments.createArray()
        for (i in source.indices) {
            val item = Arguments.createMap()
            item.putString("title", source[i].title)
            item.putString("roleUuid", source[i].roleUuid)
            result.pushMap(item)
        }
        return result
    }

}