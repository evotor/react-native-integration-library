/**
 * Классы для работы с контрагентами.
 * @module counterparties
 */
import {CounterpartyType} from '../../Types/compilable'

export default class Counterparty {
    uuid;
    constructor(uuid: string | null,
                counterpartyType: CounterpartyType,
                fullName: string | null,
                shortName: string | null,
                inn: string | null,
                kpp: string | null,
                phones: string[] | null,
                addresses: string[] | null) {
        this.uuid = uuid;
        this.counterpartyType = counterpartyType;
        this.fullName = fullName;
        this.shortName = shortName;
        this.inn = inn;
        this.kpp = kpp;
        this.phones = phones;
        this.addresses = addresses;
    }
}