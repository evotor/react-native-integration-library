import {FieldType} from "../Types/enums";

export class ProductItem {
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