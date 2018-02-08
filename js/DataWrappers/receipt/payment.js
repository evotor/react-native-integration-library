import {PaymentType} from "../../Types/enums";

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