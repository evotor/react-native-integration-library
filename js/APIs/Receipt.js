import {ReceiptModule, CommandModule} from "../NativeModules";
import {Position, PrintReceipt, Receipt, ReceiptHeader} from "../DataWrappers/receipt/framework";
import {SetExtra} from "../DataWrappers/receipt/changes";
import {ReceiptType} from "../Types/enums";
import Converter from "../Utilities/Converter";
import ErrorHandler from "../Utilities/ErrorHandler";
import {OpenReceiptCommandResult, SendElectronReceiptCommandResult} from "../DataWrappers/commands";

export default class ReceiptAPI {

    static getPositionsByBarcode(barcode: string): Promise<Position[]> {
        return new Promise(resolve => ReceiptModule.getPositionsByBarcode(barcode, Converter.getPositionsReader(resolve)));
    }

    static openSellReceipt(positions?: Position[] | null, extra?: SetExtra): Promise<OpenReceiptCommandResult> {
        return new Promise((resolve, reject) => CommandModule.openSellReceipt(
            positions ? positions : null,
            extra ? extra : null,
            ErrorHandler.getExecutor(Converter.getInstanceReader(resolve, OpenReceiptCommandResult.prototype), reject)
        ));
    }

    static openPaybackReceipt(positions?: Position[] | null, extra?: SetExtra): Promise<OpenReceiptCommandResult> {
        return new Promise((resolve, reject) => CommandModule.openPaybackReceipt(
            positions ? positions : null,
            extra ? extra : null,
            ErrorHandler.getExecutor(Converter.getInstanceReader(resolve, OpenReceiptCommandResult.prototype), reject)
        ));
    }

    static sendElectronReceipt(printReceipts: PrintReceipt[],
                               extra: SetExtra | null,
                               phone: string | null,
                               email: string | null,
                               discount?: number): Promise<SendElectronReceiptCommandResult> {
        const args = [];
        args[0] = Converter.writePrintReceipts(printReceipts);
        for (let i = 1; i < arguments.length - 1; i++) {
            args[i] = arguments[i];
        }
        if (discount) {
            args[4] = discount.toString();
        } else {
            args[4] = "";
        }
        return new Promise((resolve, reject) => CommandModule.sendElectronReceipt(
            ...args,
            ErrorHandler.getExecutor(Converter.getInstanceReader(resolve, SendElectronReceiptCommandResult.prototype), reject)
        ));
    }

    static getReceiptByType(type: ReceiptType): Promise<Receipt | null> {
        return new Promise(resolve => ReceiptModule.getReceiptByType(type, Converter.getReceiptReader(resolve)));
    }

    static getReceiptByUuid(uuid: string): Promise<Receipt | null> {
        return new Promise(resolve => ReceiptModule.getReceiptByUuid(uuid, Converter.getReceiptReader(resolve)));
    }

    static getReceiptHeaders(type?: ReceiptType): Promise<ReceiptHeader[] | null> {
        return new Promise(resolve => ReceiptModule.getReceiptHeaders(type ? type : null, Converter.getArrayReader(resolve, ReceiptHeader.prototype)));
    }

}