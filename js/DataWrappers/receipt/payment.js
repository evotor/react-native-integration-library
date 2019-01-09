import {PaymentType} from "../../Types/compilable";

/**
 * @class module:receipt.PaymentPurpose
 * @classdesc Класс, содержащий цель платежа (намерение оплаты) чека.
 * @param {?string} identifier - Идентификатор цели платежа
 * @param {?string} paymentSystemId - DEPRECATED. Идентификатор [платёжной системы]{@link module:receipt.PaymentSystem}
 * @param {module:receipt.PaymentPerformer} paymentPerformer - Приложение, в котором была произведена оплата
 * @param {number} total - Сумма цели платежа
 * @param {?string} accountId - Идентификатор счёта в платёжной системе
 * @param {?string} userMessage - Текст для отображения пользователю при завершении платежа
 */
export class PaymentPurpose {
    constructor(identifier: string | null,
                paymentSystemId: string | null,
                paymentPerformer: PaymentPerformer,
                total: number,
                accountId: string | null,
                userMessage: string | null) {
        this.identifier = identifier;
        this.paymentSystemId = paymentSystemId;
        this.paymentPerformer = paymentPerformer;
        this.total = total;
        this.accountId = accountId;
        this.userMessage = userMessage;
    }
}

/**
 * @class module:receipt.PaymentSystem
 * @classdesc Класс, содержащий данные платёжной системы.
 * @param {module:receipt#PaymentType} paymentType - Тип платёжной системы
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
 * @param {number} value - Сумма платежа
 * @param {?module:receipt.PaymentSystem} system - DEPRECATED. Использованная платёжная система
 * @param {module:receipt.PaymentPerformer} paymentPerformer - Приложение, в котором была произведена оплата
 * @param {?string} purposeIdentifier - Идентификатор [цели платежа]{@link module:receipt.PaymentPurpose}
 * @param {?string} accountId - Идентификатор аккаунта
 * @param {?string} accountUserDescription - Описание аккаунта
 */
export class Payment {
    constructor(uuid: string,
                value: number,
                system: PaymentSystem | null,
                paymentPerformer: PaymentPerformer,
                purposeIdentifier: string | null,
                accountId: string | null,
                accountUserDescription: string | null) {
        this.uuid = uuid;
        this.value = value;
        this.system = system;
        this.paymentPerformer = paymentPerformer;
        this.purposeIdentifier = purposeIdentifier;
        this.accountId = accountId;
        this.accountUserDescription = accountUserDescription;
    }
}

/**
 * @class module:receipt.PaymentPerformer
 * @classdesc Класс, содержащий данные приложения, в котором была произведена оплата.
 * @param {?PaymentSystem} paymentSystem - Использованная платёжная система
 * @param {?string} packageName - Название пакета приложения
 * @param {?string} componentName - Название компонента приложения
 * @param {?string} appUuid - Идентификатор приложения
 * @param {?string} appName - Название приложения
 */
export class PaymentPerformer {
    constructor(paymentSystem: PaymentSystem | null,
                packageName: string | null,
                componentName: string | null,
                appUuid: string | null,
                appName: string | null) {
        this.paymentSystem = paymentSystem;
        this.packageName = packageName;
        this.componentName = componentName;
        this.appUuid = appUuid;
        this.appName = appName;
    }
}