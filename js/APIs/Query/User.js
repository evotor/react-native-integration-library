"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_query_builder_1 = require("abstract-query-builder");
var user_1 = require("../../DataWrappers/user");
var executor_1 = require("./executor");
/**
 * @class module:user.GrantSortOrder
 * @classdesc Класс для сортировки полей в результате запроса.
 * @property {FieldSorter<module:user.GrantSortOrder>} title - Название права
 * @property {FieldSorter<module:user.GrantSortOrder>} roleUuid - Идентификатор (uuid) роли
 */
var GrantSortOrder = /** @class */ (function (_super) {
    __extends(GrantSortOrder, _super);
    function GrantSortOrder() {
        var _this = _super.call(this, function () { return _this; }) || this;
        _this.title = _this.addFieldSorter("TITLE");
        _this.roleUuid = _this.addFieldSorter("ROLE_UUID");
        return _this;
    }
    return GrantSortOrder;
}(abstract_query_builder_1.SortOrder));
exports.GrantSortOrder = GrantSortOrder;
/**
 * @class module:user.GrantQuery
 * @classdesc Класс для сортировки полей в результате запроса.
 * @property {FieldFilter<string, module:user.GrantQuery, module:user.GrantSortOrder, module:user.Grant>} title - Название права
 * @property {FieldFilter<string, module:user.GrantQuery, module:user.GrantSortOrder, module:user.Grant>} roleUuid - Идентификатор (uuid) роли
 */
var GrantQuery = /** @class */ (function (_super) {
    __extends(GrantQuery, _super);
    function GrantQuery(authenticatedUsersOnly) {
        if (authenticatedUsersOnly === void 0) { authenticatedUsersOnly = false; }
        var _this = _super.call(this, function () { return _this; }, executor_1.default(authenticatedUsersOnly ? "AuthenticatedGrant" : "Grant", user_1.Grant.prototype)) || this;
        _this.title = _this.addFieldFilter("TITLE");
        _this.roleUuid = _this.addFieldFilter("ROLE_UUID");
        return _this;
    }
    return GrantQuery;
}(abstract_query_builder_1.FilterBuilder));
exports.GrantQuery = GrantQuery;
/**
 * @class module:user.UserSortOrder
 * @classdesc Класс для сортировки полей в результате запроса.
 * @property {FieldSorter<module:user.UserSortOrder>} uuid - Идентификатор (uuid) пользователя
 * @property {FieldSorter<module:user.UserSortOrder>} secondName - Фамилия
 * @property {FieldSorter<module:user.UserSortOrder>} firstName - Имя
 * @property {FieldSorter<module:user.UserSortOrder>} inn - ИНН
 * @property {FieldSorter<module:user.UserSortOrder>} phone - Телефон
 * @property {FieldSorter<module:user.UserSortOrder>} pin - Пинкод
 * @property {FieldSorter<module:user.UserSortOrder>} roleUuid - Идентификатор (uuid) роли
 * @property {FieldSorter<module:user.UserSortOrder>} roleTitle - Название роли

 */
var UserSortOrder = /** @class */ (function (_super) {
    __extends(UserSortOrder, _super);
    function UserSortOrder() {
        var _this = _super.call(this, function () { return _this; }) || this;
        _this.uuid = _this.addFieldSorter("USER_UUID");
        _this.secondName = _this.addFieldSorter("USER_SECOND_NAME");
        _this.firstName = _this.addFieldSorter("USER_FIRST_NAME");
        _this.inn = _this.addFieldSorter("USER_INN");
        _this.phone = _this.addFieldSorter("USER_PHONE");
        _this.pin = _this.addFieldSorter("USER_PIN");
        _this.roleUuid = _this.addFieldSorter("ROLE_UUID");
        _this.roleTitle = _this.addFieldSorter("ROLE_TITLE");
        return _this;
    }
    return UserSortOrder;
}(abstract_query_builder_1.SortOrder));
exports.UserSortOrder = UserSortOrder;
/**
 * @class module:user.UserQuery
 * @classdesc Класс для формирования запроса на получение пользователей.
 * @property {FieldFilter<?string, module:user.UserQuery, module:user.UserSortOrder, module:user.User>} uuid - Идентификатор (uuid) пользователя
 * @property {FieldFilter<?string, module:user.UserQuery, module:user.UserSortOrder, module:user.User>} secondName - Фамилия
 * @property {FieldFilter<?string, module:user.UserQuery, module:user.UserSortOrder, module:user.User>} firstName - Имя
 * @property {FieldFilter<?string, module:user.UserQuery, module:user.UserSortOrder, module:user.User>} inn - ИНН
 * @property {FieldFilter<?string, module:user.UserQuery, module:user.UserSortOrder, module:user.User>} phone - Телефон
 * @property {FieldFilter<?string, module:user.UserQuery, module:user.UserSortOrder, module:user.User>} pin - Пинкод
 * @property {FieldFilter<string, module:user.UserQuery, module:user.UserSortOrder, module:user.User>} roleUuid - Идентификатор (uuid) роли
 * @property {FieldFilter<string, module:user.UserQuery, module:user.UserSortOrder, module:user.User>} roleTitle - Название роли
  */
var UserQuery = /** @class */ (function (_super) {
    __extends(UserQuery, _super);
    function UserQuery(authenticatedUsersOnly) {
        if (authenticatedUsersOnly === void 0) { authenticatedUsersOnly = false; }
        var _this = _super.call(this, function () { return _this; }, executor_1.default(authenticatedUsersOnly ? "AuthenticatedUser" : "User", user_1.User.prototype)) || this;
        _this.uuid = _this.addFieldFilter("USER_UUID");
        _this.secondName = _this.addFieldFilter("USER_SECOND_NAME");
        _this.firstName = _this.addFieldFilter("USER_FIRST_NAME");
        _this.inn = _this.addFieldFilter("USER_INN");
        _this.phone = _this.addFieldFilter("USER_PHONE");
        _this.pin = _this.addFieldFilter("USER_PIN");
        _this.roleUuid = _this.addFieldFilter("ROLE_UUID");
        _this.roleTitle = _this.addFieldFilter("ROLE_TITLE");
        return _this;
    }
    return UserQuery;
}(abstract_query_builder_1.FilterBuilder));
exports.default = UserQuery;
