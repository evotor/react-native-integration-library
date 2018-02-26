import {CommandModule, SessionModule} from "../NativeModules";
import ErrorHandler from "../Utilities/ErrorHandler";

export default class SessionAPI {

    static getLastSessionNumber(): Promise<number | null> {
        return new Promise(resolve => SessionModule.getLastSessionNumber(resolve));
    }

    static isSessionOpened(): Promise<boolean | null> {
        return new Promise(resolve => SessionModule.isSessionOpened(resolve));
    }

    static printZReport(): Promise<void> {
        return new Promise((resolve, reject) => CommandModule.printZReport(ErrorHandler.getExecutor(resolve, reject)));
    }

}