import {Payment} from './payment';
import {PrintGroupType, ProductType, ReceiptType, TaxationSystem, TaxNumber} from "../../Types/enums";

export class ExtraKey {
    constructor(identity: string | null, appId: string | null, description: string | null) {
        this.identity = identity;
        this.appId = appId;
        this.description = description;
    }
}

export class Position {
    constructor(uuid: string | null,
                productUuid: string | null,
                productCode: string | null,
                productType: ProductType,
                name: string,
                measureName: string,
                measurePrecision: number,
                taxNumber: TaxNumber | null,
                price: number,
                priceWithDiscountPosition: number,
                quantity: number,
                barcode: string | null,
                mark: string | null,
                alcoholByVolume: number | null,
                alcoholProductKindCode: number | null,
                tareVolume: number | null,
                extraKeys: ExtraKey[],
                subPositions: Position[]) {
        this.uuid = uuid;
        this.productUuid = productUuid;
        this.productCode = productCode;
        this.productType = productType;
        this.name = name;
        this.measureName = measureName;
        this.measurePrecision = measurePrecision;
        this.taxNumber = taxNumber;
        this.price = price;
        this.priceWithDiscountPosition = priceWithDiscountPosition;
        this.quantity = quantity;
        this.barcode = barcode;
        this.mark = mark;
        this.alcoholByVolume = alcoholByVolume;
        this.alcoholProductKindCode = alcoholProductKindCode;
        this.tareVolume = tareVolume;
        this.extraKeys = extraKeys;
        this.subPositions = subPositions;
    }
}

export class ReceiptHeader {
    constructor(uuid: string,
                number: string | null,
                type: ReceiptType,
                date: string | null,
                clientEmail: string | null,
                clientPhone: string | null,
                extra: string | null) {
        this.uuid = uuid;
        this.number = number;
        this.type = type;
        this.date = date;
        this.clientEmail = clientEmail;
        this.clientPhone = clientPhone;
        this.extra = extra;
    }
}

export class PrintGroup {
    constructor(identifier: string | null,
                type: PrintGroupType | null,
                orgName: string | null,
                orgInn: string | null,
                orgAddress: string | null,
                taxationSystem: TaxationSystem | null,
                shouldPrintReceipt: boolean) {
        this.identifier = identifier;
        this.type = type;
        this.orgName = orgName;
        this.orgInn = orgInn;
        this.orgAddress = orgAddress;
        this.taxationSystem = taxationSystem;
        this.shouldPrintReceipt = shouldPrintReceipt;
    }
}

export class PrintReceipt {
    constructor(printGroup: PrintGroup | null,
                positions: Position[],
                payments: Map<Payment, number>,
                changes: Map<Payment, number>,
                discounts?: Map<string, number>) {
        this.printGroup = printGroup;
        this.positions = positions;
        this.payments = payments;
        this.changes = changes;
        this.discounts = discounts ? discounts : null;
    }
}

export class Receipt {

    constructor(header: ReceiptHeader,
                printDocuments: PrintReceipt[]) {
        this.header = header;
        this.printDocuments = printDocuments;
    }

    getPositions(): Position[] {
        let positions = [];
        this.printDocuments.forEach(
            (item) => {
                positions = positions.concat(item.positions);
            }
        );
        return positions;
    }

    getPayments(): Payment[] {
        let payments = [];
        this.printDocuments.forEach(
            (item) => {
                item.payments.forEach(
                    (value, key) => {
                        payments.push(key);
                    }
                );
            }
        );
        return payments;
    }

}