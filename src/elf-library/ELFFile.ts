import * as fs from 'fs';

export class ELFFile
{
    // The raw binary data of the ELF file
    private _binaryData: any;

    private _magicConstant: string;
    private _objectFileType: string;
    private _numberOfSections: number;

    public get MagicConstant() { return this._magicConstant; }
    public get ObjectFileType() { return this._objectFileType; }
    public get NumberOfSections() { return this._numberOfSections; }

    constructor(fileName: string)
    {
        // Open the ELF binary file
        this._binaryData = fs.readFileSync(fs.openSync(fileName, 'r'));
        this._magicConstant = "";
        this._objectFileType = "";
        this._numberOfSections = 0;

        // Read the ELF Header
        this.ReadHeader();
    }

    // Reads the whole ELF File Header
    ReadHeader(): void
    {
        // Read the magic constant
        this._magicConstant = 
            this._binaryData.readUint8(0).toString(16).concat(" ").concat(
            this._binaryData.readUint8(1).toString(16)).concat(" ").concat(
            this._binaryData.readUint8(2).toString(16)).concat(" ").concat(
            this._binaryData.readUint8(3).toString(16)).concat(" ('").concat(
            String.fromCharCode(this._binaryData.readUint8(1))).concat(
            String.fromCharCode(this._binaryData.readUint8(2))).concat(
            String.fromCharCode(this._binaryData.readUint8(3))).concat("')").toUpperCase();

        // Read the number of sections
        this._numberOfSections = this._binaryData.readUint8(60);
    }
}