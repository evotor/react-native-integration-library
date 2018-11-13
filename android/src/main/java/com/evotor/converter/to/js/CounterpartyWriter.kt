package com.evotor.converter.to.js

import com.evotor.WritableArrayExt
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import ru.evotor.framework.counterparties.Counterparty

object CounterpartyWriter {

    fun writeCounterparty(source: Counterparty?): WritableMap? = source?.let {
        Arguments.createMap().apply {
            this.putString("uuid", it.uuid?.toString())
            this.putString("counterpartyType", it.counterpartyType?.name)
            this.putString("fullName", it.fullName)
            this.putString("shortName", it.shortName)
            this.putString("inn", it.inn)
            this.putString("kpp", it.kpp)
            this.putArray("phones", WritableArrayExt.fromList(it.phones))
            this.putArray("addresses", WritableArrayExt.fromList(it.addresses))
        }
    }

}