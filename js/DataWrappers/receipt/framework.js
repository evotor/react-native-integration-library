import {Payment} from './payment';
import {PrintGroupType, ProductType, ReceiptType, TaxationSystem, TaxNumber} from "../../Types/compilable";

/**
 * @class ExtraKey
 * @classdesc Класс, содержащий данные дополнительного поля позиции чека.
 * @memberOf module:receipt
 * @param {?string} identity - Идентификатор поля
 * @param {?string} appId - Идентификатор приложения
 * @param {?string} description - Описание
 */
export class ExtraKey {
    constructor(identity: string | null, appId: string | null, description: string | null) {
        this.identity = identity;
        this.appId = appId;
        this.description = description;
    }
}

/**
 * @class Position
 * @classdesc Класс, содержащий данные позиции чека.
 * @memberOf module:receipt
 * @param {?string} uuid - Идентификатор (uuid) позиции
 * @param {?string} productUuid - Идентификатор (uuid) товара
 * @param {?string} productCode - Код товара
 * @param {ProductType} productType - Тип товара
 * @param {string} name - Наименование товара
 * @param {string} measureName - Единица измерения товара
 * @param {number} measurePrecision - Точность измерения единиц товара
 * @param {TaxNumber} taxNumber - Налоговая ставка
 * @param {number} price - Цена товара
 * @param {number} priceWithDiscountPosition - Цена позиции с учётом скидки
 * @param {number} quantity - Количество добавленного товара
 * @param {?string} barcode - Штрихкод товара
 * @param {?string} mark - Алкогольная марка товара
 * @param {?number} alcoholByVolume - Крепость алкогольной продукции
 * @param {?number} alcoholProductKindCode - Код вида продукции ФСРАР
 * @param {?number} tareVolume - Объём тары
 * @param {ExtraKey[]} extraKeys - Дополнительные поля
 * @param {Position[]} subPositions - Субпозиции
 */
export class Position {
    constructor(uuid: string | null,
                productUuid: string | null,
                productCode: string | null,
                productType: ProductType,
                name: string,
                measureName: string,
                measurePrecision: number,
                taxNumber: TaxNumber | null,
                price: number,
                priceWithDiscountPosition: number,
                quantity: number,
                barcode: string | null,
                mark: string | null,
                alcoholByVolume: number | null,
                alcoholProductKindCode: number | null,
                tareVolume: number | null,
                extraKeys: ExtraKey[],
                subPositions: Position[]) {
        this.uuid = uuid;
        this.productUuid = productUuid;
        this.productCode = productCode;
        this.productType = productType;
        this.name = name;
        this.measureName = measureName;
        this.measurePrecision = measurePrecision;
        this.taxNumber = taxNumber;
        this.price = price;
        this.priceWithDiscountPosition = priceWithDiscountPosition;
        this.quantity = quantity;
        this.barcode = barcode;
        this.mark = mark;
        this.alcoholByVolume = alcoholByVolume;
        this.alcoholProductKindCode = alcoholProductKindCode;
        this.tareVolume = tareVolume;
        this.extraKeys = extraKeys;
        this.subPositions = subPositions;
    }
}

/**
 * @class ReceiptHeader
 * @classdesc Класс, содержащий данные заголовка чека.
 * @memberOf module:receipt
 * @param {string} uuid - Идентификатор (uuid)
 * @param {?string} number - Номер
 * @param {ReceiptType} type - Тип чека
 * @param {?string} date - Дата составления
 * @param {?string} clientEmail - Email получателя
 * @param {?string} clientPhone - Телефон получателя
 * @param {?string} extra - Дополнительные данные
 */
export class ReceiptHeader {
    constructor(uuid: string,
                number: string | null,
                type: ReceiptType,
                date: string | null,
                clientEmail: string | null,
                clientPhone: string | null,
                extra: string | null) {
        this.uuid = uuid;
        this.number = number;
        this.type = type;
        this.date = date;
        this.clientEmail = clientEmail;
        this.clientPhone = clientPhone;
        this.extra = extra;
    }
}

/**
 * @class PrintGroup
 * @classdesc Класс, содержащий данные печатной группы чека.
 * @memberOf module:receipt
 * @param {?string} identifier - Идентификатор
 * @param {?PrintGroupType} type - Тип печатной группы
 * @param {?string} orgName - Название организации
 * @param {?string} orgInn - ИНН организации
 * @param {?string} orgAddress - Адрес организации
 * @param {?TaxationSystem} taxationSystem - Система налогообложения
 * @param {?boolean} shouldPrintReceipt - Нужно ли печатать текущую печатную группу на чеке
 */
export class PrintGroup {
    constructor(identifier: string | null,
                type: PrintGroupType | null,
                orgName: string | null,
                orgInn: string | null,
                orgAddress: string | null,
                taxationSystem: TaxationSystem | null,
                shouldPrintReceipt: boolean) {
        this.identifier = identifier;
        this.type = type;
        this.orgName = orgName;
        this.orgInn = orgInn;
        this.orgAddress = orgAddress;
        this.taxationSystem = taxationSystem;
        this.shouldPrintReceipt = shouldPrintReceipt;
    }
}

/**
 * @class PrintReceipt
 * @classdesc Класс, содержащий данные для печати чека.
 * @memberOf module:receipt
 * @param {?PrintGroup} printGroup - Печатная группа
 * @param {Position[]} positions - Массив позиций
 * @param {Map<Payment, number>} payments - Ассоциативный массив (платёж, значение платежа)
 * @param {Map<Payment, number>} changes - Ассоциативный массив (платёж, изменения платежа)
 * @param {?Map<Payment, number>} discounts - Ассоциативный массив (ПАРАМЕТР, сумма скидки)
 */
export class PrintReceipt {
    constructor(printGroup: PrintGroup | null,
                positions: Position[],
                payments: Map<Payment, number>,
                changes: Map<Payment, number>,
                discounts?: Map<string, number>) {
        this.printGroup = printGroup;
        this.positions = positions;
        this.payments = payments;
        this.changes = changes;
        this.discounts = discounts ? discounts : null;
    }
}

/**
 * @class Receipt
 * @classdesc Класс, содержащий данные чека.
 * @memberOf module:receipt
 * @param {ReceiptHeader} header - Заголовок чека
 * @param {PrintReceipt[]} printDocuments - Массив данных для печати
 */
export class Receipt {

    constructor(header: ReceiptHeader,
                printDocuments: PrintReceipt[]) {
        this.header = header;
        this.printDocuments = printDocuments;
    }

    /**
     * Получает массив позиций текущего чека.
     * @function module:receipt.Receipt#getPositions
     * @return {Position[]} Массив позиций
     */
    getPositions(): Position[] {
        let positions = [];
        this.printDocuments.forEach(
            (item) => {
                positions = positions.concat(item.positions);
            }
        );
        return positions;
    }

    /**
     * Получает массив платежей текущего чека.
     * @function module:receipt.Receipt#getPayments
     * @return {Payment[]} Массив платежей
     */
    getPayments(): Payment[] {
        let payments = [];
        this.printDocuments.forEach(
            (item) => {
                item.payments.forEach(
                    (value, key) => {
                        payments.push(key);
                    }
                );
            }
        );
        return payments;
    }

}