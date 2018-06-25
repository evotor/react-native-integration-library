package com.evotor.converter.from.db

import android.database.Cursor
import ru.evotor.framework.users.Grant
import ru.evotor.framework.users.GrantsTable
import ru.evotor.framework.users.User
import ru.evotor.framework.users.UsersTable

object UserMapper {

    fun createUser(cursor: Cursor): User =
            User(
                    uuid = cursor.getString(cursor.getColumnIndex(UsersTable.ROW_USER_UUID)),
                    secondName = cursor.getString(cursor.getColumnIndex(UsersTable.ROW_USER_SECOND_NAME)),
                    firstName = cursor.getString(cursor.getColumnIndex(UsersTable.ROW_USER_FIRST_NAME)),
                    inn = cursor.getString(cursor.getColumnIndex(UsersTable.ROW_USER_INN)),
                    phone = cursor.getString(cursor.getColumnIndex(UsersTable.ROW_USER_PHONE)),
                    pin = cursor.getString(cursor.getColumnIndex(UsersTable.ROW_USER_PIN)),
                    roleUuid = cursor.getString(cursor.getColumnIndex(UsersTable.ROW_ROLE_UUID)),
                    roleTitle = cursor.getString(cursor.getColumnIndex(UsersTable.ROW_ROLE_TITLE))
            )

    fun createGrant(cursor: Cursor): Grant =
            Grant(
                    title = cursor.getString(cursor.getColumnIndex(GrantsTable.ROW_TITLE)),
                    roleUuid = cursor.getString(cursor.getColumnIndex(GrantsTable.ROW_ROLE_UUID))
            )

}