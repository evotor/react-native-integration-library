import React from 'react';
import {NativeModules} from 'react-native';

export const [
    UserModule,
    EventModule,
    DeviceModule,
    ReceiptModule,
    CommandModule,
    SessionModule,
    InventoryModule,
    NavigationModule,
    IntegrationModule,
] = [
    NativeModules.UserModule,
    NativeModules.EventModule,
    NativeModules.DeviceModule,
    NativeModules.ReceiptModule,
    NativeModules.CommandModule,
    NativeModules.SessionModule,
    NativeModules.InventoryModule,
    NativeModules.NavigationModule,
    NativeModules.IntegrationModule
];