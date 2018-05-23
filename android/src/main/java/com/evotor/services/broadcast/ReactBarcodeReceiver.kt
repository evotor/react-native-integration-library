package com.evotor.services.broadcast

import android.content.Context

import com.evotor.modules.EventModule

import ru.evotor.integrations.BarcodeBroadcastReceiver

/**
 * Created by a.lunkov on 25.12.2017.
 */

class ReactBarcodeReceiver : BarcodeBroadcastReceiver() {
    override fun onBarcodeReceived(barcode: String, context: Context?) {
        if (context != null) {
            EventModule.emit(context, "BARCODE_RECEIVED", barcode)
        }
    }
}
