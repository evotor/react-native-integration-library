/**
 * Классы для работы с устройствами, подключенными к смарт-терминалу.
 * @module devices
 */
import {DeviceModule} from '../NativeModules';
import {Weight} from '../DataWrappers/devices';
import type {DeviceConnectionEventListener, Printable, ScannerEventListener} from '../Types/inbuilt';
import {DeviceConnectionEventType, ScannerEventType} from '../Types/compilable';
import EventHolder from '../Utilities/EventHolder';
import ErrorHandler from '../Utilities/ErrorHandler';
import Converter from "../Utilities/Converter";

/**
 * @class DeviceServiceConnector
 * @classdesc Класс, с помощью методов которого можно обрабатывать подключение весов и принтера чеков к смарт-терминалу.
 * @hideconstructor
 * @memberof module:devices
 */
export class DeviceServiceConnector {

    /**
     * Инициализирует подключение весов и принтера чеков к смарт-терминалу.
     * @function module:devices.DeviceServiceConnector.startInitConnections
     * @returns {void}
     */
    static startInitConnections(): void {
        DeviceModule.startInitConnections();
    }

    /**
     * Добавляет слушатель изменения подключения весов или принтера чеков.
     * @function module:devices.DeviceServiceConnector.addEventListener
     * @param {DeviceConnectionEventType} type - Тип события
     * @param {DeviceConnectionEventListener} listener - Слушатель события
     * @returns {void}
     */
    static addEventListener(type: DeviceConnectionEventType, listener: DeviceConnectionEventListener): void {
        EventHolder.addEventListener(...arguments);
    }

    /**
     * Удаляет слушатель изменения подключения весов или принтера чеков.
     * @function module:devices.DeviceServiceConnector.removeEventListener
     * @param {DeviceConnectionEventType} type - Тип события
     * @param {?DeviceConnectionEventListener} listener - Слушатель события. В случае, если он не указан, будут удалены все слушатели указанного типа события.
     * @returns {boolean} Удалён ли слушатель
     */
    static removeEventListener(type: DeviceConnectionEventType, listener?: DeviceConnectionEventListener): boolean {
        return EventHolder.removeEventListener(...arguments);
    }

}

/**
 * @class Printer
 * @classdesc Класс, с помощью методов которого можно работать с принтером чеков, подключенным к смарт-терминалу.
 * @hideconstructor
 * @memberof module:devices
 */
export class Printer {

    /**
     * Вызывает команду печати указанных элементов.
     * @function module:devices.Printer.print
     * @param {Printable[]} printables - Элементы печати
     * @returns {Promise<void>}
     * @throws {module:errors.DeviceError}
     */
    static print(printables: Printable[]): Promise<void> {
        return new Promise((resolve, reject) => DeviceModule.print(printables, ErrorHandler.getExecutor(resolve, reject)));
    }

    /**
     * Получает максимально возможную длину строки в символах.
     * @function module:devices.Printer.getAllowableSymbolsLineLength
     * @returns {Promise<number>} Promise c длиной строки в символах
     * @throws {module:errors.DeviceError}
     */
    static getAllowableSymbolsLineLength(): Promise<number> {
        return new Promise((resolve, reject) => DeviceModule.getAllowableSymbolsLineLength(ErrorHandler.getExecutor(resolve, reject)));
    }

    /**
     * Получает максимально возможную длину строки в пикселях.
     * @function module:devices.Printer.getAllowablePixelLineLength
     * @returns {Promise<number>} Promise c длиной строки в пикселях
     * @throws {module:errors.DeviceError}
     */
    static getAllowablePixelLineLength(): Promise<number> {
        return new Promise((resolve, reject) => DeviceModule.getAllowablePixelLineLength(ErrorHandler.getExecutor(resolve, reject)));
    }

}

/**
 * @class Scales
 * @classdesc Класс, с помощью методов которого можно работать с весами, подключенными к смарт-терминалу.
 * @hideconstructor
 * @memberof module:devices
 */
export class Scales {

    /**
     * Получает вес товара, установленного на весах.
     * @function module:devices.Scales.getWeight
     * @returns {Promise<module:devices.Weight>} Promise с весом товара
     * @throws {module:errors.DeviceError}
     */
    static getWeight(): Promise<Weight> {
        return new Promise((resolve, reject) => DeviceModule.getWeight(ErrorHandler.getExecutor(Converter.getInstanceReader(resolve, Weight.prototype), reject)));
    }

}

/**
 * @class Scanner
 * @classdesc Класс, с помощью методов которого можно работать со сканером штрихкодов, подключенным к смарт-терминалу.
 * @hideconstructor
 * @memberof module:devices
 */
export class Scanner {

    /**
     * Добавляет слушатель сканирования штрихкода.
     * @function module:devices.Scanner.addEventListener
     * @param {DeviceConnectionEventType} type - Тип события
     * @param {DeviceConnectionEventListener} listener - Слушатель события
     * @returns {void}
     */
    static addEventListener(type: ScannerEventType, listener: ScannerEventListener): void {
        EventHolder.addEventListener(...arguments);
    }

    /**
     * Удаляет слушатель сканирования штрихкода.
     * @function module:devices.Scanner.removeEventListener
     * @param {DeviceConnectionEventType} type - Тип события
     * @param {?DeviceConnectionEventListener} listener - Слушатель события. В случае, если он не указан, будут удалены все слушатели указанного типа события.
     * @returns {boolean} Удалён ли слушатель
     */
    static removeEventListener(type: ScannerEventType, listener?: ScannerEventListener): boolean {
        return EventHolder.removeEventListener(...arguments);
    }

}