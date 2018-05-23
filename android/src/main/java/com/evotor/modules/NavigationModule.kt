package com.evotor.modules

import android.app.Activity
import android.content.Context
import android.content.Intent

import com.evotor.activities.ReactIntegrationActivity
import com.evotor.converter.tojs.EventWriter
import com.evotor.converter.tojs.NavigationWriter
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.evotor.converter.fromjs.NavigationReader
import com.evotor.converter.tojs.ErrorWriter

import java.util.HashMap

/**
 * Created by a.lunkov on 03.11.2017.
 */

class NavigationModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    private val activityEventListener = object : ActivityEventListener {

        override fun onNewIntent(intent: Intent) {

        }

        override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent) {
            EventModule.emitLocal(
                    "ACTIVITY_RESULT",
                    EventWriter.writeActivityResultEvent(requestCode, resultCode, data)
            )
        }
    }

    override fun getName(): String {
        return "NavigationModule"
    }

    override fun getConstants(): Map<String, Any>? {
        return HashMap()
    }

    @ReactMethod
    fun setListenerEnabled(enabled: Boolean) {
        if (enabled) {
            context.addActivityEventListener(activityEventListener)
        } else {
            context.removeActivityEventListener(activityEventListener)
        }
    }

    @ReactMethod
    fun currentActivityIsRunning(callback: Callback) {
        callback.invoke(currentActivity != null)
    }

    @ReactMethod
    fun getIntent(getter: Callback) {
        try {
            getter.invoke(NavigationWriter.writeIntent(currentActivity!!.intent))
        } catch (e: NullPointerException) {
            getter.invoke(ErrorWriter.writeError("NoActivityError", e.message))
        }

    }

    @ReactMethod
    fun startActivity(intent: ReadableMap, callback: Callback) {
        navigate(
                intent,
                { result, fromActivity ->
                    if (fromActivity) {
                        currentActivity!!.startActivity(result)
                    } else {
                        context.startActivity(result)
                    }
                },
                callback
        )
    }

    @ReactMethod
    fun startActivityForResult(intent: ReadableMap, requestCode: Int, callback: Callback) {
        navigate(
                intent,
                { result, fromActivity ->
                    if (fromActivity) {
                        currentActivity!!.startActivityForResult(result, requestCode, null)
                    } else {
                        context.startActivityForResult(result, requestCode, null)
                    }
                },
                callback
        )
    }

    @ReactMethod
    fun startService(intent: ReadableMap, callback: Callback) {
        val result = NavigationReader.readIntent(context, intent.toHashMap(), callback)
        if (result != null) {
            try {
                context.startService(result)
                callback.invoke()
            } catch (e: SecurityException) {
                callback.invoke(ErrorWriter.writeError(
                        "NavigationError",
                        "TARGET_CLASS_NOT_EXPORTED"
                ))
            }

        }
    }

    private fun navigate(intent: ReadableMap, starter: (result: Intent, fromActivity: Boolean) -> Unit, callback: Callback) {
        val c: Context?
        var fromActivity = false
        if (intent.getArray("flags").toArrayList().contains(Intent.FLAG_ACTIVITY_NEW_TASK.toDouble())) {
            c = context
        } else {
            c = currentActivity
            fromActivity = true
        }
        try {
            val result = NavigationReader.readIntent(c!!, intent.toHashMap(), callback)
            if (result != null) {
                try {
                    starter.invoke(result, fromActivity)
                    callback.invoke()
                } catch (e: SecurityException) {
                    callback.invoke(ErrorWriter.writeError(
                            "NavigationError",
                            "TARGET_CLASS_NOT_EXPORTED"
                    ))
                }

            }
        } catch (e: Exception) {
            callback.invoke(ErrorWriter.writeError("NoActivityError", e.message))
        }

    }

    @ReactMethod
    fun setResult(resultCode: Int, data: ReadableMap?, callback: Callback) {
        try {
            currentActivity!!.setResult(
                    resultCode,
                    if (data == null)
                        null
                    else
                        NavigationReader.readIntent(context, data.toHashMap(), callback)
            )
            callback.invoke()
        } catch (e: NullPointerException) {
            callback.invoke(ErrorWriter.writeError("NoActivityError", e.message))
        }

    }

    @ReactMethod
    fun setIntegrationResult(eventName: String, result: ReadableMap, callback: Callback) {
        try {
            (currentActivity as ReactIntegrationActivity).setIntegrationResult(
                    IntegrationModule.resultReaders[eventName]?.read(context, result.toHashMap())
            )
            callback.invoke()
        } catch (e: NullPointerException) {
            callback.invoke(ErrorWriter.writeError("NoActivityError", e.message))
        } catch (e: RuntimeException) {
            callback.invoke(ErrorWriter.writeError("IntegrationError", e.message))
        }

    }

    @ReactMethod
    fun finish(callback: Callback) {
        try {
            currentActivity!!.finish()
            callback.invoke()
        } catch (e: NullPointerException) {
            callback.invoke(ErrorWriter.writeError("NoActivityError", e.message))
        }

    }

    companion object {

        @JvmStatic
        fun onBackPressed(vararg data: Any) {
            EventModule.emitLocal("BACK_PRESSED", data)
        }
    }

}
