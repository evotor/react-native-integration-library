import {ProductGroup} from "../DataWrappers/inventory/framework";
import {Product} from "../DataWrappers/inventory/framework";

/**
 * Перечисление типов событий изменения подключённости устройства к смарт-терминалу.
 * @enum {string} DeviceConnectionEventType
 * @property {string} PRINTER_CONNECTION_CHANGED - Принтер чеков подключён/отключён
 * @property {string} SCALES_CONNECTION_CHANGED - Весы подключены/отключены
 * @memberOf module:devices#
 */
export enum DeviceConnectionEventType {
    PRINTER_CONNECTION_CHANGED = "PRINTER_CONNECTION_CHANGED",
    SCALES_CONNECTION_CHANGED = "SCALES_CONNECTION_CHANGED"
}

/**
 * Перечисление типов событий сканера штрихкодов.
 * @enum {string} ScannerEventType
 * @property {string} BARCODE_RECEIVED - Получен отсканированный штрихкод
 * @memberOf module:devices#
 */
export enum ScannerEventType {
    BARCODE_RECEIVED = "BARCODE_RECEIVED"
}

/**
 * Перечисление типов навигационных событий.
 * @enum {string} NavigationEventType
 * @property {string} ACTIVITY_RESULT - Получен результат операции
 * @property {string} BACK_PRESSED - Нажата кнопка "Назад"
 * @memberOf module:navigation#
 */
export enum NavigationEventType {
    ACTIVITY_RESULT = "ACTIVITY_RESULT",
    BACK_PRESSED = "BACK_PRESSED"
}

/**
 * Перечисление типов событий интеграционной службы.
 * @enum {string} IntegrationServiceEventType
 * @property {string} BEFORE_POSITIONS_EDITED - Намерение изменить позиции чека
 * @property {string} RECEIPT_DISCOUNT - Начисление скидки на чек
 * @property {string} PAYMENT_SELECTED - Разделения оплаты чека
 * @property {string} PAYMENT_SYSTEM - Использование сторонних платёжных систем
 * @property {string} PRINT_GROUP_REQUIRED - Разделение чека на печатные группы
 * @property {string} PRINT_EXTRA_REQUIRED - Печать дополнительных элементов чека
 * @memberOf module:services#
 */
export enum IntegrationServiceEventType {
    BEFORE_POSITIONS_EDITED = "BEFORE_POSITIONS_EDITED",
    RECEIPT_DISCOUNT = "RECEIPT_DISCOUNT",
    PAYMENT_SELECTED = "PAYMENT_SELECTED",
    PAYMENT_SYSTEM = "PAYMENT_SYSTEM",
    PRINT_GROUP_REQUIRED = "PRINT_GROUP_REQUIRED",
    PRINT_EXTRA_REQUIRED = "PRINT_EXTRA_REQUIRED"
}

/**
 * Перечисление типов широковещательных сообщений о товароучётных событиях.
 * @enum {string} ProductEventType
 * @property {string} PRODUCT_CARD_OPEN - Открыта карточка товара
 * @memberOf module:services#
 */
export enum ProductEventType {
    PRODUCT_CARD_OPEN = "PRODUCT_CARD_OPEN"
}

/**
 * Перечисление типов широковещательных сообщений о событиях чека.
 * @enum {string} ReceiptEventType
 * @property {string} SELL_RECEIPT_OPENED - Открыт чек продажи
 * @property {string} PAYBACK_RECEIPT_OPENED - Открыт чек возврата
 * @property {string} SELL_RECEIPT_CLEARED - Очищен чек продажи
 * @property {string} PAYBACK_RECEIPT_CLEARED - Очищен чек возврата
 * @property {string} SELL_RECEIPT_CLOSED - Закрыт чек продажи
 * @property {string} PAYBACK_RECEIPT_CLOSED - Закрыт чек возврата
 * @memberOf module:services#
 */
export enum ReceiptEventType {
    SELL_RECEIPT_OPENED = "SELL_RECEIPT_OPENED",
    PAYBACK_RECEIPT_OPENED = "PAYBACK_RECEIPT_OPENED",
    SELL_RECEIPT_CLEARED = "SELL_RECEIPT_CLEARED",
    PAYBACK_RECEIPT_CLEARED = "PAYBACK_RECEIPT_CLEARED",
    SELL_RECEIPT_CLOSED = "SELL_RECEIPT_CLOSED",
    PAYBACK_RECEIPT_CLOSED = "PAYBACK_RECEIPT_CLOSED"
}

/**
 * Перечисление типов широковещательных сообщений о событиях изменений позиций чека.
 * @enum {string} PositionEventType
 * @property {string} SELL_RECEIPT_POSITION_ADDED - Добавлена позиция в чек продажи
 * @property {string} PAYBACK_RECEIPT_POSITION_ADDED - Добавлена позиция в чек возврата
 * @property {string} SELL_RECEIPT_POSITION_EDITED - Отредактирована позиция в чеке продажи
 * @property {string} PAYBACK_RECEIPT_POSITION_EDITED - Отредактирована позиция в чеке возврата
 * @property {string} SELL_RECEIPT_POSITION_REMOVED - Удалена позиция из чека продажи
 * @property {string} PAYBACK_RECEIPT_POSITION_REMOVED - Удалена позиция из чека возврата
 * @memberOf module:services#
 */
