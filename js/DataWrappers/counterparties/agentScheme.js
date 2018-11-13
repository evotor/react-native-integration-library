import {CounterpartyType, AgentType, SubagentType} from "../../Types/compilable";
import Counterparty from "./Counterparty";

/**
 * @class module:counterparties.Agent
 * @classdesc Класс, содержащий данные агента.
 * @param {?string} uuid - Идентификатор (uuid)
 * @param {?module:counterparties#AgentType} type - Тип
 * @param {?module:counterparties#CounterpartyType} counterpartyType - Тип контрагента
 * @param {?string} fullName - Наименование полное
 * @param {?string} shortName - Наименование краткое
 * @param {?string} inn - ИНН
 * @param {?string} kpp - КПП
 * @param {?string[]} phones - Телефоны
 * @param {?string[]} addresses - Адреса
 */
export class Agent extends Counterparty {
    constructor(uuid: string | null,
                type: AgentType | null,
                counterpartyType: CounterpartyType | null,
                fullName: string | null,
                shortName: string | null,
                inn: string | null,
                kpp: string | null,
                phones: string[] | null,
                addresses: string[] | null) {
        super(uuid, counterpartyType, fullName, shortName, inn, kpp, phones, addresses);
        this.type = type;
    }
}

/**
 * @class module:counterparties.Subagent
 * @classdesc Класс, содержащий данные субагента.
 * @param {?string} uuid - Идентификатор (uuid)
 * @param {?module:counterparties#SubagentType} type - Тип
 * @param {?module:counterparties#CounterpartyType} counterpartyType - Тип контрагента
 * @param {?string} fullName - Наименование полное
 * @param {?string} shortName - Наименование краткое
 * @param {?string} inn - ИНН
 * @param {?string} kpp - КПП
 * @param {?string[]} phones - Телефоны
 * @param {?string[]} addresses - Адреса
 */
export class Subagent extends Counterparty {
    constructor(uuid: string | null,
                type: SubagentType,
                counterpartyType: CounterpartyType | null,
                fullName: string | null,
                shortName: string | null,
                inn: string | null,
                kpp: string | null,
                phones: string[] | null,
                addresses: string[] | null) {
        super(uuid, counterpartyType, fullName, shortName, inn, kpp, phones, addresses);
        this.type = type;
    }
}

/**
 * @class module:counterparties.Principal
 * @classdesc Класс, содержащий данные принципала (поставщика).
 * @param {?string} uuid - Идентификатор (uuid)
 * @param {?module:counterparties#CounterpartyType} counterpartyType - Тип контрагента
 * @param {?string} fullName - Наименование полное
 * @param {?string} shortName - Наименование краткое
 * @param {?string} inn - ИНН
 * @param {?string} kpp - КПП
 * @param {?string[]} phones - Телефоны
 * @param {?string[]} addresses - Адреса
 */
export class Principal extends Counterparty {
    constructor(uuid: string | null,
                counterpartyType: CounterpartyType | null,
                fullName: string | null,
                shortName: string | null,
                inn: string | null,
                kpp: string | null,
                phones: string[] | null,
                addresses: string[] | null) {
        super(uuid, counterpartyType, fullName, shortName, inn, kpp, phones, addresses);
    }
}

/**
 * @class module:counterparties.TransactionOperator
 * @classdesc Класс, содержащий данные оператора перевода.
 * @param {?string} uuid - Идентификатор (uuid)
 * @param {?module:counterparties#CounterpartyType} counterpartyType - Тип контрагента
 * @param {?string} fullName - Наименование полное
 * @param {?string} shortName - Наименование краткое
 * @param {?string} inn - ИНН
 * @param {?string} kpp - КПП
 * @param {?string[]} phones - Телефоны
 * @param {?string[]} addresses - Адреса
 */
export class TransactionOperator extends Counterparty {
    constructor(uuid: string | null,
                counterpartyType: CounterpartyType | null,
                fullName: string | null,
                shortName: string | null,
                inn: string | null,
                kpp: string | null,
                phones: string[] | null,
                addresses: string[] | null) {
        super(uuid, counterpartyType, fullName, shortName, inn, kpp, phones, addresses);
    }
}