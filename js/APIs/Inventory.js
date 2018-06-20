/**
 * Классы для работы с товарами.
 * @module inventory
 */
import {InventoryModule} from "../NativeModules";
import {Field, ProductExtra} from "../DataWrappers/inventory/extras";
import Converter from "../Utilities/Converter";
import type {ProductItem} from "../Types/inbuilt";

/**
 * @class module:inventory.InventoryAPI
 * @classdesc С помощью методов класса можно получать данные товаров.
 * @hideconstructor
 */
export default class InventoryAPI {

    /**
     * Получает все штрихкоды товара по указанному идентификатору (uuid) товара.
     * @function module:inventory.InventoryAPI.getAllBarcodesForProduct
     * @param {string} productUuid - Идентификатор (uuid) [товара]{@link module:inventory.Product}
     * @returns {Promise<string[]>} Promise с массивом штрихкодов
     */
    static getAllBarcodesForProduct(productUuid: string): Promise<string[]> {
        return new Promise(resolve => InventoryModule.getAllBarcodesForProduct(productUuid, resolve));
    }

    /**
     * Получает товарную единицу по указанному идентификатору (uuid) товара.
     * @function module:inventory.InventoryAPI.getProductByUuid
     * @param {string} uuid - Идентификатор (uuid) товара
     * @returns {Promise<?module:types#ProductItem>} Promise с товарной единицей
     */
    static getProductByUuid(uuid: string): Promise<ProductItem | null> {
        return new Promise(resolve => InventoryModule.getProductByUuid(uuid, Converter.getProductItemReader(resolve)));
    }

    /**
     * Получает дополнительное поле товара по указанному идентификатору (uuid) поля.
     * @function module:inventory.InventoryAPI.getProductByUuid
     * @param {string} fieldUuid - Идентификатор (uuid) поля
     * @returns {Promise<?Field>} Promise с дополнительным полем товара
     */
    static getField(fieldUuid: string): Promise<Field | null> {
        return new Promise(resolve => InventoryModule.getField(fieldUuid, Converter.getInstanceReader(resolve, Field.prototype)));
    }

    /**
     * Получает все значения дополнительных полей товара по указанному идентификатору (uuid) товара.
     * @function module:inventory.InventoryAPI.getProductByUuid
     * @param {string} productUuid - Идентификатор (uuid) товара
     * @returns {Promise<ProductExtra[]>} Promise с массивом значений дополнительных полей товара
     */
    static getProductExtras(productUuid: string): Promise<ProductExtra[]> {
        return new Promise(resolve => InventoryModule.getProductExtras(productUuid, Converter.getArrayReader(resolve, ProductExtra.prototype)));
    }

}