import {InventoryModule} from "../NativeModules";
import {Field, ProductExtra} from "../DataWrappers/inventory/extras";
import Converter from "../Utilities/Converter";
import type {ProductItem} from "../Types/compilable";

export default class InventoryAPI {

    static getAllBarcodesForProduct(productUuid: string): Promise<string[]> {
        return new Promise(resolve => InventoryModule.getAllBarcodesForProduct(productUuid, resolve));
    }

    static getProductByUuid(uuid: string): Promise<ProductItem | null> {
        return new Promise(resolve => InventoryModule.getProductByUuid(uuid, Converter.getProductItemReader(resolve)));
    }

    static getField(fieldUuid: string): Promise<Field | null> {
        return new Promise(resolve => InventoryModule.getField(fieldUuid, Converter.getInstanceReader(resolve, Field.prototype)));
    }

    static getProductExtras(productUuid: string): Promise<ProductExtra[]> {
        return new Promise(resolve => InventoryModule.getProductExtras(productUuid, Converter.getArrayReader(resolve, ProductExtra.prototype)));
    }

}