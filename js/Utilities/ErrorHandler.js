import {DeviceError, IntegrationError, NavigationError, NoActivityError} from "../DataWrappers/errors";

export default class ErrorHandler {

    static errors = {IntegrationError, NavigationError, NoActivityError, DeviceError};

    static getExecutor(resolve, reject) {
        return (result) => {
            if (typeof result === 'object' && result.hasOwnProperty('error')) {
                reject(new ErrorHandler.errors[result.error](result.message));
            } else {
                resolve(result);
            }
        };
    }

}