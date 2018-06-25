import {ProductType, TaxNumber} from "../../Types/compilable";

class AbstractProductItem {
    constructor(uuid, parentUuid, code, name) {
        this.uuid = uuid;
        this.parentUuid = parentUuid;
        this.code = code;
        this.name = name;
    }
}

/**
 * @class module:inventory.Product
 * @classdesc Класс, содержащий данные товара.
 * @param {string} uuid - Идентификатор (uuid) товара
 * @param {?string} parentUuid - Идентификатор (uuid) родителя товара
 * @param {?string} code - Код
 * @param {string} name - Название
 * @param {module:inventory#TaxNumber} taxNumber - Налоговая ставка
 * @param {module:inventory#ProductType} type - Тип
 * @param {number} price - Цена
 * @param {number} quantity - Количество
 * @param {?string} description - Описание
 * @param {string} measureName - Единица измерения
 * @param {number} measurePrecision - Точность измерения
 * @param {?number} alcoholByVolume - Крепость алкогольной продукции
 * @param {?number} alcoholProductKindCode - Код вида продукции ФСРАР
 * @param {?number} tareVolume - Объём тары
 */
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

/**
 * @class module:inventory.ProductGroup
 * @classdesc Класс, содержащий данные товарной группы.
 * @param {string} uuid - Идентификатор (uuid) товара
 * @param {?string} parentUuid - Идентификатор (uuid) родителя товара
 * @param {?string} code - Код
 * @param {string} name - Название
 * @param {module:inventory#TaxNumber} taxNumber - Налоговая ставка
 */
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