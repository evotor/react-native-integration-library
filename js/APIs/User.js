import {UserModule} from '../NativeModules';
import {Grant, User} from '../DataWrappers/user';
import Converter from '../Utilities/Converter';

export default class UserAPI {

    static getAllUsers(): Promise<User[]> {
        return new Promise(resolve => UserModule.getAllUsers(Converter.getArrayReader(resolve, User.prototype)));
    }

    static getAuthenticatedUser(): Promise<User | null> {
        return new Promise(resolve => UserModule.getAuthenticatedUser(Converter.getInstanceReader(resolve, User.prototype)));
    }

    static getAllGrants(): Promise<Grant[]> {
        return new Promise(resolve => UserModule.getAllGrants(Converter.getInstanceReader(resolve, Grant.prototype)));
    }

    static getGrantsOfAuthenticatedUser(): Promise<Grant[]> {
        return new Promise(resolve => UserModule.getGrantsOfAuthenticatedUser(Converter.getArrayReader(resolve, Grant.prototype)));
    }

}