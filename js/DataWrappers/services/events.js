import {Position} from "../receipt/framework";


export class BroadcastEvent {
    constructor(action: string) {
        this.action = action;
    }
}

export class ProductEvent extends BroadcastEvent {
    constructor(action: string, productUuid: string) {
        super(action);
        this.productUuid = productUuid;
    }
}

export class ReceiptEvent extends BroadcastEvent {
    constructor(action: string, receiptUuid: string) {
        super(action);
        this.receiptUuid = receiptUuid;
    }
}

export class PositionEvent extends BroadcastEvent {
    constructor(action: string, receiptUuid: string, position: Position) {
        super(action);
        this.receiptUuid = receiptUuid;
        this.position = position;
    }
}

export class CashDrawerEvent extends BroadcastEvent {
    constructor(action: string, cashDrawerId: number) {
        super(action);
        this.cashDrawerId = cashDrawerId;
    }
}

export class CashOperationEvent extends BroadcastEvent {
    constructor(action: string, total: number, documentUuid: string) {
        super(action);
        this.total = total;
        this.documentUuid = documentUuid;
    }
}