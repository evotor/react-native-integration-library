import {BarcodeType} from "../Types/enums";

export class PrintableText {
    constructor(text: string) {
        this.type = 'TEXT';
        this.value = text;
    }
}

export class PrintableBarcode {
    constructor(barcodeValue: string, barcodeType: BarcodeType) {
        this.type = 'BARCODE';
        this.value = barcodeValue;
        this.barcodeType = barcodeType;
    }
}

export class PrintableImage {
    constructor(uri: string) {
        this.type = 'IMAGE';
        this.uri = uri;
    }
}

export class Weight {
    constructor(weightInGrams: number, supportStable: boolean, stable: boolean) {
        this.weightInGrams = weightInGrams;
        this.supportStable = supportStable;
        this.stable = stable;
    }
}
