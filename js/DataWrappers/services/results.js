import {AbstractBundlable} from "../navigation";
import type {PositionChange} from "../../Types/inbuilt";
import {SetExtra, SetPrintExtra, SetPrintGroup} from "../receipt/changes";
import {PaymentType} from "../../Types/compilable";
import {PaymentPurpose} from "../receipt/payment";

/**
 * @class module:services.BeforePositionsEditedEventResult
 * @classdesc Класс, содержащий результат события интеграционной службы изменения позиций чека.
 * @param {?module:receipt#PositionChange[]} changes - Массив изменений позиций
 * @param {?module:receipt.SetExtra} extra - Дополнительные поля чека
 */
export class BeforePositionsEditedEventResult extends AbstractBundlable {
    constructor(changes?: PositionChange[] | null, extra?: SetExtra) {
        super('BeforePositionsEditedEventResult');
        this.changes = changes ? changes : null;
        this.extra = extra ? extra : null;
    }
}

/**
 * @class module:services.ReceiptDiscountEventResult
 * @classdesc Класс, содержащий результат события интеграционной службы начисления скидки на чек.
 * @param {number} discount - Сумма скидки
 * @param {?module:receipt.SetExtra} extra - Дополнительные поля чека
 * @param {module:receipt#PositionChange[]} changes - Массив изменений позиций
 */
export class ReceiptDiscountEventResult extends AbstractBundlable {
    constructor(discount: number, extra: SetExtra | null, changes: PositionChange[]) {
        super('ReceiptDiscountEventResult');
        this.discount = discount;
        this.extra = extra;
        this.changes = changes;
    }
}

/**
 * @class module:services.PaymentSelectedEventResult
 * @classdesc Класс, содержащий результат события интеграционной службы разделения оплаты чека.
 * @param {?module:receipt.SetExtra} extra - Дополнительные поля чека
 * @param {module:receipt.PaymentPurpose[]} changes - Массив частей платежа
 */
export class PaymentSelectedEventResult extends AbstractBundlable {
    constructor(extra: SetExtra | null, paymentParts: PaymentPurpose[]) {
        super('PaymentSelectedEventResult');
        this.extra = extra;
        this.paymentParts = paymentParts;
    }
}

/**
 * @class module:services.PrintGroupRequiredEventResult
 * @classdesc Класс, содержащий результат события интеграционной службы разделения чека на печатные группы.
 * @param {?module:receipt.SetExtra} extra - Дополнительные поля чека
 * @param {module:receipt.SetPrintGroup[]} setPrintGroups - Массив печатных групп для разделения чека
 */
export class PrintGroupRequiredEventResult extends AbstractBundlable {
    constructor(extra: SetExtra | null, setPrintGroups: SetPrintGroup[]) {
        super('PrintGroupRequiredEventResult');
        this.extra = extra;
        this.setPrintGroups = setPrintGroups;
    }
}

/**
 * @class module:services.PrintExtraRequiredEventResult
 * @classdesc Класс, содержащий результат события интеграционной службы печати дополнительных элементов чека.
 * @param {module:receipt.SetPrintExtra[]} extra - Массив дополнительных печатных элементов чека
 */
export class PrintExtraRequiredEventResult extends AbstractBundlable {
    constructor(extra: SetPrintExtra[]) {
        super('PrintExtraRequiredEventResult');
        this.extra = extra;
    }
}

/**
 * @class module:services.PaymentSystemPaymentOkResult
 * @classdesc Класс, содержащий успешный результат события интеграционной службы использования сторонней платёжной системы.
 * @param {string} rrn - Идентификатор платежа
 * @param {string[]} slip - Текст, который будет напечатан на чеке в двух экземплярах
 * @param {?string} paymentInfo - Поле для хранения статистической информации. Приложение не заполняет это поле.
 * @param {module:receipt#PaymentType} [paymentType = PaymentType.ELECTRON] - Тип платежа
 */
export class PaymentSystemPaymentOkResult extends AbstractBundlable {
    constructor(rrn: string, slip: string[], paymentInfo: string | null, paymentType: PaymentType = PaymentType.ELECTRON) {
        super('PaymentSystemPaymentOkResult');
        this.rrn = rrn;
        this.slip = slip;
        this.paymentInfo = paymentInfo;
        this.paymentType = paymentType;
    }
}

/**
 * @class module:services.PaymentSystemPaymentErrorResult
 * @classdesc Класс, содержащий ошибку обработки события интеграционной службы использования сторонней платёжной системы.
 * @param {?string} [errorDescription] - Описание ошибки
 */
export class PaymentSystemPaymentErrorResult extends AbstractBundlable {
    constructor(errorDescription?: string) {
        super('PaymentSystemPaymentErrorResult');
        this.errorDescription = errorDescription ? errorDescription : null;
    }
}

/**
 * @class module:services.PaymentDelegatorSelectedEventResult
 * @classdesc Класс, содержащий успешный результат события интеграционной службы делегирования сторонними платёжными системами.
 * @param {PaymentPurpose} paymentPurpose - Цель платежа
 * @param {?SetExtra} extra - Дополнительные поля чека
 */
export class PaymentDelegatorSelectedEventResult extends AbstractBundlable {
    constructor(paymentPurpose: PaymentPurpose, extra?: SetExtra) {
        super('PaymentDelegatorSelectedEventResult');
        this.paymentPurpose = paymentPurpose;
        this.extra = extra ? extra : null;
    }
}

/**
 * @class module:services.PaymentDelegatorCanceledEventResult
 * @classdesc Класс, содержащий данные для отмены плажтежа, произведённого с помощью интеграционной службы делегирования сторонними платёжными системами.
 * @param {string} paymentUuid - Идентификатор (uuid) платежа
 * @param {?SetExtra} extra - Дополнительные поля чека
 */
export class PaymentDelegatorCanceledEventResult extends AbstractBundlable {
    constructor(paymentUuid: string, extra?: SetExtra) {
        super('PaymentDelegatorCanceledEventResult');
        this.paymentUuid = paymentUuid;
        this.extra = extra ? extra : null;
    }
}

/**
 * @class module:services.PaymentDelegatorCanceledAllEventResult
 * @classdesc Класс, содержащий данные для отмены всех платежей, произведённых с помощью интеграционной службы делегирования сторонними платёжными системами.
 * @param {?SetExtra} extra - Дополнительные поля чека
 */
export class PaymentDelegatorCanceledAllEventResult extends AbstractBundlable {
    constructor(extra?: SetExtra) {
        super('PaymentDelegatorCanceledAllEventResult');
        this.extra = extra ? extra : null;
    }
}