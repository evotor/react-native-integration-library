export class OpenReceiptCommandResult {
    constructor(receiptUuid: string) {
        this.receiptUuid = receiptUuid;
    }
}

export class RegisterReceiptCommandResult {
    constructor(receiptUuid: string, receiptNumber: string) {
        this.receiptUuid = receiptUuid;
        this.receiptNumber = receiptNumber;
    }
}