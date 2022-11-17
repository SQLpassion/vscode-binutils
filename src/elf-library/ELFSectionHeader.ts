/* eslint-disable @typescript-eslint/naming-convention */
import internal = require("stream");
import { ELF_SECTION_OFFSET, ELF_SECTION_TYPE } from "./Enums";

export class ELFSectionHeader
{
    // ELF section header information
    private _nameIndex: number;
    private _type: ELF_SECTION_TYPE;
    private _flags: bigint;
    private _virtualAddress: bigint;
    private _offset: bigint;
    private _size: bigint;
    private _name: string;

    // Public accessors
    public get Name() { return this._name; }
    public get VirtualAddress() { return this._virtualAddress; }
    public get Type() {return this._type; }
    public get Offset() { return this._offset; }
    public get Size() { return this._size; }

    constructor(binaryData: Buffer, stringTable?: string)
    {
        // Read the section header information
        this._nameIndex = binaryData.readUInt32LE(ELF_SECTION_OFFSET.NAME);
        this._type = binaryData.readUInt32LE(ELF_SECTION_OFFSET.TYPE);
        this._flags = binaryData.readBigUint64LE(ELF_SECTION_OFFSET.FLAGS);
        this._virtualAddress = binaryData.readBigUint64LE(ELF_SECTION_OFFSET.VIRTUAL_ADDRESS);
        this._offset = binaryData.readBigUint64LE(ELF_SECTION_OFFSET.OFFSET);
        this._size = binaryData.readBigUint64LE(ELF_SECTION_OFFSET.SIZE);
        this._name = "N/A";

        if (typeof stringTable !== "undefined")
        {
            // Retrieve the name of the section from the string table
            this._name = stringTable.substring(this._nameIndex);
            var end = this._name.indexOf("\0");
            this._name = this._name.substring(0, end);
        }
    }
}