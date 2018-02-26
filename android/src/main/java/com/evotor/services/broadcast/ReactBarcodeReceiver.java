package com.evotor.services.broadcast;

import android.content.Context;

import com.evotor.modules.EventModule;

import java.util.HashMap;
import java.util.Map;

import ru.evotor.integrations.BarcodeBroadcastReceiver;

/**
 * Created by a.lunkov on 25.12.2017.
 */

public class ReactBarcodeReceiver extends BarcodeBroadcastReceiver {
    @Override
    public void onBarcodeReceived(String s, Context context) {
        final Map<String, String> data = new HashMap<>();
        data.put("value", s);
        EventModule.startService(context, "BARCODE_RECEIVED", data);
    }
}
