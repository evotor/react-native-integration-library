/**
 * Классы для работы с чеком.
 * @module receipt
 */
import {CommandModule, ReceiptModule} from "../NativeModules";
import {ExtraKey, Position, PrintReceipt, Receipt, ReceiptHeader} from "../DataWrappers/receipt/framework";
import {SetExtra} from "../DataWrappers/receipt/changes";
import {ProductType, ReceiptType, TaxNumber} from "../Types/compilable";
import Converter from "../Utilities/Converter";
import ErrorHandler from "../Utilities/ErrorHandler";
import {OpenReceiptCommandResult, RegisterReceiptCommandResult} from "../DataWrappers/receipt/commands";
import {Product} from "../DataWrappers/inventory/framework";
import uuidv1 from 'uuid/v1';
import uuidv3 from 'uuid/v3';
import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';

const openReceipt = (receiptType, positions, extra) => {
    return new Promise((resolve, reject) => CommandModule.openReceipt(
        receiptType,
        positions ? positions : null,
        extra ? extra : null,
        ErrorHandler.getExecutor(Converter.getInstanceReader(resolve, OpenReceiptCommandResult.prototype), reject)
    ));
};

const registerReceipt = (receiptType, printReceipts, extra, phone, email, discount) => {
    return new Promise((resolve, reject) => CommandModule.registerReceipt(
        receiptType,
        Converter.writePrintReceipts(printReceipts),
        extra,
        phone,
        email,
        discount ? discount.toString() : "",
        ErrorHandler.getExecutor(Converter.getInstanceReader(resolve, RegisterReceiptCommandResult.prototype), reject)
    ));
};

/**
 * @class module:receipt.ReceiptAPI
 * @classdesc С помощью методов класса можно получать данные чеков и передавать их для обработки в смарт-терминал.
 * @hideconstructor
 */
export default class ReceiptAPI {

    /**
     * Получает массив позиций чека по значению штрихкода.
     * @function module:receipt.ReceiptAPI.getPositionsByBarcode
     * @param barcode {string} - Штрихкод
     * @returns {Promise<module:receipt.Position[]>} Promise с массивом позиций
     */
    static getPositionsByBarcode(barcode: string): Promise<Position[]> {
        return new Promise(resolve => ReceiptModule.getPositionsByBarcode(barcode, Converter.getPositionsReader(resolve)));
    }

    /**
     * Формирует чек продажи из полученных данных. Вы можете открыть окно редактирования или оплаты чека с помощью [NavigationAPI]{@link module:navigation.NavigationAPI.startActivity}.
     * @function module:receipt.ReceiptAPI.openSellReceipt
     * @param {module:receipt.Position[]} [positions] - Массив позиций
     * @param {module:receipt.SetExtra} [extra] - Дополнительные поля чека
     * @returns {Promise<module:receipt.OpenReceiptCommandResult>} Promise с результатом команды открытия чека
     * @throws {module:errors.IntegrationError}
     */
    static openSellReceipt(positions?: Position[], extra?: SetExtra): Promise<OpenReceiptCommandResult> {
        return openReceipt(ReceiptType.SELL, ...arguments);
    }

    /**
     * Формирует чек возврата из полученных данных. Вы можете открыть окно редактирования или оплаты чека с помощью [NavigationAPI]{@link module:navigation.NavigationAPI.startActivity}.
     * @function module:receipt.ReceiptAPI.openPaybackReceipt
     * @param {module:receipt.Position[]} [positions] - Массив позиций
     * @param {module:receipt.SetExtra} [extra] - Дополнительные поля чека
     * @returns {Promise<module:receipt.OpenReceiptCommandResult>} Promise с результатом команды открытия чека
     * @throws {module:errors.IntegrationError}
     */
    static openPaybackReceipt(positions?: Position[], extra?: SetExtra): Promise<OpenReceiptCommandResult> {
        return openReceipt(ReceiptType.PAYBACK, ...arguments);
    }

    /**
     * Формирует чек покупки из полученных данных. Вы можете открыть окно редактирования или оплаты чека с помощью [NavigationAPI]{@link module:navigation.NavigationAPI.startActivity}.
     * @function module:receipt.ReceiptAPI.openBuyReceipt
     * @param {module:receipt.Position[]} [positions] - Массив позиций
     * @param {module:receipt.SetExtra} [extra] - Дополнительные поля чека
     * @returns {Promise<module:receipt.OpenReceiptCommandResult>} Promise с результатом команды открытия чека
     * @throws {module:errors.IntegrationError}
     */
    static openBuyReceipt(positions?: Position[], extra?: SetExtra): Promise<OpenReceiptCommandResult> {
        return openReceipt(ReceiptType.BUY, ...arguments);
    }

