import {Position} from "../receipt/framework";

export class AbstractBroadcastEvent {
    constructor(action) {
        this.action = action;
    }
}

/**
 * @class ProductEvent
 * @classdesc Класс, содержащий данные широковещательного сообщения о товароучётном событии.
 * @memberOf module:services
 * @param {string} action - Действие
 * @param {string} productUuid - Идентификатор (uuid) товара
 */
export class ProductEvent extends AbstractBroadcastEvent {
    constructor(action: string, productUuid: string) {
        super(action);
        this.productUuid = productUuid;
    }
}

/**
 * @class ReceiptEvent
 * @classdesc Класс, содержащий данные широковещательного сообщения о событии при формировании чека.
 * @memberOf module:services
 * @param {string} action - Действие
 * @param {string} receiptUuid - Идентификатор (uuid) изменённого чека
 */
export class ReceiptEvent extends AbstractBroadcastEvent {
    constructor(action: string, receiptUuid: string) {
        super(action);
        this.receiptUuid = receiptUuid;
    }
}

/**
 * @class PositionEvent
 * @classdesc Класс, содержащий данные широковещательного сообщения о событии изменения позиции чека.
 * @memberOf module:services
 * @param {string} action - Действие
 * @param {string} receiptUuid - Идентификатор (uuid) чека, содержащего позицию
 * @param {Position} position - Изменённая позиция
 */
export class PositionEvent extends AbstractBroadcastEvent {
    constructor(action: string, receiptUuid: string, position: Position) {
        super(action);
        this.receiptUuid = receiptUuid;
        this.position = position;
    }
}

/**
 * @class CashDrawerEvent
 * @classdesc Класс, содержащий данные широковещательного сообщения о событии денежного ящика, подключённого к смарт-терминалу.
 * @memberOf module:services
 * @param {string} action - Действие
 * @param {number} cashDrawerId - Идентификатор денежного ящика
 */
export class CashDrawerEvent extends AbstractBroadcastEvent {
    constructor(action: string, cashDrawerId: number) {
        super(action);
        this.cashDrawerId = cashDrawerId;
    }
}

/**
 * @class CashOperationEvent
 * @classdesc Класс, содержащий данные широковещательного сообщения о событии денежной операции.
 * @memberOf module:services
 * @param {string} action - Действие
 * @param {number} total - Сумма операции
 * @param {string} documentUuid - Идентификатор (uuid) документа операции
 */
export class CashOperationEvent extends AbstractBroadcastEvent {
    constructor(action: string, total: number, documentUuid: string) {
        super(action);
        this.total = total;
        this.documentUuid = documentUuid;
    }
}

/**
 * @class PaymentSystemEvent
 * @classdesc Класс, содержащий данные события интеграционной службы при использовании собственной платёжной системы.
 * @memberOf module:services
 * @param {string} receiptUuid - Идентификатор (uuid) чека
 * @param {?string} accountId - Счёт (учётная запись) в платёжной системе
 * @param {number} sum - Сумма платежа
 * @param {?string} rrn - Идентификатор платежа
 * @param {?string} description - Описание платежа
 */
export class PaymentSystemEvent {
    constructor(receiptUuid: string, accountId: string | null, sum: number, rrn: string | null, description: string | null) {
        this.receiptUuid = receiptUuid;
        this.accountId = accountId;
        this.sum = sum;
        this.rrn = rrn;
        this.description = description;
    }
}