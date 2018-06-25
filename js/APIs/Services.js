/**
 * Классы для работы со службами.
 * @module services
 */
import {IntegrationModule} from '../NativeModules';
import {Intent} from '../DataWrappers/navigation';
import type {
    BroadcastEventListener,
    BroadcastEventType,
    IntegrationServiceEventResult,
    ServiceEventListener,
    ServiceEventType
} from '../Types/inbuilt';
import EventHolder from '../Utilities/EventHolder';
import Converter from '../Utilities/Converter';
import ErrorHandler from '../Utilities/ErrorHandler';
import {PushNotificationReceiverEventType} from "../Types/compilable";
import {PushNotificationReceiverEventListener} from "../Types/inbuilt";

/**
 * @class module:services.IntegrationCallback
 * @classdesc С помощью методов класса можно обрабатывать события интеграционных служб.
 * @hideconstructor
 */
export class IntegrationCallback {

    constructor(eventName) {
        this._eventName = eventName;
        this._process = (result) => new Promise(
            (resolve, reject) => IntegrationModule.setIntegrationResult(
                this._eventName, result,
                ErrorHandler.getExecutor(resolve, reject)
            )
        );
    }

    /**
     * Устанавливает результат события интеграционной службы.
     * @function module:services.IntegrationCallback#onResult
     * @param {module:services#IntegrationServiceEventResult} result - Результат
     * @returns {Promise<void>}
     * @throws {module:errors.IntegrationError}
     */
    onResult(result: IntegrationServiceEventResult): Promise<void> {
        return this._process({data: result});
    }

    /**
     * Запускает интеграционную операцию.
     * @function module:services.IntegrationCallback#startActivity
     * @param {module:navigation.Intent} intent - Намерение для запуска операции
     * @returns {Promise<void>}
     * @throws {module:errors.IntegrationError | module:errors.NavigationError}
     */
    startActivity(intent: Intent): Promise<void> {
        return this._process({intent: Converter.writeIntent(intent)});
    }

    /**
     * Завершает событие интеграционной службы без применения результата.
     * @function module:services.IntegrationCallback#skip
     * @returns {Promise<void>}
     * @throws {module:errors.IntegrationError}
     */
    skip(): Promise<void> {
        return this._process({});
    }

}

/**
 * @class module:services.ServiceAPI
 * @classdesc С помощью методов класса можно подписаться на прослушивание событий интеграционных служб, а также зарегистрировать собственную службу.
 * @hideconstructor
 */
export class ServiceAPI {

    /**
     * Добавляет слушатель события службы.
     * @function module:services.ServiceAPI.addEventListener
     * @param {module:services#ServiceEventType} type - Тип события
     * @param {module:services#ServiceEventListener} listener - Слушатель события
     * @returns {void}
     */
    static addEventListener(type: ServiceEventType, listener: ServiceEventListener): void {
        EventHolder.addEventListener(...arguments);
    }

    /**
     * Удаляет слушатель события службы.
     * @function module:services.ServiceAPI.removeEventListener
     * @param {module:services#ServiceEventType} type - Тип события
     * @param {module:services#ServiceEventListener} [listener] - Слушатель события. В случае, если он не указан, будут удалены все слушатели указанного типа события.
     * @returns {boolean} Удалён ли слушатель
     */
    static removeEventListener(type: ServiceEventType, listener?: ServiceEventListener): boolean {
        return EventHolder.removeEventListener(...arguments);
    }

}

/**
 * @class module:services.BroadcastReceiver
 * @classdesc С помощью методов класса можно подписаться на прослушивание широковещательных сообщений.
 * @hideconstructor
 */
export class BroadcastReceiver {

    /**
     * Добавляет слушатель широковещательного сообщения.
     * @function module:services.BroadcastReceiver.addEventListener
     * @param {module:services#BroadcastEventType} type - Тип события
     * @param {module:services#BroadcastEventListener} listener - Слушатель события
     * @returns {void}
     */
    static addEventListener(type: BroadcastEventType, listener: BroadcastEventListener): void {
        EventHolder.addEventListener(...arguments);
    }

    /**
     * Удаляет слушатель широковещательного сообщения.
     * @function module:services.BroadcastReceiver.removeEventListener
     * @param {module:services#BroadcastEventType} type - Тип события
     * @param {module:services#BroadcastEventListener} [listener] - Слушатель события. В случае, если он не указан, будут удалены все слушатели указанного типа события.
     * @returns {boolean} Удалён ли слушатель
     */
    static removeEventListener(type: BroadcastEventType, listener?: BroadcastEventListener): boolean {
        return EventHolder.removeEventListener(...arguments);
    }

}

/**
 * @class module:services.PushNotificationReceiver
 * @classdesc С помощью методов класса можно подписаться на прослушивание push-уведомлений.
 * @hideconstructor
 */
export class PushNotificationReceiver {

    /**
     * Добавляет слушатель push-уведомлений.
     * @function module:services.PushNotificationReceiver.addEventListener
     * @param {module:services#PushNotificationReceiverEventType} type - Тип события
     * @param {module:services#PushNotificationReceiverEventListener} listener - Слушатель события
     * @returns {void}
     */
    static addEventListener(type: PushNotificationReceiverEventType, listener: PushNotificationReceiverEventListener): void {
        EventHolder.addEventListener(...arguments);
    }

    /**
     * Удаляет слушатель push-уведомлений.
     * @function module:services.PushNotificationReceiver.removeEventListener
     * @param {module:services#PushNotificationReceiverEventType} type - Тип события
     * @param {module:services#PushNotificationReceiverEventListener} [listener] - Слушатель события. В случае, если он не указан, будут удалены все слушатели указанного типа события.
     * @returns {boolean} Удалён ли слушатель
     */
    static removeEventListener(type: PushNotificationReceiverEventType, listener?: PushNotificationReceiverEventListener): boolean {
        return EventHolder.removeEventListener(...arguments);
    }

}