    /**
     * Формирует чек возврата покупки из полученных данных. Вы можете открыть окно редактирования или оплаты чека с помощью [NavigationAPI]{@link module:navigation.NavigationAPI.startActivity}.
     * @function module:receipt.ReceiptAPI.openBuybackReceipt
     * @param {module:receipt.Position[]} [positions] - Массив позиций
     * @param {module:receipt.SetExtra} [extra] - Дополнительные поля чека
     * @returns {Promise<module:receipt.OpenReceiptCommandResult>} Promise с результатом команды открытия чека
     * @throws {module:errors.IntegrationError}
     */
    static openBuybackReceipt(positions?: Position[], extra?: SetExtra): Promise<OpenReceiptCommandResult> {
        return openReceipt(ReceiptType.BUYBACK, ...arguments);
    }

    /**
     * Формирует чек продажи из полученных данных, регистрирует его в ККМ, печатает его и отправляет его на электронную почту и/или телефон.
     * @function module:receipt.ReceiptAPI.registerSellReceipt
     * @param {module:receipt.PrintReceipt[]} printReceipts - Массив данных для печати
     * @param {?module:receipt.SetExtra} extra - Дополнительные поля чека
     * @param {?string} phone - Телефон получателя
     * @param {?string} email - Email получателя
     * @param {?string} discount - Скидка на чек
     * @returns {Promise<module:receipt.OpenReceiptCommandResult>} Promise с результатом команды регистрации чека
     * @throws {module:errors.IntegrationError}
     */
    static registerSellReceipt(printReceipts: PrintReceipt[],
                               extra: SetExtra | null,
                               phone: string | null,
                               email: string | null,
                               discount?: number): Promise<RegisterReceiptCommandResult> {
        return registerReceipt(ReceiptType.SELL, ...arguments);
    }

    /**
     * Формирует чек возврата из полученных данных, регистрирует его в ККМ и отправляет его на электронную почту и/или телефон.
     * @function module:receipt.ReceiptAPI.registerPaybackReceipt
     * @param {module:receipt.PrintReceipt[]} printReceipts - Массив данных для печати
     * @param {?module:receipt.SetExtra} extra - Дополнительные поля чека
     * @param {?string} phone - Телефон получателя
     * @param {?string} email - Email получателя
     * @param {?string} discount - Скидка на чек
     * @returns {Promise<module:receipt.OpenReceiptCommandResult>} Promise с результатом команды регистрации чека
     * @throws {module:errors.IntegrationError}
     */
    static registerPaybackReceipt(printReceipts: PrintReceipt[],
                                  extra: SetExtra | null,
                                  phone: string | null,
                                  email: string | null,
                                  discount?: number): Promise<RegisterReceiptCommandResult> {
        return registerReceipt(ReceiptType.PAYBACK, ...arguments);
    }

    /**
     * Получает чек по типу.
     * @function module:receipt.ReceiptAPI.getReceiptByType
     * @param {module:types#ReceiptType} type - Тип чека
     * @returns {Promise<?module:receipt.Receipt>} Promise с чеком
     */
    static getReceiptByType(type: ReceiptType): Promise<Receipt | null> {
        return new Promise(resolve => ReceiptModule.getReceiptByType(type, Converter.getReceiptReader(resolve)));
    }

    /**
     * Получает чек по идентификатору (uuid).
     * @function module:receipt.ReceiptAPI.getReceiptByUuid
     * @param {string} uuid - Идентификатор (uuid) чека
     * @returns {Promise<?module:receipt.Receipt>} Promise с чеком
     */
    static getReceiptByUuid(uuid: string): Promise<Receipt | null> {
        return new Promise(resolve => ReceiptModule.getReceiptByUuid(uuid, Converter.getReceiptReader(resolve)));
    }

    /**
     * Получает массив всех заголовков чека.
     * @function module:receipt.ReceiptAPI.getReceiptHeaders
     * @param {module:types#ReceiptType} type - Тип чека
     * @returns {Promise<?module:receipt.ReceiptHeader[]>} Promise с массивом заголовков чека
     */
    static getReceiptHeaders(type?: ReceiptType): Promise<ReceiptHeader[] | null> {
        return new Promise(resolve => ReceiptModule.getReceiptHeaders(type ? type : null, Converter.getArrayReader(resolve, ReceiptHeader.prototype)));
    }

}

/**
 * @class UuidGenerator
 * @classdesc Класс для генерации индентификатора (uuid). Полное руководство: https://www.npmjs.com/package/uuid
 * @hideconstructor
 * @memberof module:receipt
 */
export class UuidGenerator {

    /** @function module:receipt.UuidGenerator.v1 */
    static v1(options?: Object, buffer?: Array, offset?: number): string {
        return uuidv1(...arguments);
    }

