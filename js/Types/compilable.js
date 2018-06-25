"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Перечисление типов событий изменения подключённости устройства к смарт-терминалу.
 * @enum {string} DeviceConnectionEventType
 * @property {string} PRINTER_CONNECTION_CHANGED - Принтер чеков подключён/отключён
 * @property {string} SCALES_CONNECTION_CHANGED - Весы подключены/отключены
 * @memberOf module:devices#
 */
var DeviceConnectionEventType;
(function (DeviceConnectionEventType) {
    DeviceConnectionEventType["PRINTER_CONNECTION_CHANGED"] = "PRINTER_CONNECTION_CHANGED";
    DeviceConnectionEventType["SCALES_CONNECTION_CHANGED"] = "SCALES_CONNECTION_CHANGED";
})(DeviceConnectionEventType = exports.DeviceConnectionEventType || (exports.DeviceConnectionEventType = {}));
/**
 * Перечисление типов событий сканера штрихкодов.
 * @enum {string} ScannerEventType
 * @property {string} BARCODE_RECEIVED - Получен отсканированный штрихкод
 * @memberOf module:devices#
 */
var ScannerEventType;
(function (ScannerEventType) {
    ScannerEventType["BARCODE_RECEIVED"] = "BARCODE_RECEIVED";
})(ScannerEventType = exports.ScannerEventType || (exports.ScannerEventType = {}));
/**
 * Перечисление типов навигационных событий.
 * @enum {string} NavigationEventType
 * @property {string} ACTIVITY_RESULT - Получен результат операции
 * @property {string} BACK_PRESSED - Нажата кнопка "Назад"
 * @memberOf module:navigation#
 */
var NavigationEventType;
(function (NavigationEventType) {
    NavigationEventType["ACTIVITY_RESULT"] = "ACTIVITY_RESULT";
    NavigationEventType["BACK_PRESSED"] = "BACK_PRESSED";
})(NavigationEventType = exports.NavigationEventType || (exports.NavigationEventType = {}));
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
var IntegrationServiceEventType;
(function (IntegrationServiceEventType) {
    IntegrationServiceEventType["BEFORE_POSITIONS_EDITED"] = "BEFORE_POSITIONS_EDITED";
    IntegrationServiceEventType["RECEIPT_DISCOUNT"] = "RECEIPT_DISCOUNT";
    IntegrationServiceEventType["PAYMENT_SELECTED"] = "PAYMENT_SELECTED";
    IntegrationServiceEventType["PAYMENT_SYSTEM"] = "PAYMENT_SYSTEM";
    IntegrationServiceEventType["PRINT_GROUP_REQUIRED"] = "PRINT_GROUP_REQUIRED";
    IntegrationServiceEventType["PRINT_EXTRA_REQUIRED"] = "PRINT_EXTRA_REQUIRED";
})(IntegrationServiceEventType = exports.IntegrationServiceEventType || (exports.IntegrationServiceEventType = {}));
/**
 * Перечисление типов широковещательных сообщений о товароучётных событиях.
 * @enum {string} ProductEventType
 * @property {string} PRODUCT_CARD_OPEN - Открыта карточка товара
 * @memberOf module:services#
 */
