import {Agent, Subagent, Principal, TransactionOperator} from "../counterparties/agentScheme";
import {AgentType, SubagentType} from "../../Types/compilable";
import Converter from "../../Utilities/Converter";

/**
 * @class module:receipt.AgentRequisites
 * @classdesc Класс, содержащий агентские реквизиты позиции чека.
 * ВАЖНО! При создании агентских реквизитов на устройстве агента или субагента необходимо
 * использовать только те типы агента или субагента, которые были указаны при регистрации кассы.
 * @param {?module:counterparties.Agent} agent - Агент
 * @param {?module:counterparties.Subagent} subagent - Субагент
 * @param {module:counterparties.Principal} principal - Принципал (поставщик)
 * @param {?module:counterparties.TransactionOperator} transactionOperator - Оператор перевода
 * @param {?string} operationDescription - Операция агента
 * @see module:kkt.KktAPI#getRegisteredAgentTypes
 */
export default class AgentRequisites {
    constructor(agent: Agent | null,
                subagent: Subagent | null,
                principal: Principal,
                transactionOperator: TransactionOperator | null,
                operationDescription: string | null) {
        this.agent = agent;
        this.subagent = subagent;
        this.principal = principal;
        this.transactionOperator = transactionOperator;
        this.operationDescription = operationDescription;
    }

    /**
     * Создает агентские реквизиты для агента типа "агент".
     * @function module:receipt.AgentRequisites.createForAgent
     * @param {string} principalInn - ИНН принципала (поставщика)
     * @param {string[]} principalPhones - Телефоны принципала (поставщика)
     * @returns {module:receipt.AgentRequisites} Агентские реквизиты
     */
    static createForAgent(
        principalInn: string,
        principalPhones: string[]
    ): AgentRequisites {
        return this._create(
            AgentType.AGENT,
            null,
            null,
            null,
            principalInn,
            principalPhones,
            null,
            null,
            null,
            null,
            null
        )
    }

    /**
     * Создает агентские реквизиты для агента типа "комиссионер".
     * @function module:receipt.AgentRequisites.createForCommissioner
     * @param {string} principalInn - ИНН принципала (поставщика)
     * @param {string[]} principalPhones - Телефоны принципала (поставщика)
     * @returns {module:receipt.AgentRequisites} Агентские реквизиты
     */
    static createForCommissioner(
        principalInn: string,
        principalPhones: string[]
    ): AgentRequisites {
        return this._create(
            AgentType.COMMISSIONER,
            null,
            null,
            null,
            principalInn,
            principalPhones,
            null,
            null,
            null,
            null,
            null
        )
    }

    /**
     * Создает агентские реквизиты для агента типа "поверенный".
     * @function module:receipt.AgentRequisites.createForAttorneyInFact
     * @param {string} principalInn - ИНН принципала (поставщика)
     * @param {string[]} principalPhones - Телефоны принципала (поставщика)
     * @returns {module:receipt.AgentRequisites} Агентские реквизиты
     */
    static createForAttorneyInFact(
        principalInn: string,
        principalPhones: string[]
    ): AgentRequisites {
        return this._create(
            AgentType.ATTORNEY_IN_FACT,
            null,
            null,
            null,
            principalInn,
            principalPhones,
            null,
            null,
            null,
            null,
            null
        )
    }

    /**
     * Создает агентские реквизиты для агента типа "платёжный агент".
     * @function module:receipt.AgentRequisites.createForPaymentAgent
     * @param {string[]} agentPhones - Телефоны агента
     * @param {string} principalInn - ИНН принципала (поставщика)
     * @param {string[]} principalPhones - Телефоны принципала (поставщика)
     * @param {string} operationDescription - Операция платёжного агента
     * @returns {module:receipt.AgentRequisites} Агентские реквизиты
     */
    static createForPaymentAgent(
        agentPhones: string[],
        principalInn: string,
        principalPhones: string[],
        operationDescription: string,
    ): AgentRequisites {
        return this._create(
            AgentType.PAYMENT_AGENT,
            agentPhones,
            null,
            null,
            principalInn,
            principalPhones,
            null,
            null,
            null,
            null,
            operationDescription
        )
    }

