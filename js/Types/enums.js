"use strict";
/**
 *  Event types
 */
Object.defineProperty(exports, "__esModule", { value: true });
var DeviceConnectionEventType;
(function (DeviceConnectionEventType) {
    DeviceConnectionEventType["PRINTER_CONNECTION_CHANGED"] = "PRINTER_CONNECTION_CHANGED";
    DeviceConnectionEventType["SCALES_CONNECTION_CHANGED"] = "SCALES_CONNECTION_CHANGED";
})(DeviceConnectionEventType = exports.DeviceConnectionEventType || (exports.DeviceConnectionEventType = {}));
var ScannerEventType;
(function (ScannerEventType) {
    ScannerEventType["BARCODE_RECEIVED"] = "BARCODE_RECEIVED";
})(ScannerEventType = exports.ScannerEventType || (exports.ScannerEventType = {}));
var NavigationEventType;
(function (NavigationEventType) {
    NavigationEventType["ACTIVITY_RESULT"] = "ACTIVITY_RESULT";
    NavigationEventType["BACK_PRESSED"] = "BACK_PRESSED";
})(NavigationEventType = exports.NavigationEventType || (exports.NavigationEventType = {}));
var ProductEventType;
(function (ProductEventType) {
    ProductEventType["PRODUCT_CARD_OPEN"] = "PRODUCT_CARD_OPEN";
})(ProductEventType = exports.ProductEventType || (exports.ProductEventType = {}));
var ReceiptEventType;
(function (ReceiptEventType) {
    ReceiptEventType["SELL_RECEIPT_OPENED"] = "SELL_RECEIPT_OPENED";
    ReceiptEventType["PAYBACK_RECEIPT_OPENED"] = "PAYBACK_RECEIPT_OPENED";
    ReceiptEventType["SELL_RECEIPT_CLEARED"] = "SELL_RECEIPT_CLEARED";
    ReceiptEventType["PAYBACK_RECEIPT_CLEARED"] = "PAYBACK_RECEIPT_CLEARED";
    ReceiptEventType["SELL_RECEIPT_CLOSED"] = "SELL_RECEIPT_CLOSED";
    ReceiptEventType["PAYBACK_RECEIPT_CLOSED"] = "PAYBACK_RECEIPT_CLOSED";
})(ReceiptEventType = exports.ReceiptEventType || (exports.ReceiptEventType = {}));
var PositionEventType;
(function (PositionEventType) {
    PositionEventType["SELL_RECEIPT_POSITION_ADDED"] = "SELL_RECEIPT_POSITION_ADDED";
    PositionEventType["PAYBACK_RECEIPT_POSITION_ADDED"] = "PAYBACK_RECEIPT_POSITION_ADDED";
    PositionEventType["SELL_RECEIPT_POSITION_EDITED"] = "SELL_RECEIPT_POSITION_EDITED";
    PositionEventType["PAYBACK_RECEIPT_POSITION_EDITED"] = "PAYBACK_RECEIPT_POSITION_EDITED";
    PositionEventType["SELL_RECEIPT_POSITION_REMOVED"] = "SELL_RECEIPT_POSITION_REMOVED";
    PositionEventType["PAYBACK_RECEIPT_POSITION_REMOVED"] = "PAYBACK_RECEIPT_POSITION_REMOVED";
})(PositionEventType = exports.PositionEventType || (exports.PositionEventType = {}));
var CashDrawerEventType;
(function (CashDrawerEventType) {
    CashDrawerEventType["CASH_DRAWER_OPEN"] = "CASH_DRAWER_OPEN";
})(CashDrawerEventType = exports.CashDrawerEventType || (exports.CashDrawerEventType = {}));
var CashOperationEventType;
(function (CashOperationEventType) {
    CashOperationEventType["CASH_IN"] = "CASH_IN";
    CashOperationEventType["CASH_OUT"] = "CASH_OUT";
})(CashOperationEventType = exports.CashOperationEventType || (exports.CashOperationEventType = {}));
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
 * navigation
 */
var NavigationErrorMessage;
(function (NavigationErrorMessage) {
    NavigationErrorMessage["TARGET_CLASS_NOT_FOUND"] = "TARGET_CLASS_NOT_FOUND";
    NavigationErrorMessage["TARGET_PACKAGE_NOT_FOUND"] = "TARGET_PACKAGE_NOT_FOUND";
    NavigationErrorMessage["TARGET_CLASS_NOT_EXPORTED"] = "TARGET_CLASS_NOT_EXPORTED";
})(NavigationErrorMessage = exports.NavigationErrorMessage || (exports.NavigationErrorMessage = {}));
/**
 * inventory
 */
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
 * Receipt
 */
var ReceiptType;
(function (ReceiptType) {
    ReceiptType["SELL"] = "SELL";
    ReceiptType["PAYBACK"] = "PAYBACK";
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
 * payment
 */
var PaymentType;
(function (PaymentType) {
    PaymentType["UNKNOWN"] = "UNKNOWN";
    PaymentType["CASH"] = "CASH";
    PaymentType["ELECTRON"] = "ELECTRON";
})(PaymentType = exports.PaymentType || (exports.PaymentType = {}));
var PaymentSystemOperationType;
(function (PaymentSystemOperationType) {
    PaymentSystemOperationType["SELL"] = "SELL";
    PaymentSystemOperationType["SELL_CANCEL"] = "SELL_CANCEL";
    PaymentSystemOperationType["PAYBACK"] = "PAYBACK";
    PaymentSystemOperationType["PAYBACK_CANCEL"] = "PAYBACK_CANCEL";
})(PaymentSystemOperationType = exports.PaymentSystemOperationType || (exports.PaymentSystemOperationType = {}));
/**
 * printables
 */
var BarcodeType;
(function (BarcodeType) {
    BarcodeType["EAN8"] = "EAN8";
    BarcodeType["UPCA"] = "UPCA";
    BarcodeType["EAN13"] = "EAN13";
    BarcodeType["CODE39"] = "CODE39";
})(BarcodeType = exports.BarcodeType || (exports.BarcodeType = {}));
