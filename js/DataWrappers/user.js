/**
 * @class User
 * @classdesc Класс, содержащий данные пользователя смарт-терминала.
 * @memberOf module:user
 * @param {string} uuid - Идентификатор (uuid) пользователя
 * @param {string?} secondName - Фамилия
 * @param {string?} firstName - Имя
 * @param {string?} phone - Телефон
 * @param {string?} pin - Пин-код
 * @param {string} roleUuid - Идентификатор (uuid) роли
 * @param {string} roleTitle - Название роли
 */
export class User {
    constructor(uuid: string,
                secondName: string | null,
                firstName: string | null,
                phone: string | null,
                pin: string | null,
                roleUuid: string,
                roleTitle: string) {
        this.uid = uuid;
        this.secondName = secondName;
        this.firstName = firstName;
        this.phone = phone;
        this.pin = pin;
        this.roleUuid = roleUuid;
        this.roleTitle = roleTitle;
    }
}

/**
 * @class Grant
 * @classdesc Класс, содержащий данные прав пользователей смарт-терминала.
 * @memberOf module:user
 * @param {string} title - Название права
 * @param {string} roleUuid - Идентификатор (uuid) роли
 */
export class Grant {
    constructor(title: string, roleUuid: string) {
        this.title = title;
        this.roleUuid = roleUuid
    }
}