var ProductEventType;
(function (ProductEventType) {
    ProductEventType["PRODUCT_CARD_OPEN"] = "PRODUCT_CARD_OPEN";
})(ProductEventType = exports.ProductEventType || (exports.ProductEventType = {}));
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
var ReceiptEventType;
(function (ReceiptEventType) {
    ReceiptEventType["SELL_RECEIPT_OPENED"] = "SELL_RECEIPT_OPENED";
    ReceiptEventType["PAYBACK_RECEIPT_OPENED"] = "PAYBACK_RECEIPT_OPENED";
    ReceiptEventType["SELL_RECEIPT_CLEARED"] = "SELL_RECEIPT_CLEARED";
    ReceiptEventType["PAYBACK_RECEIPT_CLEARED"] = "PAYBACK_RECEIPT_CLEARED";
    ReceiptEventType["SELL_RECEIPT_CLOSED"] = "SELL_RECEIPT_CLOSED";
    ReceiptEventType["PAYBACK_RECEIPT_CLOSED"] = "PAYBACK_RECEIPT_CLOSED";
})(ReceiptEventType = exports.ReceiptEventType || (exports.ReceiptEventType = {}));
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
var PositionEventType;
(function (PositionEventType) {
    PositionEventType["SELL_RECEIPT_POSITION_ADDED"] = "SELL_RECEIPT_POSITION_ADDED";
    PositionEventType["PAYBACK_RECEIPT_POSITION_ADDED"] = "PAYBACK_RECEIPT_POSITION_ADDED";
    PositionEventType["SELL_RECEIPT_POSITION_EDITED"] = "SELL_RECEIPT_POSITION_EDITED";
    PositionEventType["PAYBACK_RECEIPT_POSITION_EDITED"] = "PAYBACK_RECEIPT_POSITION_EDITED";
    PositionEventType["SELL_RECEIPT_POSITION_REMOVED"] = "SELL_RECEIPT_POSITION_REMOVED";
    PositionEventType["PAYBACK_RECEIPT_POSITION_REMOVED"] = "PAYBACK_RECEIPT_POSITION_REMOVED";
})(PositionEventType = exports.PositionEventType || (exports.PositionEventType = {}));
/**
 * Перечисление типов широковещательных сообщений о событиях денежного ящика, подключённого к смарт-терминалу.
 * @enum {string} CashDrawerEventType
 * @property {string} CASH_DRAWER_OPEN - Открыт денежный ящик
 * @memberOf module:services#
 */
var CashDrawerEventType;
(function (CashDrawerEventType) {
    CashDrawerEventType["CASH_DRAWER_OPEN"] = "CASH_DRAWER_OPEN";
})(CashDrawerEventType = exports.CashDrawerEventType || (exports.CashDrawerEventType = {}));
/**
 * Перечисление типов широковещательных сообщений о событиях денежных операций.
 * @enum {string} CashOperationEventType
 * @property {string} CASH_IN - Внесение наличных
 * @property {string} CASH_OUT - Изъятие наличных
 * @memberOf module:services#
 */
var CashOperationEventType;
(function (CashOperationEventType) {
    CashOperationEventType["CASH_IN"] = "CASH_IN";
    CashOperationEventType["CASH_OUT"] = "CASH_OUT";
})(CashOperationEventType = exports.CashOperationEventType || (exports.CashOperationEventType = {}));
/**
 * Перечисление типов событий приёмника push-уведомлений.
 * @enum {string} PushNotificationReceiverEventType
 * @property {string} PUSH_NOTIFICATION_RECEIVED - Получено push-уведомление
 * @memberOf module:services#
 */
var PushNotificationReceiverEventType;
(function (PushNotificationReceiverEventType) {
    PushNotificationReceiverEventType["PUSH_NOTIFICATION_RECEIVED"] = "PUSH_NOTIFICATION_RECEIVED";
})(PushNotificationReceiverEventType = exports.PushNotificationReceiverEventType || (exports.PushNotificationReceiverEventType = {}));
/**
 * Перечисление сообщений навигационной ошибки.
 * @enum {string} NavigationErrorMessage
 * @property {string} TARGET_CLASS_NOT_FOUND - Не найден целевой класс
 * @property {string} TARGET_PACKAGE_NOT_FOUND - Не найден целевой пакет
 * @property {string} TARGET_CLASS_NOT_EXPORTED - Целевой класс не экспортирован
 * @memberOf module:errors#
 */
