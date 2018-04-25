import {Position, PrintGroup} from './framework';
import {AbstractBundlable} from "../navigation";
import type {Printable, PrintExtraPlace} from "../../Types/inbuilt";

export class PositionAdd extends AbstractBundlable {
    constructor(position: Position) {
        super('PositionAdd');
        this.type = 'POSITION_ADD';
        this.position = position;
    }
}

export class PositionEdit extends AbstractBundlable {
    constructor(position: Position) {
        super('PositionEdit');
        this.type = 'POSITION_EDIT';
        this.position = position;
    }
}

export class PositionRemove extends AbstractBundlable {
    constructor(positionUuid: string) {
        super('PositionRemove');
        this.type = 'POSITION_REMOVE';
        this.positionUuid = positionUuid;
    }
}

export class SetExtra extends AbstractBundlable {
    constructor(extra: Object) {
        super('SetExtra');
        this.extra = extra;
    }
}

export class SetPrintGroup extends AbstractBundlable {
    constructor(printGroup: PrintGroup | null,
                paymentPurposeIds: string[],
                positionUuids: string[]) {
        super('SetPrintGroup');
        this.printGroup = printGroup;
        this.paymentPurposeIds = paymentPurposeIds;
        this.positionUuids = positionUuids;
    }
}

export class SetPrintExtra extends AbstractBundlable {
    constructor(printExtraPlace: PrintExtraPlace,
                printables: Printable[]) {
        super('SetPrintExtra');
        this.printExtraPlace = printExtraPlace;
        this.printables = printables;
    };
}

export class PrintExtraPlacePrintGroupTop {
    constructor(printGroupId?: string) {
        this.printExtraPlaceType = "PrintExtraPlacePrintGroupTop";
        this.printGroupId = printGroupId ? printGroupId : null;
    }
}

export class PrintExtraPlacePrintGroupHeader {
    constructor(printGroupId?: string) {
        this.printExtraPlaceType = "PrintExtraPlacePrintGroupHeader";
        this.printGroupId = printGroupId ? printGroupId : null;
    }
}

export class PrintExtraPlacePrintGroupSummary {
    constructor(printGroupId?: string) {
        this.printExtraPlaceType = "PrintExtraPlacePrintGroupSummary";
        this.printGroupId = printGroupId ? printGroupId : null;
    }
}

export class PrintExtraPlacePositionFooter {
    constructor(positionUuid?: string) {
        this.printExtraPlaceType = "PrintExtraPlacePositionFooter";
        this.positionUuid = positionUuid ? positionUuid : null;
    }
}

export class PrintExtraPlacePositionAllSubpositionsFooter {
    constructor(positionUuid?: string) {
        this.printExtraPlaceType = "PrintExtraPlacePositionAllSubpositionsFooter";
        this.positionUuid = positionUuid ? positionUuid : null;
    }
}