package com.evotor.modules

import com.evotor.converter.fromjs.DeviceReader
import com.evotor.converter.tojs.DeviceWriter
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.evotor.converter.tojs.ErrorWriter

import java.util.HashMap

import ru.evotor.devices.commons.ConnectionWrapper
import ru.evotor.devices.commons.DeviceServiceConnector
import ru.evotor.devices.commons.exception.DeviceServiceException
import ru.evotor.devices.commons.printer.PrinterDocument
import ru.evotor.devices.commons.services.IPrinterServiceWrapper
import ru.evotor.devices.commons.services.IScalesServiceWrapper

/**
 * Created by a.lunkov on 13.11.2017.
 */

class DeviceModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    private val connectionWrapper = object : ConnectionWrapper {

        override fun onPrinterServiceConnected(service: IPrinterServiceWrapper) {
            emitConnection("PRINTER", true)
        }

        override fun onPrinterServiceDisconnected() {
            emitConnection("PRINTER", false)
        }

        override fun onScalesServiceConnected(service: IScalesServiceWrapper) {
            emitConnection("SCALES", true)
        }

        override fun onScalesServiceDisconnected() {
            emitConnection("SCALES", false)
        }

    }

    override fun getName(): String {
        return "DeviceModule"
    }

    override fun getConstants(): Map<String, Any>? {
        return HashMap()
    }

    private fun emitConnection(device: String, connected: Boolean) {
        EventModule.emit(context, device + "_CONNECTION_CHANGED", connected)
    }

    @ReactMethod
    fun setListenerEnabled(enabled: Boolean) {
        if (enabled) {
            DeviceServiceConnector.addConnectionWrapper(connectionWrapper)
        } else {
            DeviceServiceConnector.removeConnectionWrapper(connectionWrapper)
        }
    }

    @ReactMethod
    fun startInitConnections() {
        DeviceServiceConnector.startInitConnections(context)
    }

    @ReactMethod
    fun print(printables: ReadableArray, callback: Callback) {
        try {
            DeviceServiceConnector.getPrinterService().printDocument(
                    ru.evotor.devices.commons.Constants.DEFAULT_DEVICE_INDEX,
                    PrinterDocument(*DeviceReader.readPrintables(context, printables.toArrayList()))
            )
            callback.invoke()
        } catch (e: DeviceServiceException) {
            callback.invoke(ErrorWriter.writeError("DeviceError", e.message))
        }

    }

    @ReactMethod
    fun getAllowablePixelLineLength(getter: Callback) {
        try {
            getter.invoke(DeviceServiceConnector.getPrinterService().getAllowablePixelLineLength(
                    ru.evotor.devices.commons.Constants.DEFAULT_DEVICE_INDEX
            ))
        } catch (e: DeviceServiceException) {
            getter.invoke(ErrorWriter.writeError("DeviceError", e.message))
        }

    }

    @ReactMethod
    fun getAllowableSymbolsLineLength(getter: Callback) {
        try {
            getter.invoke(DeviceServiceConnector.getPrinterService().getAllowableSymbolsLineLength(
                    ru.evotor.devices.commons.Constants.DEFAULT_DEVICE_INDEX
            ))
        } catch (e: DeviceServiceException) {
            getter.invoke(ErrorWriter.writeError("DeviceError", e.message))
        }

    }

    @ReactMethod
    fun getWeight(getter: Callback) {
        try {
            getter.invoke(DeviceWriter.writeWeight(DeviceServiceConnector.getScalesService().getWeight(
                    ru.evotor.devices.commons.Constants.DEFAULT_DEVICE_INDEX
            )))
        } catch (e: DeviceServiceException) {
            getter.invoke(ErrorWriter.writeError("DeviceError", e.message))
        }

    }

}
