/**
 * Перечислениия и типы.
 * @module types
 */
import {
    Product,
    ProductGroup
} from "../DataWrappers/inventory/framework";
import {
    PositionAdd,
    PositionEdit,
    PositionRemove,
    PrintExtraPlacePositionAllSubpositionsFooter,
    PrintExtraPlacePositionFooter,
    PrintExtraPlacePrintGroupHeader,
    PrintExtraPlacePrintGroupSummary,
    PrintExtraPlacePrintGroupTop,
    SetExtra,
    SetPrintExtra,
    SetPrintGroup
} from "../DataWrappers/receipt/changes";
import {Intent} from "../DataWrappers/navigation";
import {
    CashDrawerEvent,
    CashOperationEvent, PaymentSystemEvent,
    PositionEvent,
    ProductEvent,
    ReceiptEvent
} from "../DataWrappers/services/events";
import {PaymentSystem} from "../DataWrappers/receipt/payment";
import {IntegrationCallback} from "../APIs/Services";
import {PrintableBarcode, PrintableImage, PrintableText} from "../DataWrappers/devices";
import {
    CashDrawerEventType,
    CashOperationEventType,
    IntegrationServiceEventType,
    PaymentSystemOperationType, PositionEventType,
    ProductEventType,
    ReceiptEventType
} from "./compilable";
import {
    BeforePositionsEditedEventResult, PaymentSelectedEventResult, PaymentSystemPaymentErrorResult,
    PaymentSystemPaymentOkResult,
    PrintExtraRequiredEventResult,
    PrintGroupRequiredEventResult,
    ReceiptDiscountEventResult
} from "../DataWrappers/services/results";

/**
 * Товарная единица.
 * @name module:types#ProductItem
 * @type {type}
 * @default {@link module:inventory.Product} | {@link module:inventory.ProductGroup}
 */
export type ProductItem = Product | ProductGroup;

/**
 * Изменение позиции.
 * @name module:types#PositionChange
 * @type {type}
 * @default {@link module:receipt.PositionAdd}
 * | {@link module:receipt.PositionEdit}
 * | {@link module:receipt.PositionRemove}
 */
export type PositionChange = PositionAdd | PositionEdit | PositionRemove;

/**
 * Элемент печати.
 * @name module:types#Printable
 * @type {type}
 * @default {@link module:devices.PrintableText}
 * | {@link module:devices.PrintableBarcode}
 * | {@link module:devices.PrintableImage}
 */
export type Printable = PrintableText | PrintableBarcode | PrintableImage;

/**
 * Расположение дополнительных печатных элементов чека.
 * @name module:types#PrintExtraPlace
 * @type {type}
 * @default {@link module:receipt.PrintExtraPlacePrintGroupTop}
 * | {@link module:receipt.PrintExtraPlacePrintGroupHeader}
 * | {@link module:receipt.PrintExtraPlacePrintGroupSummary}
 * | {@link module:receipt.PrintExtraPlacePositionFooter}
 * | {@link module:receipt.PrintExtraPlacePositionAllSubpositionsFooter}
 */
export type PrintExtraPlace =
    PrintExtraPlacePrintGroupTop |
    PrintExtraPlacePrintGroupHeader |
    PrintExtraPlacePrintGroupSummary |
    PrintExtraPlacePositionFooter |
    PrintExtraPlacePositionAllSubpositionsFooter;

/**
 * Слушатель изменения подключённости устройства к смарт-терминалу.
 * @name module:types#DeviceConnectionEventListener
 * @type {type}
 * @default (connected: boolean) => void
 */
export type DeviceConnectionEventListener = (connected: boolean) => void;

/**
 * Слушатель получения штрихкода.
 * @name module:types#BarcodeReceiveListener
 * @type {type}
 * @default (barcode: string) => void
 */
export type BarcodeReceiveListener = (barcode: string) => void;

/**
 * Слушатель события сканера штрихкодов.
 * @name module:types#ScannerEventListener
 * @type {type}
 * @default {@link module:types#BarcodeReceiveListener}
 */
export type ScannerEventListener = BarcodeReceiveListener;

/**
 * Слушатель получения результата операции.
 * @name module:types#ActivityResultListener
 * @type {type}
 * @default (requestCode: number, resultCode: number, data: {@link module:navigation.Intent} | null) => void
 */
export type ActivityResultListener = (requestCode: number, resultCode: number, data: Intent | null) => void;

