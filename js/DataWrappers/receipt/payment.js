import {PaymentType} from "../../Types/compilable";

/**
 * @class module:receipt.PaymentPurpose
 * @classdesc Класс, содержащий часть платежа чека.
 * @param {?string} identifier - Идентификатор части платежа
 * @param {?string} paymentSystemId - Идентификатор [платёжной системы]{@link module:receipt.PaymentSystem}
 * @param {number} total - Сумма части платежа
 * @param {?string} accountId - Идентификатор счёта в платёжной системе
 * @param {?string} userMessage - Текст для отображения пользователю при завершении платежа
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

/**
 * @class module:receipt.PaymentSystem
 * @classdesc Класс, содержащий данные платёжной системы.
 * @param {module:types#PaymentType} paymentType - Тип платёжной системы
 * @param {string} userDescription - Название для отображения пользователю
 * @param {string} paymentSystemId - Идентификатор платёжной системы
 */
export class PaymentSystem {
    constructor(paymentType: PaymentType, userDescription: string, paymentSystemId: string) {
        this.paymentType = paymentType;
        this.userDescription = userDescription;
        this.paymentSystemId = paymentSystemId;
    }
}

/**
 * @class module:receipt.Payment
 * @classdesc Класс, содержащий данные платежа.
 * @param {string} uuid - Идентификатор (uuid) платежа
 * @param {?module:receipt.PaymentSystem} system - Использованная платёжная система
 * @param {?string} purposeIdentifier - Идентификатор [части платежа]{@link module:receipt.PaymentPurpose}
 * @param {?string} accountId - Идентификатор аккаунта
 * @param {?string} accountUserDescription - Описание аккаунта
 */
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