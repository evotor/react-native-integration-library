import React from 'react';
import {NativeModules} from 'react-native';
import {FilterBuilder, SortOrder} from "abstract-query-builder";
import {ProductItem, ProductType, TaxNumber} from "../../Types/compilable";
import {Product, ProductGroup} from "../../DataWrappers/inventory/framework";

export class ProductSortOrder extends SortOrder<ProductSortOrder> {

    uuid = this.addFieldSorter("UUID");
    parentUuid = this.addFieldSorter("PARENT_UUID");
    code = this.addFieldSorter("CODE");
    name = this.addFieldSorter("NAME");
    taxNumber = this.addFieldSorter("TAX_NUMBER");
    type = this.addFieldSorter("TYPE");
    price = this.addFieldSorter("PRICE_OUT");
    quantity = this.addFieldSorter("QUANTITY");
    description = this.addFieldSorter("DESCRIPTION");
    measureName = this.addFieldSorter("MEASURE_NAME");
    measurePrecision = this.addFieldSorter("MEASURE_PRECISION");
    alcoholByVolume = this.addFieldSorter("ALCOHOL_BY_VOLUME");
    alcoholProductKindCode = this.addFieldSorter("ALCOHOL_PRODUCT_KIND_CODE");
    tareVolume = this.addFieldSorter("TARE_VOLUME");

    constructor() {
        super(() => this);
    }

}

export default class ProductQuery extends FilterBuilder<ProductQuery, ProductSortOrder, ProductItem> {

    uuid = this.addFieldFilter<string>("UUID");
    parentUuid = this.addFieldFilter<string>("PARENT_UUID");
    code = this.addFieldFilter<(string | null)>("CODE");
    name = this.addFieldFilter<string>("NAME");
    taxNumber = this.addFieldFilter<TaxNumber>("TAX_NUMBER");
    type = this.addFieldFilter<ProductType>("TYPE");
    price = this.addFieldFilter<number>("PRICE_OUT", (it) => it * 100);
    quantity = this.addFieldFilter<number>("QUANTITY", (it) => it * 1000);
    description = this.addFieldFilter<(string | null)>("DESCRIPTION");
    measureName = this.addFieldFilter<string>("MEASURE_NAME");
    measurePrecision = this.addFieldFilter<number>("MEASURE_PRECISION");
    alcoholByVolume = this.addFieldFilter<(number | null)>("ALCOHOL_BY_VOLUME", (it) => it ? it * 1000 : null);
    alcoholProductKindCode = this.addFieldFilter<(number | null)>("ALCOHOL_PRODUCT_KIND_CODE");
    tareVolume = this.addFieldFilter<(number | null)>("TARE_VOLUME", (it) => it ? it * 1000 : null);

    constructor() {
        super(
            () => this,
            (selection, selectionArgs, sortOrderLimit) =>
                new Promise(resolve =>
                    NativeModules.InventoryModule.query(
                        selection,
                        selectionArgs,
                        sortOrderLimit,
                        (productItems) => {
                            productItems.forEach(
                                (item, i) => {
                                    if (item) {
                                        productItems[i].__proto__ = item.hasOwnProperty('quantity') ? Product.prototype : ProductGroup.prototype;
                                    }
                                }
                            );
                            resolve(productItems);
                        }
                    )
                )
        );
    }

}