/**
 * Слушатель нажатия кнопки "Назад".
 * @name module:types#BackPressListener
 * @type {type}
 * @default (data: Object) => void
 */
export type BackPressListener = (data: Object) => void;

/**
 * Слушатель навигационного события.
 * @name module:types#NavigationEventListener
 * @type {type}
 * @default {@link module:types#ActivityResultListener} | {@link module:types#BackPressListener}
 */
export type NavigationEventListener = ActivityResultListener | BackPressListener;

/**
 * Результат события интеграционной службы использования сторонней платёжной системы.
 * @name module:types#PaymentSystemEventResult
 * @type {type}
 * @default {@link module:services.PaymentSystemPaymentOkResult}
 * | {@link module:services.PaymentSystemPaymentErrorResult}
 */
export type PaymentSystemEventResult = PaymentSystemPaymentOkResult | PaymentSystemPaymentErrorResult;

/**
 * Результат события интеграционной службы.
 * @name module:types#IntegrationServiceEventResult
 * @type {type}
 * @default {@link module:services.BeforePositionsEditedEventResult}
 * | {@link module:services.ReceiptDiscountEventResult}
 * | {@link module:services.PaymentSelectedEventResult}
 * | {@link module:types#PaymentSystemEventResult}
 * | {@link module:services.PrintGroupRequiredEventResult}
 * | {@link module:services.PrintExtraRequiredEventResult}
 */
export type IntegrationServiceEventResult =
    BeforePositionsEditedEventResult |
    ReceiptDiscountEventResult |
    PaymentSelectedEventResult |
    PaymentSystemEventResult |
    PrintGroupRequiredEventResult |
    PrintExtraRequiredEventResult;

/**
 * Событие собственной службы.
 * @name module:types#CustomServiceEventType
 * @type {type}
 * @default string
 */
export type CustomServiceEventType = string;

/**
 * Событие службы.
 * @name module:types#ServiceEventType
 * @type {type}
 * @default {@link module:types#CustomServiceEventType} | {@link module:types#IntegrationServiceEventType}
 */
export type ServiceEventType = CustomServiceEventType | IntegrationServiceEventType;

/**
 * Слушатель события собственной службы.
 * @name module:types#CustomServiceEventListener
 * @type {type}
 * @default (extras: Object) => void
 */
export type CustomServiceEventListener = (extras: Object) => void;

/**
 * Слушатель события интеграционной службы службы изменения позиций чека.
 * @name module:types#BeforePositionsEditedEventListener
 * @type {type}
 * @default (positionsChanges: {@link module:types#PositionChange}[], callback: {@link module:services.IntegrationCallback}) => void
 */
export type BeforePositionsEditedEventListener = (positionsChanges: PositionChange[], callback: IntegrationCallback) => void

/**
 * Слушатель события интеграционной службы службы начисления скидки на чек.
 * @name module:types#ReceiptDiscountEventListener
 * @type {type}
 * @default (discount: number, receiptUuid: string, callback: {@link module:services.IntegrationCallback}) => void
 */
export type ReceiptDiscountEventListener = (discount: number, receiptUuid: string, callback: IntegrationCallback) => void

/**
 * Слушатель события интеграционной службы службы разделения оплаты чека.
 * @name module:types#PaymentSelectedEventListener
 * @type {type}
 * @default (paymentSystem: {@link module:receipt.PaymentSystem}, callback: {@link module:services.IntegrationCallback}) => void
 */
export type PaymentSelectedEventListener = (paymentSystem: PaymentSystem, callback: IntegrationCallback) => void

/**
 * Слушатель события интеграционной службы службы использования сторонних платёжных систем.
 * @name module:types#PaymentSystemEventListener
 * @type {type}
 * @default (operationType: {@link module:types#PaymentSystemOperationType}, event: {@link module:services.PaymentSystemEvent}, callback: {@link module:services.IntegrationCallback}) => void
 */
export type PaymentSystemEventListener = (operationType: PaymentSystemOperationType, event: PaymentSystemEvent, callback: IntegrationCallback) => void

/**
 * Слушатель события интеграционной службы службы разделения чека на печатные группы.
 * @name module:types#PrintGroupRequiredEventListener
 * @type {type}
 * @default (paymentSystem: {@link module:receipt.PaymentSystem}, callback: {@link module:services.IntegrationCallback}) => void
 */
export type PrintGroupRequiredEventListener = (paymentSystem: PaymentSystem, callback: IntegrationCallback) => void

