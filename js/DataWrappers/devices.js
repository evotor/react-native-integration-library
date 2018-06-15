import {BarcodeType} from "../Types/compilable";

/**
 * @class PrintableText
 * @classdesc Класс, содержащий текст для печати на принтере чеков.
 * @memberOf module:devices
 * @param {string} text - Текст для печати
 */
export class PrintableText {
    constructor(text: string) {
        this.type = 'TEXT';
        this.value = text;
    }
}

/**
 * @class PrintableBarcode
 * @classdesc Класс, содержащий данные штрихкода для печати на принтере чеков.
 * @memberOf module:devices
 * @param {string} barcodeValue - Значение штрихкода
 * @param {BarcodeType} barcodeType - Тип штрихкода
 */
export class PrintableBarcode {
    constructor(barcodeValue: string, barcodeType: BarcodeType) {
        this.type = 'BARCODE';
        this.value = barcodeValue;
        this.barcodeType = barcodeType;
    }
}

/**
 * @class PrintableImage
 * @classdesc Класс, содержащий данные картинки для печати на принтере чеков.
 * @memberOf module:devices
 * @param {string} uri - Путь к ресурсу с изображением. Например: "android.resource://com.revotor/drawable/ic_launcher".
 */
export class PrintableImage {
    constructor(uri: string) {
        this.type = 'IMAGE';
        this.uri = uri;
    }
}

/**
 * @class Weight
 * @classdesc Класс, содержащий данные о весе товара на весах, подключённых к смарт-терминалу.
 * @memberOf module:devices
 * @param {string} weightInGrams - Вес товара в граммах
 * @param {boolean} supportStable - Поддерживали ли весы флаг стабильности при последнем взвешивании
 * @param {boolean} stable - Было ли стабильным последнее взвешивание
 */
export class Weight {
    constructor(weightInGrams: number, supportStable: boolean, stable: boolean) {
        this.weightInGrams = weightInGrams;
        this.supportStable = supportStable;
        this.stable = stable;
    }
}
