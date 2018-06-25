package com.evotor.converter.to.js

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


    fun writeGrant(source: Grant): WritableMap {
        val result = Arguments.createMap()
        result.putString("title", source.title)
        result.putString("roleUuid", source.roleUuid)
        return result
    }

    fun writeGrants(source: List<Grant>): WritableArray {
        val result = Arguments.createArray()
        for (i in source.indices) {
            result.pushMap(writeGrant(source[i]))
        }
        return result
    }

}