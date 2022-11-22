/* eslint-disable @typescript-eslint/naming-convention */

import { ELFFile } from "../ELFFile";
import { ELF_SYMBOL_BINDING, ELF_SYMBOL_TABLE_OFFSET, ELF_SYMBOL_TYPE, ELF_SYMBOL_VISIBILITY } from "../Enums";

export class ELFDynamicLinkerSymbol
{
    private _elfFile: ELFFile;
    private _nameIndex: number;
    private _type: ELF_SYMBOL_TYPE;
    private _binding: ELF_SYMBOL_BINDING;
    private _visibility: ELF_SYMBOL_VISIBILITY;
    private _value: bigint;
    private _size: bigint;

    public get Type() { return this._type; }
    public get Binding() { return this._binding; }
    public get Value() { return this._value; }
    public get Size() { return this._size; }
    public get Visibility() { return this._visibility; }

    // Returns the name of the symbol, which is resolved through the String Table
    public get Name()
    {
        // Resolve the symbol name through the String Table
        var stringTable = this._elfFile.GetDynamicLinkerStringTableSection().ReturnRawBinaryContent().toString();
        var symbolName = stringTable.substring(this._nameIndex);
        var end = symbolName.indexOf("\0");
        symbolName = symbolName.substring(0, end);

        if (symbolName === "")
        {
            symbolName = "*** NO ASSOCIATED NAME ***";
        }
       
        // Return the resolved Symbol name
        return symbolName;
    }

    constructor(elfBinarySectionData: Buffer, elfFile: ELFFile)
    {
        this._elfFile = elfFile;
        
        // Extract the binary data
        this._nameIndex = elfBinarySectionData.readUInt32LE(ELF_SYMBOL_TABLE_OFFSET.NAME);
        this._type = elfBinarySectionData.readUInt8(ELF_SYMBOL_TABLE_OFFSET.INFO) & 0x0F;  // Lower 4 bits
        this._binding = elfBinarySectionData.readUInt8(ELF_SYMBOL_TABLE_OFFSET.INFO) >> 4; // Upper 4 bits
        this._visibility = elfBinarySectionData.readUInt8(ELF_SYMBOL_TABLE_OFFSET.OTHER & 0x03);
        this._value = elfBinarySectionData.readBigUInt64LE(ELF_SYMBOL_TABLE_OFFSET.VALUE);
        this._size = elfBinarySectionData.readBigUInt64LE(ELF_SYMBOL_TABLE_OFFSET.SIZE);
    }
}