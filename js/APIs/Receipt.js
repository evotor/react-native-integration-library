import {ReceiptModule} from "../NativeModules";
import {Position, PrintReceipt, Receipt, ReceiptHeader} from "../DataWrappers/receipt/framework";
import {SetExtra} from "../DataWrappers/receipt/changes";
import {ReceiptType} from "../Types/enums";
import Converter from "../Utilities/Converter";
import ErrorHandler from "../Utilities/ErrorHandler";

export default class ReceiptAPI {

    static getPositionByBarcode(barcode: string): Promise<Position[]> {
        return new Promise(resolve => ReceiptModule.getPositionByBarcode(barcode, Converter.getPositionsReader(resolve)));
    }

    static openReceipt(positions: Position[], extra: SetExtra | null): Promise {
        return new Promise((resolve, reject) => ReceiptModule.openReceipt(positions, extra, ErrorHandler.getExecutor(resolve, reject)));
    }

    static sendElectronReceipt(printReceipts: PrintReceipt[],
                       extra: SetExtra | null,
                       phone: string | null,
                       email: string | null,
                       discount: number | null): Promise<string> {
        const args = [];
        args[0] = Converter.writePrintReceipts(printReceipts);
        for(let i = 1; i < arguments.length - 1; i++) {
            args[i] = arguments[i];
        }
        if(discount) {
            args[4] = discount.toString();
        } else {
            args[4] = "";
        }
        return new Promise((resolve, reject) => ReceiptModule.sendElectronReceipt(...args, ErrorHandler.getExecutor(resolve, reject)));
    }

    static getReceiptByType(type: ReceiptType): Promise<Receipt | null> {
        return new Promise(resolve => ReceiptModule.getReceiptByType(type, Converter.getReceiptReader(resolve)));
    }

    static getReceiptByUuid(uuid: string): Promise<Receipt | null> {
        return new Promise(resolve => ReceiptModule.getReceiptByUuid(uuid, Converter.getReceiptReader(resolve)));
    }

    static getReceiptHeaders(type: ReceiptType | null): Promise<ReceiptHeader[]> {
        return new Promise(resolve => ReceiptModule.getReceiptHeaders(type, Converter.getArrayReader(resolve, ReceiptHeader.prototype)));
    }

}