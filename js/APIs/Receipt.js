import {ReceiptModule, CommandModule} from "../NativeModules";
import {ExtraKey, Position, PrintReceipt, Receipt, ReceiptHeader} from "../DataWrappers/receipt/framework";
import {SetExtra} from "../DataWrappers/receipt/changes";
import {ProductType, ReceiptType, TaxNumber} from "../Types/enums";
import Converter from "../Utilities/Converter";
import ErrorHandler from "../Utilities/ErrorHandler";
import {OpenReceiptCommandResult, SendElectronReceiptCommandResult} from "../DataWrappers/commands";
import {Product} from "../DataWrappers/inventory";
import uuidv1 from 'uuid/v1'
import uuidv3 from 'uuid/v3'
import uuidv4 from 'uuid/v4'
import uuidv5 from 'uuid/v5'

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

export class UuidGenerator {

    /**
     * More info: https://www.npmjs.com/package/uuid
     */

    static v1(options?: Object, buffer?: Array, offset?: number): string {
        return uuidv1(...arguments);
    }

    static v3(name?: string | Array, namespace?: string | Array, buffer?: Array, offset: number): string {
        return uuidv3(...arguments);
    }

    static v4(options?: Object, buffer?: Array, offset?: number): string {
        return uuidv4(...arguments);
    }

    static v5(name?: string | Array, namespace?: string | Array, buffer?: Array, offset: number): string {
        return uuidv5(...arguments);
    }

}

export class PositionBuilder {

    static newInstance(product: Product, quantity: number): PositionBuilder {
        const builder = new PositionBuilder(
            new Position(
                UuidGenerator.v4(),
                product.uuid,
                null,
                ProductType.NORMAL,
                product.name,
                product.measureName,
                product.measurePrecision,
                null,
                product.price,
                product.price,
                quantity,
                null,
                null,
                null,
                null,
                null,
                [],
                []
            )
        );
        builder.setTaxNumber(product.taxNumber)._setAlcoParams(null, product.alcoholByVolume, product.alcoholProductKindCode, product.tareVolume);
        builder._position.productType = product.type;
        builder._position.productCode = product.code;
        return builder;
    }

    static copyFrom(position: Position): PositionBuilder {
        return new PositionBuilder(Object.assign(Converter.setPrototypeOf({}, Position.prototype), position));
    }

    constructor(position: Position) {
        this._position = position;
        this._setAlcoParams = (mark, alcoholByVolume, alcoholProductKindCode, tareVolume) => {
            this._position.mark = mark;
            this._position.alcoholByVolume = alcoholByVolume;
            this._position.alcoholProductKindCode = alcoholProductKindCode;
            this._position.tareVolume = tareVolume;
        }
    }

    toAlcoholMarked(mark: string, alcoholByVolume: number, alcoholProductKindCode: number, tareVolume: number): PositionBuilder {
        this._position.productType = ProductType.ALCOHOL_MARKED;
        this._setAlcoParams(mark, alcoholByVolume, alcoholProductKindCode, tareVolume);
        return this;
    }

    toAlcoholNotMarked(alcoholByVolume: number, alcoholProductKindCode: number, tareVolume: number): PositionBuilder {
        this._position.productType = ProductType.ALCOHOL_NOT_MARKED;
        this._setAlcoParams(null, alcoholByVolume, alcoholProductKindCode, tareVolume);
        return this;
    }

    toNormal(): PositionBuilder {
        this._position.productType = ProductType.NORMAL;
        this._setAlcoParams(null, null, null, null);
        return this;
    }

    toService(): PositionBuilder {
        this._position.productType = ProductType.NORMAL;
        this._setAlcoParams(null, null, null, null);
        return this;
    }

    setUuid(uuid: string): PositionBuilder {
        this._position.uuid = uuid;
        return this;
    }

    setQuantity(quantity: number): PositionBuilder {
        this._position.quantity = quantity;
        return this;
    }

    setPrice(price: number): PositionBuilder {
        this._position.price = price;
        return this;
    }

    setPriceWithDiscountPosition(priceWithDiscountPosition: number): PositionBuilder {
        this._position.priceWithDiscountPosition = priceWithDiscountPosition;
        return this;
    }

    setMark(mark: string): PositionBuilder {
        this._position.mark = mark;
        return this;
    }

    setExtraKeys(extraKeys: ExtraKey[]): PositionBuilder {
        this._position.extraKeys = extraKeys;
        return this;
    }

    setMeasureName(measureName: string): PositionBuilder {
        this._position.measureName = measureName;
        return this;
    }

    setMeasurePrecision(measurePrecision: number): PositionBuilder {
        this._position.measurePrecision = measurePrecision;
        return this;
    }

    setTaxNumber(taxNumber: TaxNumber): PositionBuilder {
        this._position.taxNumber = taxNumber;
        return this;
    }

    setSubPositions(subPositions: Position[]): PositionBuilder {
        this._position.subPositions = subPositions;
        return this;
    }

    setBarcode(barcode: string): PositionBuilder {
        this._position.barcode = barcode;
        return this;
    }

    build(): Position {
        return this._position;
    }

}