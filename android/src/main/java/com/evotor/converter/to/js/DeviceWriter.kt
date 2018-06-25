package com.evotor.converter.to.js

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import ru.evotor.devices.commons.scales.Weight

/**
 * Created by a.lunkov on 16.03.2018.
 */
object DeviceWriter {

    fun writeWeight(source: Weight): WritableMap {
        val result = Arguments.createMap()
        result.putDouble("weightInGrams", source.weightInGrams.toDouble())
        result.putBoolean("supportStable", source.isSupportStable)
        result.putBoolean("stable", source.isStable)
        return result
    }

}