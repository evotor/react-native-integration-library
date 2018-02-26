package com.evotor.services;

import android.content.Intent;
import android.support.annotation.Nullable;

import com.evotor.converter.Writer;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

/**
 * Created by a.lunkov on 21.12.2017.
 */

public class EventListenerService extends HeadlessJsTaskService {

    @Override
    protected @Nullable
    HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        return new HeadlessJsTaskConfig(
                "EventListener",
                intent.getExtras() == null ? Arguments.createMap() : Writer.INSTANCE.writeIntentExtras(intent.getExtras()),
                0, // timeout for the task
                true // optional: defines whether or not  the task is allowed in foreground. Default is false
        );
    }

}
