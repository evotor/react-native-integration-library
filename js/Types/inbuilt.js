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
 * @name module:inventory#ProductItem
 * @type {type}
 * @default {@link module:inventory.Product} | {@link module:inventory.ProductGroup}
 */
export type ProductItem = Product | ProductGroup;

/**
 * Изменение позиции.
 * @name module:receipt#PositionChange
 * @type {type}
 * @default {@link module:receipt.PositionAdd}
 * | {@link module:receipt.PositionEdit}
 * | {@link module:receipt.PositionRemove}
 */
export type PositionChange = PositionAdd | PositionEdit | PositionRemove;

/**
 * Элемент печати.
 * @name module:devices#Printable
 * @type {type}
 * @default {@link module:devices.PrintableText}
 * | {@link module:devices.PrintableBarcode}
 * | {@link module:devices.PrintableImage}
 */
export type Printable = PrintableText | PrintableBarcode | PrintableImage;

/**
 * Расположение дополнительных печатных элементов чека.
 * @name module:receipt#PrintExtraPlace
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
 * @name module:devices#DeviceConnectionEventListener
 * @type {type}
 * @default (connected: boolean) => void
 */
export type DeviceConnectionEventListener = (connected: boolean) => void;

/**
 * Слушатель получения штрихкода.
 * @name module:devices#BarcodeReceiveListener
 * @type {type}
 * @default (barcode: string) => void
 */
export type BarcodeReceiveListener = (barcode: string) => void;

/**
 * Слушатель события сканера штрихкодов.
 * @name module:devices#ScannerEventListener
 * @type {type}
 * @default {@link module:devices#BarcodeReceiveListener}
 */
export type ScannerEventListener = BarcodeReceiveListener;

/**
 * Слушатель получения результата операции.
 * @name module:navigation#ActivityResultListener
 * @type {type}
 * @default (requestCode: number, resultCode: number, data: {@link module:navigation.Intent} | null) => void
 */
export type ActivityResultListener = (requestCode: number, resultCode: number, data: Intent | null) => void;

/**
 * Слушатель нажатия кнопки "Назад".
 * @name module:navigation#BackPressListener
 * @type {type}
 * @default (data: Object) => void
 */
export type BackPressListener = (data: Object) => void;

/**
 * Слушатель навигационного события.
 * @name module:navigation#NavigationEventListener
 * @type {type}
 * @default {@link module:navigation#ActivityResultListener} | {@link module:navigation#BackPressListener}
 */
export type NavigationEventListener = ActivityResultListener | BackPressListener;

/**
 * Результат события интеграционной службы использования сторонней платёжной системы.
 * @name module:services#PaymentSystemEventResult
 * @type {type}
 * @default {@link module:services.PaymentSystemPaymentOkResult}
 * | {@link module:services.PaymentSystemPaymentErrorResult}
 */
export type PaymentSystemEventResult = PaymentSystemPaymentOkResult | PaymentSystemPaymentErrorResult;

/**
 * Результат события интеграционной службы.
 * @name module:services#IntegrationServiceEventResult
 * @type {type}
 * @default {@link module:services.BeforePositionsEditedEventResult}
 * | {@link module:services.ReceiptDiscountEventResult}
 * | {@link module:services.PaymentSelectedEventResult}
 * | {@link module:services#PaymentSystemEventResult}
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
 * @name module:services#CustomServiceEventType
 * @type {type}
 * @default string
 */
export type CustomServiceEventType = string;

/**
 * Событие службы.
 * @name module:services#ServiceEventType
 * @type {type}
 * @default {@link module:services#CustomServiceEventType} | {@link module:services#IntegrationServiceEventType}
 */
export type ServiceEventType = CustomServiceEventType | IntegrationServiceEventType;

/**
 * Слушатель события собственной службы.
 * @name module:services#CustomServiceEventListener
 * @type {type}
 * @default (extras: Object) => void
 */
export type CustomServiceEventListener = (extras: Object) => void;

/**
 * Слушатель события интеграционной службы службы изменения позиций чека.
 * @name module:services#BeforePositionsEditedEventListener
 * @type {type}
 * @default (positionsChanges: {@link module:receipt#PositionChange}[], callback: {@link module:services.IntegrationCallback}) => void
 */
export type BeforePositionsEditedEventListener = (positionsChanges: PositionChange[], callback: IntegrationCallback) => void

/**
 * Слушатель события интеграционной службы службы начисления скидки на чек.
 * @name module:services#ReceiptDiscountEventListener
 * @type {type}
 * @default (discount: number, receiptUuid: string, callback: {@link module:services.IntegrationCallback}) => void
 */
export type ReceiptDiscountEventListener = (discount: number, receiptUuid: string, callback: IntegrationCallback) => void

/**
 * Слушатель события интеграционной службы службы разделения оплаты чека.
 * @name module:services#PaymentSelectedEventListener
 * @type {type}
 * @default (paymentSystem: {@link module:receipt.PaymentSystem}, callback: {@link module:services.IntegrationCallback}) => void
 */
