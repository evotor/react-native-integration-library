import {ExtraKey, Position, PrintGroup, Receipt, ReceiptHeader} from "../DataWrappers/receipt/framework";
import {Intent} from "../DataWrappers/navigation";
import {PositionAdd, PositionEdit} from "../DataWrappers/receipt/changes";
import {
    CashDrawerEvent,
    CashOperationEvent,
    PositionEvent,
    ProductEvent,
    ReceiptEvent
} from "../DataWrappers/services/events";
import {
    CashDrawerEventType,
    CashOperationEventType,
    IntegrationServiceEventType,
    PositionEventType,
    ProductEventType,
    ReceiptEventType
} from "../Types/compilable";
import {PaymentSystemEvent} from "../DataWrappers/services/events";
import {Product, ProductGroup} from "../DataWrappers/inventory/framework";
import {IntegrationCallback} from "../APIs/Services";

export default class Converter {

    static getInstanceReader(getter, prototype) {
        return instance => getter(instance ? Converter.setPrototypeOf(instance, prototype) : null)
    }

    static getArrayReader(getter, prototype) {
        return array => {
            array.forEach(
                (item, i) => array[i] = Converter.setPrototypeOf(item, prototype)
            );
            getter(array)
        }
    }

    static getEventListenerReader(type, extras) {
        if (IntegrationServiceEventType.hasOwnProperty(type)) {
            return Converter.getIntegrationEventReader(type, extras);
        } else if (ProductEventType.hasOwnProperty(type)) {
            return listener => listener(Converter.setPrototypeOf(extras, ProductEvent.prototype));
        } else if (ReceiptEventType.hasOwnProperty(type)) {
            return listener => listener(Converter.setPrototypeOf(extras, ReceiptEvent.prototype));
        } else if (PositionEventType.hasOwnProperty(type)) {
            return listener => listener(Converter.setPrototypeOf(extras, PositionEvent.prototype));
        } else if (CashDrawerEventType.hasOwnProperty(type)) {
            return listener => listener(Converter.setPrototypeOf(extras, CashDrawerEvent.prototype));
        } else if (CashOperationEventType.hasOwnProperty(type)) {
            return listener => listener(Converter.setPrototypeOf(extras, CashOperationEvent.prototype));
        } else if (type === 'PUSH_NOTIFICATION_RECEIVED') {
            return listener => listener(...extras);
        } else  if (type === 'ACTIVITY_RESULT') {
            return Converter.getActivityResultReader(extras);
        }
        return listener => listener(extras)
    }

    static getProductItemReader(getter) {
        return productItem => getter(
            productItem ? Converter.setPrototypeOf(
                productItem,
                productItem.hasOwnProperty('quantity') ? Product.prototype : ProductGroup.prototype
            ) : null
        )
    }

    static getPositionsReader(getter) {
        return positions => {
            positions.forEach(
                (item, i) => positions[i] = Converter.readPosition(item)
            );
            getter(positions);
        }
    }

    static getReceiptReader(getter) {
        return source => {
            let result = null;
            if (source) {
                source.printDocuments.forEach(
                    (item, i) => {
                        source.printDocuments[i] = Converter.setPrototypeOf(item, PrintGroup.prototype);
                        source.printDocuments[i].payments = Converter.readPayments(item.payments);
                        source.printDocuments[i].changes = Converter.readPayments(item.changes);
                    }
                );
                result = new Receipt(
                    Converter.setPrototypeOf(source.header, ReceiptHeader.prototype), source.printDocuments
                )
            }
            getter(result)
        }
    }

    static getIntentReader(getter) {
        return source => getter(Converter.readIntent(source))
    }

    static getIntegrationEventReader(type, eventData) {
        const callback = new IntegrationCallback(type);
        switch (type) {
            case 'RECEIPT_DISCOUNT':
                return listener => listener(...eventData, callback);
            case 'BEFORE_POSITIONS_EDITED':
                eventData.forEach(
                    (item, i) => {
                        switch (item.type) {
                            case "POSITION_ADD":
                                eventData[i] = new PositionAdd(Converter.readPosition(item.position));
                                break;
                            case "POSITION_EDIT":
                                eventData[i] = new PositionEdit(Converter.readPosition(item.position));
                                break;
                            case "POSITION_REMOVE":
                                eventData[i] = new PositionEdit(item.positionUuid);
                        }
                    }
                );
                return listener => listener(eventData, callback);
            case 'PAYMENT_SYSTEM':
                eventData[1] = Converter.setPrototypeOf(eventData[1], PaymentSystemEvent.prototype);
                return listener => listener(...eventData, callback);
            case 'PRINT_EXTRA_REQUIRED':
                return listener => listener(callback);
            default:
                return listener => listener(eventData, callback);
        }
    }

    static getActivityResultReader(eventData) {
        eventData[2] = Converter.readIntent(eventData.data);
        return listener => listener(...eventData)
    }

    static readPosition(source) {
        source = Converter.setPrototypeOf(source, Position.prototype);
        source.extraKeys.forEach(
            (item, j) => source.extraKeys[j] = Converter.setPrototypeOf(item, ExtraKey.prototype)
        );
        source.subPositions.forEach(
            (item, j) => source.subPositions[j] = Converter.setPrototypeOf(item, Position.prototype)
        );
        return source
    }

    static readPayments(source) {
        let result = new Map();
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                result.set(JSON.parse(key), source[key])
            }
        }
        return result
    }

    static readIntent(source) {
        const result = new Intent();
        result.className = source.className;
        result.packageName = source.packageName;
        result.action = source.action;
        result.extras = source.extras;
        result.categories = source.categories;
        result.flags = [source.flags];
        return result
    }

    static writePrintReceipts(printReceipts) {
        printReceipts.forEach(
            (item, i) => {
                printReceipts[i].payments = Converter.writePayments(item.payments);
                printReceipts[i].changes = Converter.writePayments(item.changes);
                if (item.discounts) {
                    printReceipts[i].discounts = Array.from(item.discounts).reduce(
                        (obj, [key, value]) => (Object.assign(obj, {[key]: value})), {}
                    );
                }
            }
        );
        return printReceipts
    }

    static writePayments(source) {
        let result = {};
        source.forEach(
            (value, key) => result[JSON.stringify(key)] = value
        );
        return result
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
            convertEvotorBundles: JSON.stringify(source.extras).includes("__value__")
        }
    }

    static setPrototypeOf(source, prototype) {
        source.__proto__ = prototype;
        return source
    }

}