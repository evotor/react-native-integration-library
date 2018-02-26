import {ExtraKey, Position, PrintGroup, Receipt, ReceiptHeader} from "../DataWrappers/receipt/framework";
import {Intent} from "../DataWrappers/navigation";
import {PositionAdd, PositionEdit} from "../DataWrappers/receipt/changes";
import {PositionEvent} from "../DataWrappers/services/events";
import {
    CashDrawerEventType, CashOperationEventType, PositionEventType, ProductEventType,
    ReceiptEventType
} from "../Types/enums";
import {CashDrawerEvent, CashOperationEvent, ProductEvent, ReceiptEvent} from "../DataWrappers/services/events";
import {PaymentSystemEvent} from "../DataWrappers/services/results";
import {Product, ProductGroup} from "../DataWrappers/inventory";

export default class Converter {

    static getInstanceReader(getter, prototype) {
        return (instance) => {
            getter(instance ? Converter.setPrototypeOf(instance, prototype) : null);
        }
    }

    static getArrayReader(getter, prototype) {
        return (array) => {
            array.forEach(
                (item, i) => {
                    array[i] = Converter.setPrototypeOf(item, prototype);
                }
            );
            getter(array);
        }
    }

    static getProductItemReader(getter) {
        return (productItem) => {
            getter(productItem ? Converter.setPrototypeOf(
                productItem, productItem.hasOwnProperty('quantity') ? Product.prototype : ProductGroup.prototype
            ) : null);
        }
    }

    static getPositionsReader(getter) {
        return (positions) => {
            positions.forEach(
                (item, i) => {
                    positions[i] = Converter.readPosition(item);
                }
            );
            getter(positions);
        }
    }

    static getReceiptReader(getter) {
        return (source) => {
            let result = null;
            if (source) {
                source.printDocuments.forEach(
                    (item, i) => {
                        source.printDocuments[i] = Converter.setPrototypeOf(item, PrintGroup.prototype);
                        source.printDocuments[i].payments = Converter.readPayments(item.payments);
                        source.printDocuments[i].changes = Converter.readPayments(item.changes);
                    }
                );
                result = new Receipt(Converter.setPrototypeOf(source.header, ReceiptHeader.prototype), source.printDocuments);
            }
            getter(result);
        }
    }

    static getBeforePositionsEditedEventReader(listener, callback) {
        return (eventData) => {
            eventData.changes.forEach(
                (item, i) => {
                    switch (item.type) {
                        case "POSITION_ADD":
                            eventData.changes[i] = new PositionAdd(Converter.readPosition(item.position));
                            break;
                        case "POSITION_EDIT":
                            eventData.changes[i] = new PositionEdit(Converter.readPosition(item.position));
                            break;
                        case "POSITION_REMOVE":
                            eventData.changes[i] = new PositionEdit(item.positionUuid);
                    }
                }
            );
            listener(
                eventData.changes,
                callback
            );
        }
    }

    static getReceiptDiscountEventReader(listener, callback) {
        return (eventData) => {
            listener(
                eventData.discount,
                eventData.receiptUuid,
                callback
            );
        }
    }

    static getPaymentSystemEventReader(listener, callback) {
        return (eventData) => {
            listener(
                eventData.operationType,
                Converter.setPrototypeOf(eventData.event, PaymentSystemEvent.prototype),
                callback
            );
        }
    }

    static getBroadcastEventReader(type, listener) {
        if (ProductEventType.hasOwnProperty(type)) {
            return (eventData) => {
                listener(Converter.setPrototypeOf(eventData, ProductEvent.prototype));
            }
        } else if (ReceiptEventType.hasOwnProperty(type)) {
            return (eventData) => {
                listener(Converter.setPrototypeOf(eventData, ReceiptEvent.prototype));
            }
        } else if (PositionEventType.hasOwnProperty(type)) {
            return (eventData) => {
                listener(Converter.setPrototypeOf(eventData, PositionEvent.prototype));
            }
        } else if (CashDrawerEventType.hasOwnProperty(type)) {
            return (eventData) => {
                listener(Converter.setPrototypeOf(eventData, CashDrawerEvent.prototype));
            }
        } else if (CashOperationEventType.hasOwnProperty(type)) {
            return (eventData) => {
                listener(Converter.setPrototypeOf(eventData, CashOperationEvent.prototype));
            }
        }
    }

    static getIntentReader(getter) {
        return (source) => {
            getter(Converter.readIntent(source));
        }
    }

    static getActivityResultReader(listener) {
        return (eventData) => {
            eventData.data = Converter.readIntent(eventData.data);
            listener(eventData.requestCode, eventData.resultCode, eventData.data);
        }
    }

    static getPrimitiveEventReader(listener) {
        return (eventData) => {
            listener(eventData.value);
        }
    }

    static readPosition(source) {
        source = Converter.setPrototypeOf(source, Position.prototype);
        source.extraKeys.forEach(
            (item, j) => {
                source.extraKeys[j] = Converter.setPrototypeOf(item, ExtraKey.prototype);
            }
        );
        source.subPositions.forEach(
            (item, j) => {
                source.subPositions[j] = Converter.setPrototypeOf(item, Position.prototype);
            }
        );
        return source;
    }

    static readPayments(source) {
        let result = new Map();
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                result.set(JSON.parse(key), source[key])
            }
        }
        return result;
    }

    static readIntent(source) {
        const result = new Intent();
        result.className = source.className;
        result.packageName = source.packageName;
        result.action = source.action;
        result.extras = source.extras;
        result.categories = source.categories;
        result.flags = [source.flags];
        return result;
    }

    static writePrintReceipts(printReceipts) {
        printReceipts.forEach(
            (item, i) => {
                printReceipts[i].payments = Converter.writePayments(item.payments);
                printReceipts[i].changes = Converter.writePayments(item.changes);
            }
        );
        return printReceipts;
    }

    static writePayments(source) {
        let result = {};
        source.forEach(
            (value, key) => {
                result[JSON.stringify(key)] = value;
            }
        );
        return result;
    }

    static writeIntent(source) {
        return {
            className: source.className,
            packageName: source.packageName,
            action: source.action,
            customServiceEventName: source.customServiceEventName,
            extras: source.extras,
            categories: source.categories,
            flags: source.flags,
        }
    }

    static setPrototypeOf(source, prototype) {
        source.__proto__ = prototype;
        return source;
    }

}