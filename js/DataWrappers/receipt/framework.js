import {Payment} from './payment';
import {PrintGroupType, ProductType, ReceiptType, TaxationSystem, TaxNumber} from "../../Types/compilable";
import AgentRequisites from "./agentRequisites";

/**
 * @class module:receipt.ExtraKey
 * @classdesc Класс, содержащий данные дополнительного поля позиции чека.
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
 * @class module:receipt.Position
 * @classdesc Класс, содержащий данные позиции чека.
 * @param {?string} uuid - Идентификатор (uuid) позиции
 * @param {?string} productUuid - Идентификатор (uuid) товара
 * @param {?string} productCode - Код товара
 * @param {module:inventory#ProductType} productType - Тип товара
 * @param {string} name - Наименование товара
 * @param {string} measureName - Единица измерения товара
 * @param {number} measurePrecision - Точность измерения единиц товара
 * @param {module:inventory#TaxNumber} taxNumber - Налоговая ставка
 * @param {number} price - Цена товара
 * @param {number} priceWithDiscountPosition - Цена позиции с учётом скидки
 * @param {number} quantity - Количество добавленного товара
 * @param {?string} barcode - Штрихкод товара
 * @param {?string} mark - Алкогольная марка товара
 * @param {?number} alcoholByVolume - Крепость алкогольной продукции
 * @param {?number} alcoholProductKindCode - Код вида продукции ФСРАР
 * @param {?number} tareVolume - Объём тары
 * @param {module:receipt.ExtraKey[]} extraKeys - Дополнительные поля
 * @param {module:receipt.Position[]} subPositions - Субпозиции
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
                subPositions: Position[],
                agentRequisites: AgentRequisites | null) {
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
        this.agentRequisites = agentRequisites || null;
    }
}

/**
 * @class module:receipt.ReceiptHeader
 * @classdesc Класс, содержащий данные заголовка чека.
 * @param {string} uuid - Идентификатор (uuid)
 * @param {?string} number - Номер
 * @param {module:receipt#ReceiptType} type - Тип чека
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
 * @class module:receipt.PrintGroup
 * @classdesc Класс, содержащий данные печатной группы чека.
 * @param {?string} identifier - Идентификатор
 * @param {?module:inventory#PrintGroupType} type - Тип печатной группы
 * @param {?string} orgName - Название организации
 * @param {?string} orgInn - ИНН организации
 * @param {?string} orgAddress - Адрес организации
 * @param {?module:inventory#TaxationSystem} taxationSystem - Система налогообложения
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
 * @class module:receipt.PrintReceipt
 * @classdesc Класс, содержащий данные для печати чека.
 * @param {?module:receipt.PrintGroup} printGroup - Печатная группа
 * @param {module:receipt.Position[]} positions - Массив позиций
 * @param {Map<module:receipt.Payment, number>} payments - Ассоциативный массив (платёж, значение платежа)
 * @param {Map<module:receipt.Payment, number>} changes - Ассоциативный массив (платёж, изменения платежа)
 * @param {?Map<module:receipt.Payment, number>} discounts - Ассоциативный массив (платёж, сумма скидки)
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

    /**
     * Получает сумму скидок для текущей группы.
     * @function module:receipt.PrintReceipt#getDiscount
     * @return {number} Значение скидки
     */
    getDiscount(): number {
        let discount = 0;
        if (this.discounts) {
            this.discounts.forEach((value) => discount += value)
        }
        return discount;
    }

}

/**
 * @class module:receipt.Receipt
 * @classdesc Класс, содержащий данные чека.
 * @param {module:receipt.ReceiptHeader} header - Заголовок чека
 * @param {module:receipt.PrintReceipt[]} printDocuments - Массив данных для печати
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
     * @return {module:receipt.Position[]} Массив позиций
     */
    getPositions(): Position[] {
        let positions = [];
        this.printDocuments.forEach(
            item => {
                positions = positions.concat(item.positions);
            }
        );
        return positions;
    }

    /**
     * Получает массив платежей текущего чека.
     * @function module:receipt.Receipt#getPayments
     * @return {module:receipt.Payment[]} Массив платежей
     */
    getPayments(): Payment[] {
        let payments = [];
        this.printDocuments.forEach(item => item.payments.forEach((value, key) => payments.push(key)));
        return payments;
    }

    /**
     * Получает скидку на чек без учета скидок на позиции.
     * @function module:receipt.Receipt#getDiscount
     * @return {number} Значение скидки
     */
    getDiscount(): number {
        let discount = 0;
        this.printDocuments.forEach(
            item => {
                if (item.discounts) {
                    item.discounts.forEach((value) => discount += value)

                }
            }
        );
        return discount;
    }

}