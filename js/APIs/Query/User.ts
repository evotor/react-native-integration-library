import {FilterBuilder, SortOrder} from "abstract-query-builder";
import {User, Grant} from "../../DataWrappers/user";
import executor from "./executor";

/**
 * @class module:user.GrantSortOrder
 * @classdesc Класс для сортировки полей в результате запроса.
 * @property {FieldSorter<module:user.GrantSortOrder>} title - Название права
 * @property {FieldSorter<module:user.GrantSortOrder>} roleUuid - Идентификатор (uuid) роли
 */
export class GrantSortOrder extends SortOrder<GrantSortOrder> {

    title = this.addFieldSorter("TITLE");
    roleUuid = this.addFieldSorter("ROLE_UUID");

    constructor() {
        super(() => this);
    }

}

/**
 * @class module:user.GrantQuery
 * @classdesc Класс для сортировки полей в результате запроса.
 * @property {FieldFilter<string, module:user.GrantQuery, module:user.GrantSortOrder, module:user.Grant>} title - Название права
 * @property {FieldFilter<string, module:user.GrantQuery, module:user.GrantSortOrder, module:user.Grant>} roleUuid - Идентификатор (uuid) роли
 */
export class GrantQuery extends FilterBuilder<GrantQuery, GrantSortOrder, Grant> {

    title = this.addFieldFilter<string>("TITLE");
    roleUuid = this.addFieldFilter<string>("ROLE_UUID");

    constructor(authenticatedUsersOnly: boolean = false) {
        super(
            () => this,
            executor(authenticatedUsersOnly ? "AuthenticatedGrant" : "Grant", Grant.prototype)
        );
    }

}

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
export class UserSortOrder extends SortOrder<UserSortOrder> {

    uuid = this.addFieldSorter("USER_UUID");
    secondName = this.addFieldSorter("USER_SECOND_NAME");
    firstName = this.addFieldSorter("USER_FIRST_NAME");
    inn = this.addFieldSorter("USER_INN");
    phone = this.addFieldSorter("USER_PHONE");
    pin = this.addFieldSorter("USER_PIN");
    roleUuid = this.addFieldSorter("ROLE_UUID");
    roleTitle = this.addFieldSorter("ROLE_TITLE");

    constructor() {
        super(() => this);
    }

}

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
export default class UserQuery extends FilterBuilder<UserQuery, UserSortOrder, User> {

    uuid = this.addFieldFilter<string | null>("USER_UUID");
    secondName = this.addFieldFilter<string | null>("USER_SECOND_NAME");
    firstName = this.addFieldFilter<string | null>("USER_FIRST_NAME");
    inn = this.addFieldFilter<string | null>("USER_INN");
    phone = this.addFieldFilter<string | null>("USER_PHONE");
    pin = this.addFieldFilter<string | null>("USER_PIN");
    roleUuid = this.addFieldFilter<string>("ROLE_UUID");
    roleTitle = this.addFieldFilter<string>("ROLE_TITLE");

    constructor(authenticatedUsersOnly: boolean = false) {
        super(
            () => this,
            executor(authenticatedUsersOnly ? "AuthenticatedUser" : "User", User.prototype)
        );
    }

}