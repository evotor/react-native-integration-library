import {DeviceModule, NavigationModule} from '../NativeModules';
import {Weight} from '../DataWrappers/devices';
import type {DeviceConnectionEventListener, Printable, ScannerEventListener} from '../Types/types';
import {DeviceConnectionEventType, ScannerEventType} from '../Types/enums';
import EventHolder from '../Utilities/EventHolder';
import ErrorHandler from '../Utilities/ErrorHandler';
import Converter from "../Utilities/Converter";

export class DeviceServiceConnector {

    static startInitConnections(): void {
        DeviceModule.startInitConnections();
    }

    static addEventListener(type: DeviceConnectionEventType, listener: DeviceConnectionEventListener, isGlobal: boolean = true): void {
        EventHolder.addEventListener(type, Converter.getPrimitiveEventReader(listener), isGlobal);
    }

    static removeEventListener(type: DeviceConnectionEventType, listener?: DeviceConnectionEventListener): boolean {
        return EventHolder.removeEventListener(...arguments);
    }

}

export class Printer {

    static print(printables: Printable[]): Promise {
        return new Promise((resolve, reject) => DeviceModule.print(printables, ErrorHandler.getExecutor(resolve, reject)));
    }

    static getAllowableSymbolsLineLength(): Promise<number> {
        return new Promise((resolve, reject) => DeviceModule.getAllowableSymbolsLineLength(ErrorHandler.getExecutor(resolve, reject)));
    }

    static getAllowablePixelLineLength(): Promise<number> {
        return new Promise((resolve, reject) => DeviceModule.getAllowablePixelLineLength(ErrorHandler.getExecutor(resolve, reject)));
    }

}

export class Scales {

    static getWeight(): Promise<Weight> {
        return new Promise((resolve, reject) => DeviceModule.getWeight(ErrorHandler.getExecutor(Converter.getInstanceReader(resolve, Weight.prototype), reject)));
    }

}

export class Scanner {

    static addEventListener(type: ScannerEventType, listener: ScannerEventListener, isGlobal: boolean = true): void {
        EventHolder.addEventListener(type, Converter.getPrimitiveEventReader(listener), isGlobal);
    }

    static removeEventListener(type: ScannerEventType, listener?: ScannerEventListener): boolean {
        return EventHolder.removeEventListener(...arguments);
    }

}