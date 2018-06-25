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
var abstract_query_builder_1 = require("abstract-query-builder");
var framework_1 = require("../../DataWrappers/inventory/framework");
var executor_1 = require("./executor");
/**
 * @class module:inventory.ProductSortOrder
 * @classdesc Класс для сортировки полей в результате запроса.
 * @property {FieldSorter<module:inventory.ProductSortOrder>} uuid - Идентификатор (uuid) товара
 * @property {FieldSorter<module:inventory.ProductSortOrder>} parentUuid - Идентификатор (uuid) родителя товара
 * @property {FieldSorter<module:inventory.ProductSortOrder>} code - Код
 * @property {FieldSorter<module:inventory.ProductSortOrder>} name - Название
 * @property {FieldSorter<module:inventory.ProductSortOrder>} taxNumber - Налоговая ставка
 * @property {FieldSorter<module:inventory.ProductSortOrder>} type - Тип
 * @property {FieldSorter<module:inventory.ProductSortOrder>} price - Цена
 * @property {FieldSorter<module:inventory.ProductSortOrder>} quantity - Количество
 * @property {FieldSorter<module:inventory.ProductSortOrder>} description - Описание
 * @property {FieldSorter<module:inventory.ProductSortOrder>} measureName - Единица измерения
 * @property {FieldSorter<module:inventory.ProductSortOrder>} measurePrecision - Точность измерения
 * @property {FieldSorter<module:inventory.ProductSortOrder>} alcoholByVolume - Крепость алкогольной продукции
 * @property {FieldSorter<module:inventory.ProductSortOrder>} alcoholProductKindCode - Код вида продукции ФСРАР
 * @property {FieldSorter<module:inventory.ProductSortOrder>} tareVolume - Объём тары
 */
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
/**
 * @class module:inventory.ProductQuery
 * @classdesc Класс для формирования запроса на получение товарных единиц.
 * @property {FieldFilter<string, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} uuid - Идентификатор (uuid) товара
 * @property {FieldFilter<?string, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} parentUuid - Идентификатор (uuid) родителя товара
 * @property {FieldFilter<?string, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} code - Код
 * @property {FieldFilter<string, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} name - Название
 * @property {FieldFilter<module:inventory#TaxNumber, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} taxNumber - Налоговая ставка
 * @property {FieldFilter<module:inventory#ProductType, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} type - Тип
 * @property {FieldFilter<number, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} price - Цена
 * @property {FieldFilter<number, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} quantity - Количество
 * @property {FieldFilter<?string, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} description - Описание
 * @property {FieldFilter<string, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} measureName - Единица измерения
 * @property {FieldFilter<number, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} measurePrecision - Точность измерения
 * @property {FieldFilter<?number, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} alcoholByVolume - Крепость алкогольной продукции
 * @property {FieldFilter<?number, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} alcoholProductKindCode - Код вида продукции ФСРАР
 * @property {FieldFilter<?number, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} tareVolume - Объём тары
 */
var ProductQuery = /** @class */ (function (_super) {
    __extends(ProductQuery, _super);
    function ProductQuery() {
        var _this = _super.call(this, function () { return _this; }, executor_1.default("ProductItem", function (item) {
            if (item.hasOwnProperty('quantity')) {
                return framework_1.Product.prototype;
            }
            return framework_1.ProductGroup.prototype;
        })) || this;
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