export enum PositionEventType {
    SELL_RECEIPT_POSITION_ADDED = "SELL_RECEIPT_POSITION_ADDED",
    PAYBACK_RECEIPT_POSITION_ADDED = "PAYBACK_RECEIPT_POSITION_ADDED",
    SELL_RECEIPT_POSITION_EDITED = "SELL_RECEIPT_POSITION_EDITED",
    PAYBACK_RECEIPT_POSITION_EDITED = "PAYBACK_RECEIPT_POSITION_EDITED",
    SELL_RECEIPT_POSITION_REMOVED = "SELL_RECEIPT_POSITION_REMOVED",
    PAYBACK_RECEIPT_POSITION_REMOVED = "PAYBACK_RECEIPT_POSITION_REMOVED"
}

/**
 * Перечисление типов широковещательных сообщений о событиях денежного ящика, подключённого к смарт-терминалу.
 * @enum {string} CashDrawerEventType
 * @property {string} CASH_DRAWER_OPEN - Открыт денежный ящик
 * @memberOf module:services#
 */
export enum CashDrawerEventType {
    CASH_DRAWER_OPEN = "CASH_DRAWER_OPEN"
}

/**
 * Перечисление типов широковещательных сообщений о событиях денежных операций.
 * @enum {string} CashOperationEventType
 * @property {string} CASH_IN - Внесение наличных
 * @property {string} CASH_OUT - Изъятие наличных
 * @memberOf module:services#
 */
export enum CashOperationEventType {
    CASH_IN = "CASH_IN",
    CASH_OUT = "CASH_OUT"
}

/**
 * Перечисление типов событий приёмника push-уведомлений.
 * @enum {string} PushNotificationReceiverEventType
 * @property {string} PUSH_NOTIFICATION_RECEIVED - Получено push-уведомление
 * @memberOf module:services#
 */
export enum PushNotificationReceiverEventType {
    PUSH_NOTIFICATION_RECEIVED = "PUSH_NOTIFICATION_RECEIVED"
}

/**
 * Перечисление сообщений навигационной ошибки.
 * @enum {string} NavigationErrorMessage
 * @property {string} TARGET_CLASS_NOT_FOUND - Не найден целевой класс
 * @property {string} TARGET_PACKAGE_NOT_FOUND - Не найден целевой пакет
 * @property {string} TARGET_CLASS_NOT_EXPORTED - Целевой класс не экспортирован
 * @memberOf module:errors#
 */
export enum NavigationErrorMessage {
    TARGET_CLASS_NOT_FOUND = "TARGET_CLASS_NOT_FOUND",
    TARGET_PACKAGE_NOT_FOUND = "TARGET_PACKAGE_NOT_FOUND",
    TARGET_CLASS_NOT_EXPORTED = "TARGET_CLASS_NOT_EXPORTED"
}

export enum ProductType {
    NORMAL = "NORMAL",
    ALCOHOL_MARKED = "ALCOHOL_MARKED",
    ALCOHOL_NOT_MARKED = "ALCOHOL_NOT_MARKED",
    SERVICE = "SERVICE"
}

export enum FieldType {
    TEXT_FIELD = "TEXT_FIELD",
    DICTIONARY_FIELD = "DICTIONARY_FIELD"
}

/**
 * Перечисление типов чека.
 * @enum {string} ReceiptType
 * @memberOf module:receipt#
 * @property {string} SELL - Чек продажи
 * @property {string} PAYBACK - Чек возврата
 * @property {string} BUY - Чек покупки
 * @property {string} BUYBACK - Чек возврата покупки
 */
export enum ReceiptType {
    SELL = "SELL",
    PAYBACK = "PAYBACK",
    BUY = "BUY",
    BUYBACK = "BUYBACK"
}

export enum TaxNumber {
    VAT_18 = "VAT_18",
    VAT_10 = "VAT_10",
    NO_VAT = "NO_VAT",
    VAT_18_118 = "VAT_18_118",
    VAT_10_110 = "VAT_10_110",
    VAT_0 = "VAT_0"
}

export enum TaxationSystem {
    COMMON = "COMMON",
    SIMPLIFIED_INCOME = "SIMPLIFIED_INCOME",
    SIMPLIFIELD_INCOME_OUTCOME = "SIMPLIFIELD_INCOME_OUTCOME",
    SINGLE_IMPUTED_INCOME = "SINGLE_IMPUTED_INCOME",
    SINGLE_AGRICULTURE = "SINGLE_AGRICULTURE",
    PATENT = "PATENT"
}

export enum PrintGroupType {
    CASH_RECEIPT = "CASH_RECEIPT",
    INVOICE = "INVOICE",
    string_UTII = "string_UTII"
}

/**
 * Перечисление типов платёжной системы.
 * @enum {string} PaymentType
 * @memberOf module:receipt#
 * @property {string} CASH - Наличные
 * @property {string} ELECTRON - Электронные платежи
 * @property {string} UNKNOWN - Другое
 */
export enum PaymentType {
    CASH = "CASH",
    ELECTRON = "ELECTRON",
    UNKNOWN = "UNKNOWN"
}

/**
 * Перечисление типов платёжной операции.
 * @enum {string} PaymentSystemOperationType
 * @memberOf module:services#
 * @property {string} SELL - Продажа
 * @property {string} SELL_CANCEL - Отмена продажи
 * @property {string} PAYBACK - Возврат
 * @property {string} PAYBACK_CANCEL - Отмена возврата
 */
export enum PaymentSystemOperationType {
    SELL = "SELL",
    SELL_CANCEL = "SELL_CANCEL",
    PAYBACK = "PAYBACK",
    PAYBACK_CANCEL = "PAYBACK_CANCEL"
}

export enum BarcodeType {
    EAN8 = "EAN8",
    UPCA = "UPCA",
    EAN13 = "EAN13",
    CODE39 = "CODE39"
}