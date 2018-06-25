import {NativeModules} from 'react-native';

export const [
    UserModule,
    EventModule,
    QueryModule,
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
    NativeModules.QueryModule,
    NativeModules.DeviceModule,
    NativeModules.ReceiptModule,
    NativeModules.CommandModule,
    NativeModules.SessionModule,
    NativeModules.InventoryModule,
    NativeModules.NavigationModule,
    NativeModules.IntegrationModule
];