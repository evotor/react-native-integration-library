import React from 'react';
import {NativeModules} from 'react-native';

export const [
    UserModule,
    EventModule,
    DeviceModule,
    ReceiptModule,
    InventoryModule,
    NavigationModule,
    IntegrationModule,
] = [
    NativeModules.UserModule,
    NativeModules.EventModule,
    NativeModules.DeviceModule,
    NativeModules.ReceiptModule,
    NativeModules.InventoryModule,
    NativeModules.NavigationModule,
    NativeModules.IntegrationModule
];