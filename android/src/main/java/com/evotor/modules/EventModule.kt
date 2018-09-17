package com.evotor.modules

import android.content.Context
import android.content.Intent
import android.os.Bundle

import com.evotor.converter.from.js.NavigationReader
import com.evotor.converter.to.js.EventWriter
import com.evotor.services.EventEmissionService
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

import java.util.HashMap

/**
 * Created by a.lunkov on 21.12.2017.
 */

class EventModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    init {
        localEmitter = object : LocalEmitter {
            override fun emit(data: WritableMap) {
                context
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("LocalEventEmission", data)
            }
        }
    }

    override fun getName(): String {
        return "EventModule"
    }

    override fun getConstants(): Map<String, Any> {
        return HashMap()
    }

    internal interface LocalEmitter {
        fun emit(data: WritableMap)
    }

    companion object {

        private var localEmitter: LocalEmitter? = null

        fun emit(c: Context, eventName: String, data: Any?) {
            if (!emitLocal(eventName, data)) {
               emitGlobal(c, eventName, data)
            }
        }

        fun emitLocal(eventName: String, data: Any?): Boolean {
            localEmitter?.emit(EventWriter.writeLocalEvent(eventName, data))
            return localEmitter != null
        }

        fun emitGlobal(c: Context, eventName: String, data: Any?) {
            val extras = Bundle()
            NavigationReader.readDefaultIntentExtra(c, "extras", data, extras)
            c.startService(
                    Intent(c, EventEmissionService::class.java)
                            .putExtra("type", eventName)
                            .putExtras(extras)
            )
        }

    }

}
