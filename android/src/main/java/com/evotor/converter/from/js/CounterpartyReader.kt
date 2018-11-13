package com.evotor.converter.from.js

import ru.evotor.framework.counterparties.Counterparty
import java.util.*

object CounterpartyReader {

    fun readUuid(source: Map<*, *>): UUID? = source["uuid"]?.let { UUID.fromString(it as String) }

    fun readCounterpartyType(source: Map<*, *>): Counterparty.Type? = source["counterpartyType"]?.let { Counterparty.Type.valueOf(it as String) }

    fun readFullName(source: Map<*, *>): String? = source["fullName"] as String?

    fun readShortName(source: Map<*, *>): String? = source["shortName"] as String?

    fun readInn(source: Map<*, *>): String? = source["inn"] as String?

    fun readKpp(source: Map<*, *>): String? = source["kpp"] as String?

    fun readPhones(source: Map<*, *>): List<String>? = source["phones"] as List<String>?

    fun readAddresses(source: Map<*, *>): List<String>? = source["addresses"] as List<String>?

}