/**
 * Классы для работы с пользователями смарт-терминала.
 * @module user
 */
import {UserModule} from '../NativeModules';
import {Grant, User} from '../DataWrappers/user';
import Converter from '../Utilities/Converter';

/**
 * @class UserAPI
 * @classdesc Класс, с помощью методов которого можно получать данные пользователей смарт-терминала.
 * @hideconstructor
 * @memberof module:user
 */
export default class UserAPI {

    /**
     * Получает список всех пользователей смарт-терминала.
     * @function module:user.UserAPI.getAllUsers
     * @returns {Promise<User[]>} Promise с массом пользователей
     */
    static getAllUsers(): Promise<User[]> {
        return new Promise(resolve => UserModule.getAllUsers(Converter.getArrayReader(resolve, User.prototype)));
    }

    /**
     * Получает аутентифицированного пользователя смарт-терминала.
     * @function module:user.UserAPI.getAllUsers
     * @returns {Promise<User | null>} Promise с пользователем
     */
    static getAuthenticatedUser(): Promise<User | null> {
        return new Promise(resolve => UserModule.getAuthenticatedUser(Converter.getInstanceReader(resolve, User.prototype)));
    }

    /**
     * Получает все права.
     * @function module:user.UserAPI.getAllUsers
     * @returns {Promise<Grant[]>} Promise с массивом прав
     */
    static getAllGrants(): Promise<Grant[]> {
        return new Promise(resolve => UserModule.getAllGrants(Converter.getInstanceReader(resolve, Grant.prototype)));
    }

    /**
     * Получает права авторизованного пользователя.
     * @function module:user.UserAPI.getAllUsers
     * @returns {Promise<Grant[]>} Promise с массивом прав
     */
    static getGrantsOfAuthenticatedUser(): Promise<Grant[]> {
        return new Promise(resolve => UserModule.getGrantsOfAuthenticatedUser(Converter.getArrayReader(resolve, Grant.prototype)));
    }

}