    /** @function module:receipt.UuidGenerator.v3 */
    static v3(name?: string | Array, namespace?: string | Array, buffer?: Array, offset: number): string {
        return uuidv3(...arguments);
    }

    /** @function module:receipt.UuidGenerator.v4 */
    static v4(options?: Object, buffer?: Array, offset?: number): string {
        return uuidv4(...arguments);
    }

    /** @function module:receipt.UuidGenerator.v5 */
    static v5(name?: string | Array, namespace?: string | Array, buffer?: Array, offset: number): string {
        return uuidv5(...arguments);
    }

}

/**
 * @class PositionBuilder
 * @classdesc Класс для создания и редактирования позиций чека.
 * @hideconstructor
 * @memberof module:receipt
 */
export class PositionBuilder {

    /**
     * Создаёт редактор новой позиции из данных указанного товара с указанным количеством.
     * @function module:receipt.PositionBuilder.newInstance
     * @param {module:inventory.Product} product - Товар
     * @param {number} quantity - Количество
     * @returns {module:receipt.PositionBuilder} Редактор текущей позиции
     */
    static newInstance(product: Product, quantity: number): PositionBuilder {
        const builder = new PositionBuilder(
            new Position(
                UuidGenerator.v4(),
                product.uuid,
                null,
                ProductType.NORMAL,
                product.name,
                product.measureName,
                product.measurePrecision,
                null,
                product.price,
                product.price,
                quantity,
                null,
                null,
                null,
                null,
                null,
                [],
                []
            )
        );
        builder.setTaxNumber(product.taxNumber)._setAlcoParams(null, product.alcoholByVolume, product.alcoholProductKindCode, product.tareVolume);
        builder._position.productType = product.type;
        builder._position.productCode = product.code;
        return builder;
    }

    /**
     * Создаёт редактор новой позиции из данных указанной позиции.
     * @function module:receipt.PositionBuilder.copyFrom
     * @param {module:receipt.Position} position - Позиция
     * @returns {module:receipt.PositionBuilder} Редактор текущей позиции
     */
    static copyFrom(position: Position): PositionBuilder {
        return new PositionBuilder(Object.assign(Converter.setPrototypeOf({}, Position.prototype), position));
    }

    constructor(position) {
        this._position = position;
        this._setAlcoParams = (mark, alcoholByVolume, alcoholProductKindCode, tareVolume) => {
            this._position.mark = mark;
            this._position.alcoholByVolume = alcoholByVolume;
            this._position.alcoholProductKindCode = alcoholProductKindCode;
            this._position.tareVolume = tareVolume;
        }
    }

    /**
     * ХЗ ЧТО ДЕЛАЕТ
     * @function module:receipt.PositionBuilder#toAlcoholMarked
     * @param {string} mark - Алкогольная марка
     * @param {number} alcoholByVolume - Процентное содержание алкоголя
     * @param {number} alcoholProductKindCode - Спиртовой код
     * @param {number} tareVolume - Объём тары
     * @returns {module:receipt.PositionBuilder} Редактор текущей позиции
     */
    toAlcoholMarked(mark: string, alcoholByVolume: number, alcoholProductKindCode: number, tareVolume: number): PositionBuilder {
        this._position.productType = ProductType.ALCOHOL_MARKED;
        this._setAlcoParams(mark, alcoholByVolume, alcoholProductKindCode, tareVolume);
        return this;
    }

    /**
     * ХЗ ЧТО ДЕЛАЕТ
     * @function module:receipt.PositionBuilder#toAlcoholNotMarked
     * @param {number} alcoholByVolume - Процентное содержание алкоголя
     * @param {number} alcoholProductKindCode - Спиртовой код
     * @param {number} tareVolume - Объём тары
     * @returns {module:receipt.PositionBuilder} Редактор текущей позиции
     */
    toAlcoholNotMarked(alcoholByVolume: number, alcoholProductKindCode: number, tareVolume: number): PositionBuilder {
        this._position.productType = ProductType.ALCOHOL_NOT_MARKED;
        this._setAlcoParams(null, alcoholByVolume, alcoholProductKindCode, tareVolume);
        return this;
    }

    /**
     * ХЗ ЧТО ДЕЛАЕТ
     * @function module:receipt.PositionBuilder#toNormal
     * @returns {module:receipt.PositionBuilder} Редактор текущей позиции
     */
    toNormal(): PositionBuilder {
        this._position.productType = ProductType.NORMAL;
        this._setAlcoParams(null, null, null, null);
        return this;
    }

