package com.evotor.services.broadcast

import android.content.Context
import android.os.Bundle
import com.evotor.converter.to.js.EventWriter
import com.evotor.modules.EventModule
import ru.evotor.pushNotifications.PushNotificationReceiver

class ReactPushNotificationReceiver : PushNotificationReceiver() {
    override fun onReceivePushNotification(context: Context, data: Bundle, messageId: Long) {
        EventModule.emit(
                context,
                "PUSH_NOTIFICATION_RECEIVED",
                EventWriter.writePushNotification(data, messageId)
        )
    }

}