    /**
     * Создает агентские реквизиты для агента типа "платёжный субагент".
     * @function module:receipt.AgentRequisites.createForPaymentAgent
     * @param {string[]} agentPhones - Телефоны агента
     * @param {string[]} subagentPhones - Телефоны субагента
     * @param {string} principalInn - ИНН принципала (поставщика)
     * @param {string[]} principalPhones - Телефоны принципала (поставщика)
     * @param {string} operationDescription - Операция агента
     * @returns {module:receipt.AgentRequisites} Агентские реквизиты
     */
    static createForPaymentSubagent(
        agentPhones: string[],
        subagentPhones: string[],
        principalInn: string,
        principalPhones: string[],
        operationDescription: string,
    ): AgentRequisites {
        return this._create(
            null,
            agentPhones,
            SubagentType.PAYMENT_SUBAGENT,
            subagentPhones,
            principalInn,
            principalPhones,
            null,
            null,
            null,
            null,
            operationDescription
        )
    }

    /**
     * Создает агентские реквизиты для агента типа "банковский платёжный агент".
     * @function module:receipt.AgentRequisites.createForBankPaymentAgent
     * @param {string[]} agentPhones - Телефоны агента
     * @param {string} principalInn - ИНН принципала (поставщика)
     * @param {string[]} principalPhones - Телефоны принципала (поставщика)
     * @param {string} transactionOperatorName - Наименование оператора перевода
     * @param {string} transactionOperatorInn - ИНН оператора перевода
     * @param {string[]} transactionOperatorPhones - Телефоны оператора перевода
     * @param {string} transactionOperatorAddress - Адрес оператора перевода
     * @param {string} operationDescription - Операция агента
     * @returns {module:receipt.AgentRequisites} Агентские реквизиты
     */
    static createForBankPaymentAgent(
        agentPhones: string[],
        principalInn: string,
        principalPhones: string[],
        transactionOperatorName: string,
        transactionOperatorInn: string,
        transactionOperatorPhones: string[],
        transactionOperatorAddress: string,
        operationDescription: string,
    ): AgentRequisites {
        return this._create(
            AgentType.BANK_PAYMENT_AGENT,
            agentPhones,
            null,
            null,
            principalInn,
            principalPhones,
            transactionOperatorName,
            transactionOperatorInn,
            transactionOperatorPhones,
            transactionOperatorAddress,
            operationDescription
        )
    }

    /**
     * Создает агентские реквизиты для агента типа "банковский платёжный субагент".
     * @function module:receipt.AgentRequisites.createForBankPaymentAgent
     * @param {string[]} agentPhones - Телефоны агента
     * @param {string[]} subagentPhones - Телефоны субагента
     * @param {string} principalInn - ИНН принципала (поставщика)
     * @param {string[]} principalPhones - Телефоны принципала (поставщика)
     * @param {string} transactionOperatorName - Наименование оператора перевода
     * @param {string} transactionOperatorInn - ИНН оператора перевода
     * @param {string[]} transactionOperatorPhones - Телефоны оператора перевода
     * @param {string} transactionOperatorAddress - Адрес оператора перевода
     * @param {string} operationDescription - Операция субагента
     * @returns {module:receipt.AgentRequisites} Агентские реквизиты
     */
    static createForBankPaymentSubagent(
        agentPhones: string[],
        subagentPhones: string[],
        principalInn: string,
        principalPhones: string[],
        transactionOperatorName: string,
        transactionOperatorInn: string,
        transactionOperatorPhones: string[],
        transactionOperatorAddress: string,
        operationDescription: string,
    ): AgentRequisites {
        return this._create(
            null,
            agentPhones,
            SubagentType.BANK_PAYMENT_SUBAGENT,
            subagentPhones,
            principalInn,
            principalPhones,
            transactionOperatorName,
            transactionOperatorInn,
            transactionOperatorPhones,
            transactionOperatorAddress,
            operationDescription
        )
    }

    static _create(
        agentType: AgentType | null,
        agentPhones: string[] | null,
        subagentType: SubagentType | null,
        subagentPhones: string[] | null,
        principalInn: string,
        principalPhones: string[],
        transactionOperatorName: string | null,
        transactionOperatorInn: string | null,
        transactionOperatorPhones: string[] | null,
        transactionOperatorAddress: string | null,
        operationDescription: string | null
    ): AgentRequisites {
        return new AgentRequisites(
            Converter.convertCounterpartyToNull(new Agent(
                null,
                agentType,
                null,
                null,
                null,
                null,
                null,
                agentPhones,
                null
            )),
            subagentType ? new Subagent(
                null,
                subagentType,
                null,
                null,
                null,
                null,
                null,
                subagentPhones,
                null
            ) : null,
            new Principal(
                null,
                null,
                null,
                null,
                principalInn,
                null,
                principalPhones,
                null
            ),
            Converter.convertCounterpartyToNull(new TransactionOperator(
                null,
                null,
                transactionOperatorName,
                null,
                transactionOperatorInn,
                null,
                transactionOperatorPhones,
                [transactionOperatorAddress]
            )),
            operationDescription
        )
    }

}