import {CommandModule} from "../NativeModules";
import ErrorHandler from "../Utilities/ErrorHandler";

export default class SessionAPI {

    static printZReport(): Promise<void> {
        return new Promise((resolve, reject) => CommandModule.printZReport(ErrorHandler.getExecutor(resolve, reject)));
    }

}