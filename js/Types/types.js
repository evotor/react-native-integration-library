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
    CashOperationEvent,
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
} from "./enums";
import {
    BeforePositionsEditedEventResult, PaymentSelectedEventResult, PaymentSystemEvent, PaymentSystemPaymentErrorResult,
    PaymentSystemPaymentOkResult,
    PrintExtraRequiredEventResult,
    PrintGroupRequiredEventResult,
    ReceiptDiscountEventResult
} from "../DataWrappers/services/results";
import {Product, ProductGroup} from "../DataWrappers/inventory";

export type ProductItem = Product | ProductGroup;

export type PositionChange = PositionAdd | PositionEdit | PositionRemove;

export type Printable = PrintableText | PrintableBarcode | PrintableImage;

export type PrintExtraPlace =
    PrintExtraPlacePrintGroupTop |
    PrintExtraPlacePrintGroupHeader |
    PrintExtraPlacePrintGroupSummary |
    PrintExtraPlacePositionFooter |
    PrintExtraPlacePositionAllSubpositionsFooter;

export type DeviceConnectionEventListener = (connected: boolean) => void;

export type BarcodeReceiveListener = (barcode: string) => void;
export type ScannerEventListener = BarcodeReceiveListener;

export type ActivityResultListener = (requestCode: number, resultCode: number, data: Intent | null) => void;
export type BackPressListener = () => void;
export type NavigationEventListener = ActivityResultListener | BackPressListener;

export type CustomServiceEventType = string;
export type ServiceEventType = CustomServiceEventType | IntegrationServiceEventType;

export type CustomServiceEventListener = (extras: Object) => void;

export type BeforePositionsEditedEventListener = (positionsChanges: PositionChange[], callback: IntegrationCallback) => void
export type ReceiptDiscountEventListener = (discount: number, receiptUuid: string, callback: IntegrationCallback) => void
export type PaymentSelectedEventListener = (paymentSystem: PaymentSystem, callback: IntegrationCallback) => void
export type PaymentSystemEventListener = (operationType: PaymentSystemOperationType, event: PaymentSystemEvent, callback: IntegrationCallback) => void
export type PrintGroupRequiredEventListener = (paymentSystem: PaymentSystem, callback: IntegrationCallback) => void
export type PrintExtraRequiredEventListener = (callback: IntegrationCallback) => void
export type IntegrationServiceEventListener =
    BeforePositionsEditedEventListener |
    ReceiptDiscountEventListener |
    PaymentSelectedEventListener |
    PaymentSystemEventListener |
    PrintGroupRequiredEventListener |
    PrintExtraRequiredEventListener;

export type ServiceEventListener = CustomServiceEventListener | IntegrationServiceEventListener;

export type PaymentSystemEventResult = PaymentSystemPaymentOkResult | PaymentSystemPaymentErrorResult;
export type IntegrationServiceEventResult =
    BeforePositionsEditedEventResult |
    ReceiptDiscountEventResult |
    PaymentSelectedEventResult |
    PaymentSystemEventResult |
    PrintGroupRequiredEventResult |
    PrintExtraRequiredEventResult;

export type BroadcastEventType =
    ProductEventType |
    ReceiptEventType |
    PositionEventType |
    CashDrawerEventType |
    CashOperationEventType;
export type ProductEventListener = (event: ProductEvent) => void;
export type ReceiptEventListener = (event: ReceiptEvent) => void;
export type PositionEventListener = (event: PositionEvent) => void;
export type CashDrawerEventListener = (event: CashDrawerEvent) => void;
export type CashOperationEventListener = (event: CashOperationEvent) => void;
export type BroadcastEventListener =
    ProductEventListener |
    ReceiptEventListener |
    PositionEventListener |
    CashDrawerEventListener |
    CashOperationEventListener;

export type Bundlable =
    PositionChange |
    SetExtra |
    SetPrintGroup |
    SetPrintExtra |
    IntegrationServiceEventResult;
export type Bundle = {
    __value__: Bundlable
}