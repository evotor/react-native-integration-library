import {AbstractBundlable} from "../navigation";
import type {PositionChange} from "../../Types/inbuilt";
import {SetExtra, SetPrintExtra, SetPrintGroup} from "../receipt/changes";
import {PaymentType} from "../../Types/compilable";
import {PaymentPurpose} from "../receipt/payment";

/**
 * @class BeforePositionsEditedEventResult
 * @classdesc Класс, содержащий результат события интеграционной службы при намерении изменить позиции чека.
 * @memberOf module:services
 * @param {?PositionChange[]} changes - Массив изменений позиций
 * @param {?SetExtra} extra - Дополнительные поля чека
 */
export class BeforePositionsEditedEventResult extends AbstractBundlable {
    constructor(changes?: PositionChange[] | null, extra?: SetExtra) {
        super('BeforePositionsEditedEventResult');
        this.changes = changes ? changes : null;
        this.extra = extra ? extra : null;
    }
}

/**
 * @class BeforePositionsEditedEventResult
 * @classdesc Класс, содержащий результат события интеграционной службы при намерении редактирования позиций чека.
 * @memberOf module:services
 * @param {?SetExtra} discount - Сумма скидки
 * @param {?SetExtra} extra - Дополнительные поля чека
 * @param {PositionChange[]} changes - Массив изменений позиций
 */
export class ReceiptDiscountEventResult extends AbstractBundlable {
    constructor(discount: number, extra: SetExtra | null, changes: PositionChange[]) {
        super('ReceiptDiscountEventResult');
        this.discount = discount;
        this.extra = extra;
        this.changes = changes;
    }
}

export class PaymentSelectedEventResult extends AbstractBundlable {
    constructor(extra: SetExtra | null, paymentParts: PaymentPurpose[]) {
        super('PaymentSelectedEventResult');
        this.extra = extra;
        this.paymentParts = paymentParts;
    }
}

export class PrintGroupRequiredEventResult extends AbstractBundlable {
    constructor(extra: SetExtra | null, setPrintGroups: SetPrintGroup[]) {
        super('PrintGroupRequiredEventResult');
        this.extra = extra;
        this.setPrintGroups = setPrintGroups;
    }
}

export class PrintExtraRequiredEventResult extends AbstractBundlable {
    constructor(extra: SetPrintExtra[]) {
        super('PrintExtraRequiredEventResult');
        this.extra = extra;
    }
}

export class PaymentSystemPaymentOkResult extends AbstractBundlable {
    constructor(rrn: string, slip: string[], paymentInfo: string | null, paymentType: PaymentType = PaymentType.ELECTRON) {
        super('PaymentSystemPaymentOkResult');
        this.rrn = rrn;
        this.slip = slip;
        this.paymentInfo = paymentInfo;
        this.paymentType = paymentType;
    }
}

export class PaymentSystemPaymentErrorResult extends AbstractBundlable {
    constructor(errorDescription: ?string) {
        super('PaymentSystemPaymentErrorResult');
        this.errorDescription = errorDescription ? errorDescription : null;
    }
}