package com.evotor.modules

import com.evotor.services.integration.ReactIntegrationService
import com.evotor.services.integration.events.PaymentSystemService
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.evotor.services.integration.events.PaymentSelectService
import com.evotor.services.integration.events.PositionsEditService
import com.evotor.services.integration.events.PrintExtraService
import com.evotor.services.integration.events.PrintGroupService
import com.evotor.services.integration.events.ReceiptDiscountService

import java.util.Collections
import java.util.HashMap

/**
 * Created by a.lunkov on 25.10.2017.
 */

class IntegrationModule(c: ReactApplicationContext) : ReactContextBaseJavaModule(c) {

    override fun getName(): String {
        return "IntegrationModule"
    }

    override fun getConstants(): Map<String, Any>? {
        return HashMap()
    }

    @ReactMethod
    fun setIntegrationResult(eventName: String, result: ReadableMap, callback: Callback) {
        integrators[eventName]?.integrate(result.toHashMap(), callback)
    }

    companion object {

        val integrators: Map<String, ReactIntegrationService.Integrator> = HashMap()
        val resultReaders: Map<String, ReactIntegrationService.IntegrationResultReader> = initResultReaders()

        private fun initResultReaders(): Map<String, ReactIntegrationService.IntegrationResultReader> {
            val result = HashMap<String, ReactIntegrationService.IntegrationResultReader>()
            PositionsEditService.getResultReader(result)
            ReceiptDiscountService.getResultReader(result)
            PaymentSelectService.getResultReader(result)
            PaymentSystemService.getResultReader(result)
            PrintGroupService.getResultReader(result)
            PrintExtraService.getResultReader(result)
            return Collections.unmodifiableMap<String, ReactIntegrationService.IntegrationResultReader>(result)
        }
    }

}
