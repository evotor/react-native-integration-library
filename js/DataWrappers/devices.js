import {BarcodeType} from "../Types/compilable";

/**
 * @class module:devices.PrintableText
 * @classdesc Класс, содержащий текст для печати на принтере чеков.
 * @param {string} text - Текст для печати
 */
export class PrintableText {
    constructor(text: string) {
        this.type = 'TEXT';
        this.value = text;
    }
}

/**
 * @class module:devices.PrintableBarcode
 * @classdesc Класс, содержащий данные штрихкода для печати на принтере чеков.
 * @param {string} barcodeValue - Значение штрихкода
 * @param {module:types#BarcodeType} barcodeType - Тип штрихкода
 */
export class PrintableBarcode {
    constructor(barcodeValue: string, barcodeType: BarcodeType) {
        this.type = 'BARCODE';
        this.value = barcodeValue;
        this.barcodeType = barcodeType;
    }
}

/**
 * @class module:devices.PrintableImage
 * @classdesc Класс, содержащий данные картинки для печати на принтере чеков.
 * @param {string} uri - Путь к ресурсу с изображением. Например: "android.resource://com.revotor/drawable/ic_launcher".
 */
export class PrintableImage {
    constructor(uri: string) {
        this.type = 'IMAGE';
        this.uri = uri;
    }
}

/**
 * @class module:devices.Weight
 * @classdesc Класс, содержащий данные о весе товара на весах, подключённых к смарт-терминалу.
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