var NavigationErrorMessage;
(function (NavigationErrorMessage) {
    NavigationErrorMessage["TARGET_CLASS_NOT_FOUND"] = "TARGET_CLASS_NOT_FOUND";
    NavigationErrorMessage["TARGET_PACKAGE_NOT_FOUND"] = "TARGET_PACKAGE_NOT_FOUND";
    NavigationErrorMessage["TARGET_CLASS_NOT_EXPORTED"] = "TARGET_CLASS_NOT_EXPORTED";
})(NavigationErrorMessage = exports.NavigationErrorMessage || (exports.NavigationErrorMessage = {}));
var ProductType;
(function (ProductType) {
    ProductType["NORMAL"] = "NORMAL";
    ProductType["ALCOHOL_MARKED"] = "ALCOHOL_MARKED";
    ProductType["ALCOHOL_NOT_MARKED"] = "ALCOHOL_NOT_MARKED";
    ProductType["SERVICE"] = "SERVICE";
})(ProductType = exports.ProductType || (exports.ProductType = {}));
var FieldType;
(function (FieldType) {
    FieldType["TEXT_FIELD"] = "TEXT_FIELD";
    FieldType["DICTIONARY_FIELD"] = "DICTIONARY_FIELD";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
/**
 * Перечисление типов чека.
 * @enum {string} ReceiptType
 * @memberOf module:receipt#
 * @property {string} SELL - Чек продажи
 * @property {string} PAYBACK - Чек возврата
 * @property {string} BUY - Чек покупки
 * @property {string} BUYBACK - Чек возврата покупки
 */
var ReceiptType;
(function (ReceiptType) {
    ReceiptType["SELL"] = "SELL";
    ReceiptType["PAYBACK"] = "PAYBACK";
    ReceiptType["BUY"] = "BUY";
    ReceiptType["BUYBACK"] = "BUYBACK";
})(ReceiptType = exports.ReceiptType || (exports.ReceiptType = {}));
var TaxNumber;
(function (TaxNumber) {
    TaxNumber["VAT_18"] = "VAT_18";
    TaxNumber["VAT_10"] = "VAT_10";
    TaxNumber["NO_VAT"] = "NO_VAT";
    TaxNumber["VAT_18_118"] = "VAT_18_118";
    TaxNumber["VAT_10_110"] = "VAT_10_110";
    TaxNumber["VAT_0"] = "VAT_0";
})(TaxNumber = exports.TaxNumber || (exports.TaxNumber = {}));
var TaxationSystem;
(function (TaxationSystem) {
    TaxationSystem["COMMON"] = "COMMON";
    TaxationSystem["SIMPLIFIED_INCOME"] = "SIMPLIFIED_INCOME";
    TaxationSystem["SIMPLIFIELD_INCOME_OUTCOME"] = "SIMPLIFIELD_INCOME_OUTCOME";
    TaxationSystem["SINGLE_IMPUTED_INCOME"] = "SINGLE_IMPUTED_INCOME";
    TaxationSystem["SINGLE_AGRICULTURE"] = "SINGLE_AGRICULTURE";
    TaxationSystem["PATENT"] = "PATENT";
})(TaxationSystem = exports.TaxationSystem || (exports.TaxationSystem = {}));
var PrintGroupType;
(function (PrintGroupType) {
    PrintGroupType["CASH_RECEIPT"] = "CASH_RECEIPT";
    PrintGroupType["INVOICE"] = "INVOICE";
    PrintGroupType["string_UTII"] = "string_UTII";
})(PrintGroupType = exports.PrintGroupType || (exports.PrintGroupType = {}));
/**
 * Перечисление типов платёжной системы.
 * @enum {string} PaymentType
 * @memberOf module:receipt#
 * @property {string} CASH - Наличные
 * @property {string} ELECTRON - Электронные платежи
 * @property {string} UNKNOWN - Другое
 */
var PaymentType;
(function (PaymentType) {
    PaymentType["CASH"] = "CASH";
    PaymentType["ELECTRON"] = "ELECTRON";
    PaymentType["UNKNOWN"] = "UNKNOWN";
})(PaymentType = exports.PaymentType || (exports.PaymentType = {}));
/**
 * Перечисление типов платёжной операции.
 * @enum {string} PaymentSystemOperationType
 * @memberOf module:services#
 * @property {string} SELL - Продажа
 * @property {string} SELL_CANCEL - Отмена продажи
 * @property {string} PAYBACK - Возврат
 * @property {string} PAYBACK_CANCEL - Отмена возврата
 */
var PaymentSystemOperationType;
(function (PaymentSystemOperationType) {
    PaymentSystemOperationType["SELL"] = "SELL";
    PaymentSystemOperationType["SELL_CANCEL"] = "SELL_CANCEL";
    PaymentSystemOperationType["PAYBACK"] = "PAYBACK";
    PaymentSystemOperationType["PAYBACK_CANCEL"] = "PAYBACK_CANCEL";
})(PaymentSystemOperationType = exports.PaymentSystemOperationType || (exports.PaymentSystemOperationType = {}));
var BarcodeType;
(function (BarcodeType) {
    BarcodeType["EAN8"] = "EAN8";
    BarcodeType["UPCA"] = "UPCA";
    BarcodeType["EAN13"] = "EAN13";
    BarcodeType["CODE39"] = "CODE39";
})(BarcodeType = exports.BarcodeType || (exports.BarcodeType = {}));
