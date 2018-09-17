package com.evotor.converter.to.js

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

/**
 * Created by a.lunkov on 25.10.2017.
 */

object ErrorWriter {

    fun writeError(type: String, message: String?): WritableMap {
        val result = Arguments.createMap()
        result.putString("error", type)
        result.putString("message", message)
        return result
    }

}
