/**
 * Классы для работы с кассой.
 * @module kkt
 */
import {KktModule} from "../NativeModules";
import {FfdVersion, AgentType, SubagentType} from "../Types/compilable";

/**
 * @class module:kkt.KktAPI
 * @classdesc С помощью методов класса можно получать данные о кассе.
 * @hideconstructor
 */
export default class KktAPI {

    /**
     * Получает поддерживаемую кассой версию ФФД.
     * @function module:kkt.KktAPI.getSupportedFfdVersion
     * @returns {Promise<?module:kkt#FfdVersion>} Promise с версией ФФД
     */
    static getSupportedFfdVersion(): Promise<FfdVersion | null> {
        return new Promise(resolve => KktModule.getSupportedFfdVersion(resolve));
    }

    /**
     * Получает массив типов агентов, которые были указаны при регистрации кассы.
     * @function module:kkt.KktAPI.getRegisteredAgentTypes
     * @returns {?Promise<?module:counterparties#AgentType>} Promise с массивом типов агентов
     */
    static getRegisteredAgentTypes(): Promise<AgentType[] | null> {
        return new Promise(resolve => KktModule.getRegisteredAgentTypes(resolve));
    }

    /**
     * Получает массив типов субагентов, которые были указаны при регистрации кассы.
     * @function module:kkt.KktAPI.getRegisteredSubagentTypes
     * @returns {?Promise<?module:counterparties#SubagentType>} Promise с массивом типов субагентов
     */
    static getRegisteredSubagentTypes(): Promise<SubagentType[] | null> {
        return new Promise(resolve => KktModule.getRegisteredSubagentTypes(resolve));
    }

    /**
     * Проверяет, установлен ли на терминал пакет обновлений с возможностью пробивать фискальные документы по ставке НДС 20%.
     * @function module:kkt.KktAPI.isVatRate20Available
     * @returns {?boolean}
     */
    static isVatRate20Available(): Promise<boolean | null> {
        return new Promise(resolve => KktModule.isVatRate20Available(resolve));
    }

}