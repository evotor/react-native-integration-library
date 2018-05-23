import React from 'react';
import {AppRegistry, DeviceEventEmitter} from 'react-native';
import {DeviceModule, NavigationModule} from '../NativeModules';
import {DeviceConnectionEventType} from "../Types/compilable";
import Converter from "./Converter";

const setListenersEnabled = (type, enabled) => {
    if (type === `ACTIVITY_RESULT`) {
        NavigationModule.setListenerEnabled(enabled);
    } else if (DeviceConnectionEventType.hasOwnProperty(type)) {
        DeviceModule.setListenerEnabled(enabled);
    }
};

export default class EventHolder {

    static events = {};

    static addEventListener(type, listener) {
        if (!this.events.hasOwnProperty(type)) {
            this.events[type] = [];
            setListenersEnabled(type, true)
        }
        if (!this.events[type].includes(listener)) {
            this.events[type].push(listener)
        }
    }

    static removeEventListener(type, listener) {
        if (!this.events.hasOwnProperty(type)) {
            return false
        }
        const prevLength = this.events[type].length;
        if (listener) {
            const removeIndex = this.events[type].indexOf(listener);
            if (removeIndex > -1) {
                this.events[type] = this.events[type].filter((item, i) => i !== removeIndex)
            }
        }
        if (!listener || this.events[type].length === 0) {
            setListenersEnabled(type, false);
            return delete this.events[type]
        }
        return prevLength > this.events[type].length
    }

}

const executeListeners = (eventData) => {
    if (eventData && EventHolder.events.hasOwnProperty(eventData.type)) {
        EventHolder.events[eventData.type].forEach(
            Converter.getEventListenerReader(eventData.type, eventData.extras)
        )
    }
};

DeviceEventEmitter.addListener('LocalEventEmission', executeListeners);

AppRegistry.registerHeadlessTask('GlobalEventEmission', () => async (eventData) => executeListeners(eventData));