    /**
     * ХЗ ЧТО ДЕЛАЕТ
     * @function module:receipt.PositionBuilder#toService
     * @returns {module:receipt.PositionBuilder} Редактор текущей позиции
     */
    toService(): PositionBuilder {
        this._position.productType = ProductType.NORMAL;
        this._setAlcoParams(null, null, null, null);
        return this;
    }

    /**
     * Устанавливает идентификатор (uuid) текущей позиции.
     * @function module:receipt.PositionBuilder#setUuid
     * @param {string} uuid - Идентификатор
     * @returns {module:receipt.PositionBuilder} Редактор текущей позиции
     */
    setUuid(uuid: string): PositionBuilder {
        this._position.uuid = uuid;
        return this;
    }

    /**
     * Устанавливает количество текущей позиции.
     * @function module:receipt.PositionBuilder#setQuantity
     * @param {number} quantity - Количество
     * @returns {module:receipt.PositionBuilder} Редактор текущей позиции
     */
    setQuantity(quantity: number): PositionBuilder {
        this._position.quantity = quantity;
        return this;
    }

    /**
     * Устанавливает цену текущей позиции.
     * @function module:receipt.PositionBuilder#setPrice
     * @param {number} price - Цена
     * @returns {module:receipt.PositionBuilder} Редактор текущей позиции
     */
    setPrice(price: number): PositionBuilder {
        this._position.price = price;
        return this;
    }

    /**
     * Устанавливает цену текущей позиции со скидкой.
     * @function module:receipt.PositionBuilder#setPriceWithDiscountPosition
     * @param {number} priceWithDiscountPosition - Цена со скидкой
     * @returns {module:receipt.PositionBuilder} Редактор текущей позиции
     */
    setPriceWithDiscountPosition(priceWithDiscountPosition: number): PositionBuilder {
        this._position.priceWithDiscountPosition = priceWithDiscountPosition;
        return this;
    }

    /**
     * Устанавливает алкогольную марку текущей позиции.
     * @function module:receipt.PositionBuilder#setMark
     * @param {string} mark - Марка
     * @returns {module:receipt.PositionBuilder} Редактор текущей позиции
     */
    setMark(mark: string): PositionBuilder {
        this._position.mark = mark;
        return this;
    }

    /**
     * Устанавливает дополнительные поля текущей позиции.
     * @function module:receipt.PositionBuilder#setExtraKeys
     * @param extraKeys {module:receipt.ExtraKey[]} - Марка
     * @returns {module:receipt.PositionBuilder} Редактор текущей позиции
     */
    setExtraKeys(extraKeys: ExtraKey[]): PositionBuilder {
        this._position.extraKeys = extraKeys;
        return this;
    }

    /**
     * Устанавливает единицу измерения текущей позиции.
     * @function module:receipt.PositionBuilder#setMeasureName
     * @param {string} measureName - Единица измерения
     * @returns {module:receipt.PositionBuilder} Редактор текущей позиции
     */
    setMeasureName(measureName: string): PositionBuilder {
        this._position.measureName = measureName;
        return this;
    }

    /**
     * Устанавливает точность измерения текущей позиции.
     * @function module:receipt.PositionBuilder#setMeasurePrecision
     * @param {number} measurePrecision - Точность измерения
     * @returns {module:receipt.PositionBuilder} Редактор текущей позиции
     */
    setMeasurePrecision(measurePrecision: number): PositionBuilder {
        this._position.measurePrecision = measurePrecision;
        return this;
    }

    /**
     * Устанавливает налоговый номер текущей позиции.
     * @function module:receipt.PositionBuilder#setTaxNumber
     * @param {TaxNumber} taxNumber - Налоговый номер
     * @returns {module:receipt.PositionBuilder} Редактор текущей позиции
     */
    setTaxNumber(taxNumber: TaxNumber): PositionBuilder {
        this._position.taxNumber = taxNumber;
        return this;
    }

    /**
     * Устанавливает субпозиции текущей позиции.
     * @function module:receipt.PositionBuilder#setSubPositions
     * @param {module:receipt.Position[]} subPositions - Субпозиции
     * @returns {module:receipt.PositionBuilder} Редактор текущей позиции
     */
    setSubPositions(subPositions: Position[]): PositionBuilder {
        this._position.subPositions = subPositions;
        return this;
    }

    /**
     * Устанавливает штрикход текущей позиции.
     * @function module:receipt.PositionBuilder#setBarcode
     * @param {string} barcode - Штрихкод
     * @returns {module:receipt.PositionBuilder} Редактор текущей позиции
     */
    setBarcode(barcode: string): PositionBuilder {
        this._position.barcode = barcode;
        return this;
    }

    /**
     * Завершает редактирование позиции.
     * @function module:receipt.PositionBuilder#build
     * @returns {module:receipt.Position} Созданная позиция
     */
    build(): Position {
        return this._position;
    }

}