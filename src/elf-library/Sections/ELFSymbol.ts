/* eslint-disable @typescript-eslint/naming-convention */

import { ELF_SYMBOL_BINDING, ELF_SYMBOL_TABLE_OFFSET, ELF_SYMBOL_TYPE, ELF_SYMBOL_VISIBILITY } from "../Enums";
import { ELFSymbolTableSection } from "./ELFSymbolTableSection";

export class ELFSymbol
{
    private _elfSymbolTableSection: ELFSymbolTableSection;
    private _nameIndex: number;
    private _type: ELF_SYMBOL_TYPE;
    private _binding: ELF_SYMBOL_BINDING;
    private _visibility: ELF_SYMBOL_VISIBILITY;
    private _sectionIndex: number;
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
        // Get a reference to the String Table through the "Link" property in the Section Header.
        // The "Link" property is decremented by 1, because we have discarded the NULL section.
        var stringTable = this._elfSymbolTableSection.SectionHeader.ELFFile.SectionHeaders[this._elfSymbolTableSection.SectionHeader.Link - 1].Section.ReturnRawBinaryContent().toString();
        var symbolName = stringTable.substring(this._nameIndex);
        var end = symbolName.indexOf("\0");
        symbolName = symbolName.substring(0, end);

        if (symbolName === "")
        {
            symbolName = "*** UNDEFINED ***";
        }
       
        // Return the resolved Symbol name
        return symbolName;
    }

    // Returns the associated Section name
    public get SectionName()
    {
        // Get all Section Headers
        var sectionHeaders = this._elfSymbolTableSection.SectionHeader.ELFFile.SectionHeaders;

        for (var i = 0; i < sectionHeaders.length; i++)
        {
            if (sectionHeaders[i].SectionIndex === this._sectionIndex)
            {
                return sectionHeaders[i].Name;
            }
        }
        
        return "*** UNDEFINED *** ";
    }

    constructor(elfBinarySectionData: Buffer, elfSymbolTableSection: ELFSymbolTableSection)
    {
        this._elfSymbolTableSection = elfSymbolTableSection;
        
        // Extract the binary data
        this._nameIndex = elfBinarySectionData.readUInt32LE(ELF_SYMBOL_TABLE_OFFSET.NAME);
        this._type = elfBinarySectionData.readUInt8(ELF_SYMBOL_TABLE_OFFSET.INFO) & 0x0F;  // Lower 4 bits
        this._binding = elfBinarySectionData.readUInt8(ELF_SYMBOL_TABLE_OFFSET.INFO) >> 4; // Upper 4 bits
        this._visibility = elfBinarySectionData.readUInt8(ELF_SYMBOL_TABLE_OFFSET.OTHER & 0x03);
        this._sectionIndex = elfBinarySectionData.readUint16LE(ELF_SYMBOL_TABLE_OFFSET.SECTION_TABLE_INDEX); 
        this._value = elfBinarySectionData.readBigUInt64LE(ELF_SYMBOL_TABLE_OFFSET.VALUE);
        this._size = elfBinarySectionData.readBigUInt64LE(ELF_SYMBOL_TABLE_OFFSET.SIZE);
    }
}