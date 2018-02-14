export class OpenReceiptCommandResult {
    constructor(receiptUuid: string) {
        this.receiptUuid = receiptUuid;
    }
}

export class SendElectronReceiptCommandResult {
    constructor(receiptUuid: string, receiptNumber: string) {
        this.receiptUuid = receiptUuid;
        this.receiptNumber = receiptNumber;
    }
}