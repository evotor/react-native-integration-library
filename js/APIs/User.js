/**
 * Классы для работы с пользователями смарт-терминала.
 * @module user
 */
import {UserModule} from '../NativeModules';
import {Grant, User} from '../DataWrappers/user';
import Converter from '../Utilities/Converter';

/**
 * @class module:user.UserAPI
 * @classdesc С помощью методов класса можно получать данные пользователей смарт-терминала.
 * @hideconstructor
 */
export default class UserAPI {

    /**
     * Получает список всех пользователей смарт-терминала.
     * @function module:user.UserAPI.getAllUsers
     * @returns {Promise<module:user.User[]>} Promise с массом пользователей
     */
    static getAllUsers(): Promise<User[]> {
        return new Promise(resolve => UserModule.getAllUsers(Converter.getArrayReader(resolve, User.prototype)));
    }

    /**
     * Получает аутентифицированного пользователя смарт-терминала.
     * @function module:user.UserAPI.getAllUsers
     * @returns {Promise<?module:user.User>} Promise с пользователем
     */
    static getAuthenticatedUser(): Promise<User | null> {
        return new Promise(resolve => UserModule.getAuthenticatedUser(Converter.getInstanceReader(resolve, User.prototype)));
    }

    /**
     * Получает все права.
     * @function module:user.UserAPI.getAllUsers
     * @returns {Promise<module:user.Grant[]>} Promise с массивом прав
     */
    static getAllGrants(): Promise<Grant[]> {
        return new Promise(resolve => UserModule.getAllGrants(Converter.getInstanceReader(resolve, Grant.prototype)));
    }

    /**
     * Получает права авторизованного пользователя.
     * @function module:user.UserAPI.getAllUsers
     * @returns {Promise<module:user.Grant[]>} Promise с массивом прав
     */
    static getGrantsOfAuthenticatedUser(): Promise<Grant[]> {
        return new Promise(resolve => UserModule.getGrantsOfAuthenticatedUser(Converter.getArrayReader(resolve, Grant.prototype)));
    }

}