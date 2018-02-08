import {InventoryModule} from "../NativeModules";
import {Field, ProductExtra, ProductItem} from "../DataWrappers/inventory";
import Converter from "../Utilities/Converter";

export default class InventoryAPI {

    static getAllBarcodesForProduct(productUuid: string): Promise<string[]> {
        return new Promise(resolve => InventoryModule.getAllBarcodesForProduct(productUuid, resolve));
    }

    static getProductByUuid(uuid: string): Promise<ProductItem | null> {
        return new Promise(resolve => InventoryModule.getProductByUuid(uuid, Converter.getInstanceReader(resolve, ProductItem.prototype)));
    }

    static getField(fieldUuid: string): Promise<Field | null> {
        return new Promise(resolve => InventoryModule.getField(fieldUuid, Converter.getInstanceReader(resolve, Field.prototype)));
    }

    static getProductExtras(productUuid: string): Promise<ProductExtra[]> {
        return new Promise(resolve => InventoryModule.getProductExtras(productUuid, Converter.getArrayReader(resolve, ProductExtra.prototype)));
    }

}