import {Position, PrintGroup} from './framework';
import {AbstractBundlable} from "../navigation";
import type {Printable, PrintExtraPlace} from "../../Types/inbuilt";

/**
 * @class module:receipt.PositionAdd
 * @classdesc Класс, содержащий позицию, которая будет добавлена в чек.
 * @param {module:receipt.Position} position - Позиция
 */
export class PositionAdd extends AbstractBundlable {
    constructor(position: Position) {
        super('PositionAdd');
        this.type = 'POSITION_ADD';
        this.position = position;
    }
}

/**
 * @class module:receipt.PositionEdit
 * @classdesc Класс, содержащий позицию чека, которая будет изменена.
 * @param {module:receipt.Position} position - Позиция
 */
export class PositionEdit extends AbstractBundlable {
    constructor(position: Position) {
        super('PositionEdit');
        this.type = 'POSITION_EDIT';
        this.position = position;
    }
}

/**
 * @class module:receipt.PositionRemove
 * @classdesc Класс, содержащий позицию, которая будет удалена из чека.
 * @param {string} positionUuid - Идентификатор (uuid) позиции
 */
export class PositionRemove extends AbstractBundlable {
    constructor(positionUuid: string) {
        super('PositionRemove');
        this.type = 'POSITION_REMOVE';
        this.positionUuid = positionUuid;
    }
}

/**
 * @class module:receipt.SetExtra
 * @classdesc Класс, содержащий дополнительные поля чека.
 * @param {Object} extra - Объект с дополнительными полями
 */
export class SetExtra extends AbstractBundlable {
    constructor(extra: Object) {
        super('SetExtra');
        this.extra = extra;
    }
}

/**
 * @class module:receipt.SetPrintGroup
 * @classdesc Класс, содержащий печатную группу для разделения чека.
 * @param {?module:receipt.PrintGroup} printGroup - Печатная группа
 * @param {string[]} paymentPurposeIds - Массив идентификаторов [частей платежа]{@link module:receipt.PaymentPurpose}
 * @param {string[]} positionUuids - Массив идентификаторов [позиций]{@link module:receipt.Position}
 */
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

/**
 * @class module:receipt.SetPrintExtra
 * @classdesc Класс, содержащий дополнительные печатные элементы чека.
 * @param {module:receipt.PrintExtraPlace} printExtraPlace - Расположение печатных элементов в чеке
 * @param {module:devices.Printable[]} printables - Массив печатных элементов
 */
export class SetPrintExtra extends AbstractBundlable {
    constructor(printExtraPlace: PrintExtraPlace,
                printables: Printable[]) {
        super('SetPrintExtra');
        this.printExtraPlace = printExtraPlace;
        this.printables = printables;
    };
}

/**
 * @class module:receipt.PrintExtraPlacePrintGroupTop
 * @classdesc Класс, содержащий расположение дополнительных печатных элементов чека после клише, до текста “Кассовый чек”.
 * @param {string} [printGroupId] - Идентификатор [печатной группы чека]{@link module:receipt.PrintGroup}
 */
export class PrintExtraPlacePrintGroupTop {
    constructor(printGroupId?: string) {
        this.type = "PrintExtraPlacePrintGroupTop";
        this.printGroupId = printGroupId ? printGroupId : null;
    }
}

/**
 * @class module:receipt.PrintExtraPlacePrintGroupHeader
 * @classdesc Класс, содержащий расположение дополнительных печатных элементов чека после текста “Кассовый чек”, до имени пользователя.
 * @param {string} [printGroupId] - Идентификатор [печатной группы чека]{@link module:receipt.PrintGroup}
 */
export class PrintExtraPlacePrintGroupHeader {
    constructor(printGroupId?: string) {
        this.type = "PrintExtraPlacePrintGroupHeader";
        this.printGroupId = printGroupId ? printGroupId : null;
    }
}

/**
 * @class module:receipt.PrintExtraPlacePrintGroupSummary
 * @classdesc Класс, содержащий расположение дополнительных печатных элементов чека после итога и списка оплат, до текста “всего оплачено”.
 * @param {string} [printGroupId] - Идентификатор [печатной группы чека]{@link module:receipt.PrintGroup}
 */
export class PrintExtraPlacePrintGroupSummary {
    constructor(printGroupId?: string) {
        this.type = "PrintExtraPlacePrintGroupSummary";
        this.printGroupId = printGroupId ? printGroupId : null;
    }
}

/**
 * @class module:receipt.PrintExtraPlacePositionFooter
 * @classdesc Класс, содержащий расположение дополнительных печатных элементов чека в [позиции чека]{@link module:receipt.Position}, до её подпозиций.
 * @param {string} [positionUuid] - Идентификатор (uuid) [позиции чека]{@link module:receipt.Position}
 */
export class PrintExtraPlacePositionFooter {
    constructor(positionUuid?: string) {
        this.type = "PrintExtraPlacePositionFooter";
        this.positionUuid = positionUuid ? positionUuid : null;
    }
}

/**
 * @class module:receipt.PrintExtraPlacePositionAllSubpositionsFooter
 * @classdesc Класс, содержащий расположение дополнительных печатных элементов чека в позиции чека, после всех её подпозиций.
 * @param {string} [positionUuid] - Идентификатор (uuid) [позиции чека]{@link module:receipt.Position}
 */
export class PrintExtraPlacePositionAllSubpositionsFooter {
    constructor(positionUuid?: string) {
        this.type = "PrintExtraPlacePositionAllSubpositionsFooter";
        this.positionUuid = positionUuid ? positionUuid : null;
    }
}