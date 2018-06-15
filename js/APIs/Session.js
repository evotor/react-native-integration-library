/**
 * Классы для управления сменой.
 * @module session
 */
import {CommandModule, SessionModule} from "../NativeModules";
import ErrorHandler from "../Utilities/ErrorHandler";

/**
 * @class SessionAPI
 * @classdesc Класс, с помощью методов которого можно получать данные смены и печатать отчёты.
 * @hideconstructor
 * @memberof module:session
 */
export default class SessionAPI {

    /**
     * Получает номер последней смены.
     * @function module:session.SessionAPI.getLastSessionNumber
     * @returns {Promise<?number>} Promise с номером последней смены
     */
    static getLastSessionNumber(): Promise<number | null> {
        return new Promise(resolve => SessionModule.getLastSessionNumber(resolve));
    }

    /**
     * Проверяет, открыта ли смена.
     * @function module:session.SessionAPI.isSessionOpened
     * @returns {Promise<?boolean>} Promise с результатом проверки
     */
    static isSessionOpened(): Promise<boolean | null> {
        return new Promise(resolve => SessionModule.isSessionOpened(resolve));
    }

    /**
     * Печатает отчёт закрытия смены.
     * @function module:session.SessionAPI.printZReport
     * @returns {Promise<void>}
     * @throws {IntegrationError}
     */
    static printZReport(): Promise<void> {
        return new Promise((resolve, reject) => CommandModule.printZReport(ErrorHandler.getExecutor(resolve, reject)));
    }

}