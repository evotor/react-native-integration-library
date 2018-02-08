import React from 'react';
import {AppRegistry} from 'react-native';
import {EventModule} from "../NativeModules";

export default class EventHolder {

    static events = {};

    static addEventListener(type, listener, isGlobal) {
        if (!EventHolder.events.hasOwnProperty(type)) {
            EventHolder.events[type] = [];
            EventModule.setListenerEnabled(type, true);
        }
        let abort;
        for (let i = 0; i < EventHolder.events[type].length; i++) {
            if (EventHolder.events[type][i].listener === listener) {
                abort = true;
                break;
            }
        }
        if (!abort) {
            EventHolder.events[type].push({
                listener: listener,
                isGlobal: isGlobal
            });
        }
    }

    static removeEventListener(type, listener) {
        if (!EventHolder.events.hasOwnProperty(type)) {
            return false;
        }
        if (listener && EventHolder.events[type].length > 1) {
            const prevLength = EventHolder.events[type].length;
            EventHolder.events[type].filter(
                (e) => e.listener !== listener
            );
            return EventHolder.events[type].length < prevLength;
        } else {
            EventModule.setListenerEnabled(type, false);
            return delete EventHolder.events[type];
        }
    }

}

AppRegistry.registerHeadlessTask(
    'EventListener',
    () => async (eventData) => {
        if (EventHolder.events.hasOwnProperty(eventData.type)) {
            EventHolder.events[eventData.type].forEach(
                (event) => {
                    if (event.isGlobal || (!event.isGlobal && eventData.appIsRunning)) {
                        event.listener(eventData.extras);
                    }
                }
            );
        }
    }
);

