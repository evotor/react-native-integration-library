import {PaymentType} from "../../Types/compilable";

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
export class PaymentPurpose {
    constructor(identifier: string | null,
                paymentSystemId: string | null,
                total: number,
                accountId: string | null,
                userMessage: string | null) {
        this.identifier = identifier;
        this.paymentSystemId = paymentSystemId;
        this.total = total;
        this.accountId = accountId;
        this.userMessage = userMessage;
    }
}

export class PaymentSystem {
    constructor(paymentType: PaymentType, userDescription: string, paymentSystemId: string) {
        this.paymentType = paymentType;
        this.userDescription = userDescription;
        this.paymentSystemId = paymentSystemId;
    }
}

export class Payment {
    constructor(uuid: string,
                value: number,
                system: PaymentSystem | null,
                purposeIdentifier: string | null,
                accountId: string | null,
                accountUserDescription: string | null) {
        this.uuid = uuid;
        this.value = value;
        this.system = system;
        this.purposeIdentifier = purposeIdentifier;
        this.accountId = accountId;
        this.accountUserDescription = accountUserDescription;
    }
}