/**
 * Слушатель события интеграционной службы службы печати дополнительных элементов чека.
 * @name module:types#PrintExtraRequiredEventListener
 * @type {type}
 * @default (callback: {@link module:services.IntegrationCallback}) => void
 */
export type PrintExtraRequiredEventListener = (callback: IntegrationCallback) => void

/**
 * Слушатель события интеграционной службы.
 * @name module:types#IntegrationServiceEventListener
 * @type {type}
 * @default {@link module:types#BeforePositionsEditedEventListener}
 * | {@link module:types#ReceiptDiscountEventListener}
 * | {@link module:types#PaymentSelectedEventListener}
 * | {@link module:types#PaymentSystemEventListener}
 * | {@link module:types#PrintGroupRequiredEventListener}
 * | {@link module:types#PrintExtraRequiredEventListener}
 */
export type IntegrationServiceEventListener =
    BeforePositionsEditedEventListener |
    ReceiptDiscountEventListener |
    PaymentSelectedEventListener |
    PaymentSystemEventListener |
    PrintGroupRequiredEventListener |
    PrintExtraRequiredEventListener;

/**
 * Слушатель события службы.
 * @name module:types#ServiceEventListener
 * @type {type}
 * @default {@link module:types#CustomServiceEventListener} | {@link module:types#IntegrationServiceEventListener}
 */
export type ServiceEventListener = CustomServiceEventListener | IntegrationServiceEventListener;

/**
 * Тип широковещательного сообщения.
 * @name module:types#BroadcastEventType
 * @type {type}
 * @default {@link module:types#ProductEventType}
 * | {@link module:types#ReceiptEventType}
 * | {@link module:types#PositionEventType}
 * | {@link module:types#CashDrawerEventType}
 * | {@link module:types#CashOperationEventType}
 */
export type BroadcastEventType =
    ProductEventType |
    ReceiptEventType |
    PositionEventType |
    CashDrawerEventType |
    CashOperationEventType;

/**
 * Слушатель широковещательного сообщения о товароучётном событии.
 * @name module:types#ProductEventListener
 * @type {type}
 * @default (event: {@link module:services.ProductEvent}) => void
 */
export type ProductEventListener = (event: ProductEvent) => void;

/**
 * Слушатель широковещательного сообщения о событии чека.
 * @name module:types#ReceiptEventListener
 * @type {type}
 * @default (event: {@link module:services.ReceiptEvent}) => void
 */
export type ReceiptEventListener = (event: ReceiptEvent) => void;

/**
 * Слушатель широковещательного сообщения о событии изменения позиции чека.
 * @name module:types#PositionEventListener
 * @type {type}
 * @default (event: {@link module:services.PositionEvent}) => void
 */
export type PositionEventListener = (event: PositionEvent) => void;

/**
 * Слушатель широковещательного сообщения о событии денежного ящика, подключённого к смарт-терминалу.
 * @name module:types#CashDrawerEventListener
 * @type {type}
 * @default (event: {@link module:services.CashDrawerEvent}) => void
 */
export type CashDrawerEventListener = (event: CashDrawerEvent) => void;

/**
 * Слушатель широковещательного сообщения о событии денежной операции.
 * @name module:types#CashOperationEventListener
 * @type {type}
 * @default (event: {@link module:services.CashOperationEvent}) => void
 */
export type CashOperationEventListener = (event: CashOperationEvent) => void;

/**
 * Слушатель широковещательного сообщения.
 * @name module:types#BroadcastEventListener
 * @type {type}
 * @default {@link module:types#ProductEventListener}
 * | {@link module:types#ReceiptEventListener}
 * | {@link module:types#PositionEventListener}
 * | {@link module:types#CashDrawerEventListener}
 * | {@link module:types#CashOperationEventListener}
 */
export type BroadcastEventListener =
    ProductEventListener |
    ReceiptEventListener |
    PositionEventListener |
    CashDrawerEventListener |
    CashOperationEventListener;

/**
 * Слушатель push-уведомлений.
 * @name module:types#PushNotificationReceiverEventListener
 * @type {type}
 * @default (data: Object, messageId: number) => void
 */
export type PushNotificationReceiverEventListener = (data: Object, messageId: number) => void

export type Bundlable =
    PositionChange |
    SetExtra |
    SetPrintGroup |
    SetPrintExtra |
    IntegrationServiceEventResult;
export type Bundle = {
    __value__: Bundlable
}