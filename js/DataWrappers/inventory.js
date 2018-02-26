import {FieldType, ProductType, TaxNumber} from "../Types/enums";

class AbstractProductItem {
    constructor(uuid: string,
                parentUuid: string | null,
                code: string | null,
                name: string) {
        this.uuid = uuid;
        this.parentUuid = parentUuid;
        this.code = code;
        this.name = name;
    }
}

export class Product extends AbstractProductItem {
    constructor(uuid: string,
                parentUuid: string | null,
                code: string | null,
                name: string,
                taxNumber: TaxNumber,
                type: ProductType,
                price: number,
                quantity: number,
                description: string | null,
                measureName: string,
                measurePrecision: number,
                alcoholByVolume: number | null,
                alcoholProductKindCode: number | null,
                tareVolume: number | null) {
        super(uuid, parentUuid, code, name);
        this.taxNumber = taxNumber;
        this.type = type;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.measureName = measureName;
        this.measurePrecision = measurePrecision;
        this.alcoholByVolume = alcoholByVolume;
        this.alcoholProductKindCode = alcoholProductKindCode;
        this.tareVolume = tareVolume;
    }
}

export class ProductGroup extends AbstractProductItem {
    constructor(uuid: string,
                parentUuid: string | null,
                code: string | null,
                name: string,
                taxNumber: TaxNumber) {
        super(uuid, parentUuid, code, name);
        this.taxNumber = taxNumber
    }
}

export class Field {
    constructor(name: string | null,
                fieldUUID: string,
                title: string | null,
                type: FieldType) {
        this.name = name;
        this.fieldUUID = fieldUUID;
        this.title = title;
        this.type = type
    }
}

export class ProductExtra {
    constructor(uuid: string,
                name: string | null,
                commodityUUID: string,
                fieldUUID: string,
                fieldValue: string | null,
                data: string | null) {
        this.uuid = uuid;
        this.name = name;
        this.commodityUUID = commodityUUID;
        this.fieldUUID = fieldUUID;
        this.fieldValue = fieldValue;
        this.data = data;
    }
}