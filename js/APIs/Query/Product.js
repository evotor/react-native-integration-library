"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var abstract_query_builder_1 = require("abstract-query-builder");
var framework_1 = require("../../DataWrappers/inventory/framework");
var ProductSortOrder = /** @class */ (function (_super) {
    __extends(ProductSortOrder, _super);
    function ProductSortOrder() {
        var _this = _super.call(this, function () { return _this; }) || this;
        _this.uuid = _this.addFieldSorter("UUID");
        _this.parentUuid = _this.addFieldSorter("PARENT_UUID");
        _this.code = _this.addFieldSorter("CODE");
        _this.name = _this.addFieldSorter("NAME");
        _this.taxNumber = _this.addFieldSorter("TAX_NUMBER");
        _this.type = _this.addFieldSorter("TYPE");
        _this.price = _this.addFieldSorter("PRICE_OUT");
        _this.quantity = _this.addFieldSorter("QUANTITY");
        _this.description = _this.addFieldSorter("DESCRIPTION");
        _this.measureName = _this.addFieldSorter("MEASURE_NAME");
        _this.measurePrecision = _this.addFieldSorter("MEASURE_PRECISION");
        _this.alcoholByVolume = _this.addFieldSorter("ALCOHOL_BY_VOLUME");
        _this.alcoholProductKindCode = _this.addFieldSorter("ALCOHOL_PRODUCT_KIND_CODE");
        _this.tareVolume = _this.addFieldSorter("TARE_VOLUME");
        return _this;
    }
    return ProductSortOrder;
}(abstract_query_builder_1.SortOrder));
exports.ProductSortOrder = ProductSortOrder;
var ProductQuery = /** @class */ (function (_super) {
    __extends(ProductQuery, _super);
    function ProductQuery() {
        var _this = _super.call(this, function () { return _this; }, function (selection, selectionArgs, sortOrderLimit) {
            return new Promise(function (resolve) {
                return react_native_1.NativeModules.InventoryModule.query(selection, selectionArgs, sortOrderLimit, function (productItems) {
                    productItems.forEach(function (item, i) {
                        if (item) {
                            productItems[i].__proto__ = item.hasOwnProperty('quantity') ? framework_1.Product.prototype : framework_1.ProductGroup.prototype;
                        }
                    });
                    resolve(productItems);
                });
            });
        }) || this;
        _this.uuid = _this.addFieldFilter("UUID");
        _this.parentUuid = _this.addFieldFilter("PARENT_UUID");
        _this.code = _this.addFieldFilter("CODE");
        _this.name = _this.addFieldFilter("NAME");
        _this.taxNumber = _this.addFieldFilter("TAX_NUMBER");
        _this.type = _this.addFieldFilter("TYPE");
        _this.price = _this.addFieldFilter("PRICE_OUT", function (it) { return it * 100; });
        _this.quantity = _this.addFieldFilter("QUANTITY", function (it) { return it * 1000; });
        _this.description = _this.addFieldFilter("DESCRIPTION");
        _this.measureName = _this.addFieldFilter("MEASURE_NAME");
        _this.measurePrecision = _this.addFieldFilter("MEASURE_PRECISION");
        _this.alcoholByVolume = _this.addFieldFilter("ALCOHOL_BY_VOLUME", function (it) { return it ? it * 1000 : null; });
        _this.alcoholProductKindCode = _this.addFieldFilter("ALCOHOL_PRODUCT_KIND_CODE");
        _this.tareVolume = _this.addFieldFilter("TARE_VOLUME", function (it) { return it ? it * 1000 : null; });
        return _this;
    }
    return ProductQuery;
}(abstract_query_builder_1.FilterBuilder));
exports.default = ProductQuery;
