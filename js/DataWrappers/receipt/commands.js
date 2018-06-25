/**
 * @class module:receipt.OpenReceiptCommandResult
 * @classdesc Класс, содержащий данные результата команды открытия чека.
 * @param {string} receiptUuid - Идентификатор (uuid) чека
 */
export class OpenReceiptCommandResult {
    constructor(receiptUuid: string) {
        this.receiptUuid = receiptUuid;
    }
}
/**
 * @class module:receipt.RegisterReceiptCommandResult
 * @classdesc Класс, содержащий данные результата команды регистрации чека.
 * @param {string} receiptUuid - Идентификатор (uuid) чека
 * @param {string} receiptNumber - Номер чека
 */
export class RegisterReceiptCommandResult {
    constructor(receiptUuid: string, receiptNumber: string) {
        this.receiptUuid = receiptUuid;
        this.receiptNumber = receiptNumber;
    }
}