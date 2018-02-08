package com.evotor.services.broadcast;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.evotor.modules.EventModule;
import com.evotor.services.EventListenerService;
import com.evotor.utilities.Writer;
import com.facebook.react.bridge.Arguments;

import ru.evotor.integrations.BarcodeBroadcastReceiver;

/**
 * Created by a.lunkov on 25.12.2017.
 */

public class ReactBarcodeReceiver extends BarcodeBroadcastReceiver {
    @Override
    public void onBarcodeReceived(String s, Context context) {
        final Bundle data = new Bundle();
        data.putString("value", s);
        EventModule.startService(context, "BARCODE_RECEIVED", data);
    }
}
