import {AbstractBundlable} from "../navigation";
import type {PositionChange} from "../../Types/types";
import {SetExtra, SetPrintExtra, SetPrintGroup} from "../receipt/changes";
import {PaymentType} from "../../Types/enums";
import {PaymentPurpose} from "../receipt/payment";

export class BeforePositionsEditedEventResult extends AbstractBundlable {
    constructor(changes?: PositionChange[] | null, extra?: SetExtra) {
        super('BeforePositionsEditedEventResult');
        this.changes = changes ? changes : null;
        this.extra = extra ? extra : null;
    }
}

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

export class PaymentSystemEvent {
    constructor(receiptUuid: string, accountId: string | null, sum: number, rrn: string | null, description: string | null) {
        this.receiptUuid = receiptUuid;
        this.accountId = accountId;
        this.sum = sum;
        this.rrn = rrn;
        this.description = description;
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