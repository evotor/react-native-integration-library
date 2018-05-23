package com.evotor.services

import android.content.Intent

import com.evotor.converter.tojs.NavigationWriter
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig

/**
 * Created by a.lunkov on 21.12.2017.
 */

class EventEmissionService : HeadlessJsTaskService() {

    override fun getTaskConfig(intent: Intent): HeadlessJsTaskConfig? {
        return HeadlessJsTaskConfig(
                "GlobalEventEmission",
                if (intent.extras == null) Arguments.createMap() else NavigationWriter.writeBundle(intent.extras!!),
                0,
                true
        )
    }

}