export type PaymentSelectedEventListener = (paymentSystem: PaymentSystem, callback: IntegrationCallback) => void

/**
 * Слушатель события интеграционной службы службы использования сторонних платёжных систем.
 * @name module:services#PaymentSystemEventListener
 * @type {type}
 * @default (operationType: {@link module:services#PaymentSystemOperationType}, event: {@link module:services.PaymentSystemEvent}, callback: {@link module:services.IntegrationCallback}) => void
 */
export type PaymentSystemEventListener = (operationType: PaymentSystemOperationType, event: PaymentSystemEvent, callback: IntegrationCallback) => void

/**
 * Слушатель события интеграционной службы службы разделения чека на печатные группы.
 * @name module:services#PrintGroupRequiredEventListener
 * @type {type}
 * @default (paymentSystem: {@link module:receipt.PaymentSystem}, callback: {@link module:services.IntegrationCallback}) => void
 */
export type PrintGroupRequiredEventListener = (paymentSystem: PaymentSystem, callback: IntegrationCallback) => void

/**
 * Слушатель события интеграционной службы службы печати дополнительных элементов чека.
 * @name module:services#PrintExtraRequiredEventListener
 * @type {type}
 * @default (callback: {@link module:services.IntegrationCallback}) => void
 */
export type PrintExtraRequiredEventListener = (callback: IntegrationCallback) => void

/**
 * Слушатель события интеграционной службы.
 * @name module:services#IntegrationServiceEventListener
 * @type {type}
 * @default {@link module:services#BeforePositionsEditedEventListener}
 * | {@link module:services#ReceiptDiscountEventListener}
 * | {@link module:services#PaymentSelectedEventListener}
 * | {@link module:services#PaymentSystemEventListener}
 * | {@link module:services#PrintGroupRequiredEventListener}
 * | {@link module:services#PrintExtraRequiredEventListener}
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
 * @name module:services#ServiceEventListener
 * @type {type}
 * @default {@link module:services#CustomServiceEventListener} | {@link module:services#IntegrationServiceEventListener}
 */
export type ServiceEventListener = CustomServiceEventListener | IntegrationServiceEventListener;

/**
 * Тип широковещательного сообщения.
 * @name module:services#BroadcastEventType
 * @type {type}
 * @default {@link module:services#ProductEventType}
 * | {@link module:services#ReceiptEventType}
 * | {@link module:services#PositionEventType}
 * | {@link module:services#CashDrawerEventType}
 * | {@link module:services#CashOperationEventType}
 */
export type BroadcastEventType =
    ProductEventType |
    ReceiptEventType |
    PositionEventType |
    CashDrawerEventType |
    CashOperationEventType;

/**
 * Слушатель широковещательного сообщения о товароучётном событии.
 * @name module:services#ProductEventListener
 * @type {type}
 * @default (event: {@link module:services.ProductEvent}) => void
 */
export type ProductEventListener = (event: ProductEvent) => void;

/**
 * Слушатель широковещательного сообщения о событии чека.
 * @name module:services#ReceiptEventListener
 * @type {type}
 * @default (event: {@link module:services.ReceiptEvent}) => void
 */
export type ReceiptEventListener = (event: ReceiptEvent) => void;

/**
 * Слушатель широковещательного сообщения о событии изменения позиции чека.
 * @name module:services#PositionEventListener
 * @type {type}
 * @default (event: {@link module:services.PositionEvent}) => void
 */
export type PositionEventListener = (event: PositionEvent) => void;

/**
 * Слушатель широковещательного сообщения о событии денежного ящика, подключённого к смарт-терминалу.
 * @name module:services#CashDrawerEventListener
 * @type {type}
 * @default (event: {@link module:services.CashDrawerEvent}) => void
 */
export type CashDrawerEventListener = (event: CashDrawerEvent) => void;

/**
 * Слушатель широковещательного сообщения о событии денежной операции.
 * @name module:services#CashOperationEventListener
 * @type {type}
 * @default (event: {@link module:services.CashOperationEvent}) => void
 */
export type CashOperationEventListener = (event: CashOperationEvent) => void;

/**
 * Слушатель широковещательного сообщения.
 * @name module:services#BroadcastEventListener
 * @type {type}
 * @default {@link module:services#ProductEventListener}
 * | {@link module:services#ReceiptEventListener}
 * | {@link module:services#PositionEventListener}
 * | {@link module:services#CashDrawerEventListener}
 * | {@link module:services#CashOperationEventListener}
 */
export type BroadcastEventListener =
    ProductEventListener |
    ReceiptEventListener |
    PositionEventListener |
    CashDrawerEventListener |
    CashOperationEventListener;

/**
 * Слушатель push-уведомлений.
 * @name module:services#PushNotificationReceiverEventListener
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