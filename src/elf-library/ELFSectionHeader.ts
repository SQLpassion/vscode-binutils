/* eslint-disable @typescript-eslint/naming-convention */
import { timingSafeEqual } from "crypto";
import internal = require("stream");
import { IELFSection } from "./Sections/IELFSection";
import { ELFDefaultSection } from "./Sections/ELFDefaultSection";
import { ELF_SECTION_FLAGS, ELF_SECTION_OFFSET, ELF_SECTION_TYPE } from "./Enums";
import { ELFSymbolTable } from "./Sections/ELFSymbolTable";
import { ELFFile } from "./ELFFile";
import { ELFStringTableSection } from "./Sections/ELFStringTableSection";

export class ELFSectionHeader
{
    // ELF section header information
    private _elfFile: ELFFile;
    private _nameIndex: number;
    private _name: string;
    private _type: ELF_SECTION_TYPE;
    private _flags: bigint;
    private _virtualAddress: bigint;
    private _offset: bigint;
    private _size: bigint;
    private _section: IELFSection;
    private _sectionIndex: number;

    // Public accessors
    public get ELFFile() { return this._elfFile; }
    public get Name() { return this._name; }
    public get VirtualAddress() { return this._virtualAddress; }
    public get Type() { return this._type; }
    public get Offset() { return this._offset; }
    public get Size() { return this._size; }
    public get Flags() { return this._flags; }
    public get Writable() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.WRITABLE) !== 0 ? true : false; }
    public get Allocatable() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.ALLOCATABLE) !== 0 ? true : false; }
    public get Executable() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.EXECUTABLE) !== 0 ? true : false; }
    public get Mergable() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.MERGABLE) !== 0 ? true : false; }
    public get ContainsStrings() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.STRING) !== 0 ? true : false; }
    public get InfoLink() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.INFO_LINK) !== 0 ? true : false; }
    public get PreserveLinkOrder() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.LINK_ORDER) !== 0 ? true : false; }
    public get NonConformingOSHandling() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.OS_NONCONFORMING) !== 0 ? true : false; }
    public get GroupMember() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.GROUP) !== 0 ? true : false; }
    public get HoldsThreadLocalData() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.TLS) !== 0 ? true : false; }
    public get Section() { return this._section; }
    public get SectionIndex() { return this._sectionIndex; }

    constructor(elfFile: ELFFile, sectionIndex: number, elfBinaryData: Buffer, startOffset: number, endOffset: number, sectionHeaderstringTable?: string)
    {
        this._elfFile = elfFile;
        this._sectionIndex = sectionIndex;

        // Extract the binary data for the Section Header
        var binaryDataSectionHeader = elfBinaryData.subarray(startOffset, endOffset);

        // Read the section header information
        this._nameIndex = binaryDataSectionHeader.readUInt32LE(ELF_SECTION_OFFSET.NAME);
        this._type = binaryDataSectionHeader.readUInt32LE(ELF_SECTION_OFFSET.TYPE);
        this._flags = binaryDataSectionHeader.readBigUint64LE(ELF_SECTION_OFFSET.FLAGS);
        this._virtualAddress = binaryDataSectionHeader.readBigUint64LE(ELF_SECTION_OFFSET.VIRTUAL_ADDRESS);
        this._offset = binaryDataSectionHeader.readBigUint64LE(ELF_SECTION_OFFSET.OFFSET);
        this._size = binaryDataSectionHeader.readBigUint64LE(ELF_SECTION_OFFSET.SIZE);
        this._name = "N/A";

        if (typeof sectionHeaderstringTable !== "undefined")
        {
            // Retrieve the name of the section from the string table
            this._name = sectionHeaderstringTable.substring(this._nameIndex);
            var end = this._name.indexOf("\0");
            this._name = this._name.substring(0, end);
        }

        this._section = this.InitializeSection(this._type, elfBinaryData.subarray(Number(this._offset), Number(this._offset) + Number(this._size)));
    }

    // Initializes the concrete ELF section based on the type in the ELF Section Header
    private InitializeSection(type: ELF_SECTION_TYPE, sectionBinaryData: Buffer): IELFSection
    {
        var section: IELFSection;

        switch (type)
        {
            case ELF_SECTION_TYPE.SYMBOL_TABLE:
            {
                section = new ELFSymbolTable(this.ELFFile, sectionBinaryData);
                break;
            }
            case ELF_SECTION_TYPE.STRING_TABLE:
            {
                section = new ELFStringTableSection(sectionBinaryData);
                break;
            }
            default:
            {
                section = new ELFDefaultSection(sectionBinaryData);
                break;
            }
        }

        // Return the initialized section
        return section;
    }
}