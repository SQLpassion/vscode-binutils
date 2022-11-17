/* eslint-disable @typescript-eslint/naming-convention */
import internal = require("stream");
import { ELF_SECTION_FLAGS, ELF_SECTION_OFFSET, ELF_SECTION_TYPE } from "./Enums";

export class ELFSectionHeader
{
    // ELF section header information
    private _nameIndex: number;
    private _name: string;
    private _type: ELF_SECTION_TYPE;
    private _flags: bigint;
    private _virtualAddress: bigint;
    private _offset: bigint;
    private _size: bigint;

    // Public accessors
    public get Name() { return this._name; }
    public get VirtualAddress() { return this._virtualAddress; }
    public get Type() {return this._type; }
    public get Offset() { return this._offset; }
    public get Size() { return this._size; }
    public get Flags() { return this._flags; }
    public get Writable() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.WRITABLE) != 0 ? true : false; }
    public get Allocatable() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.ALLOCATABLE) != 0 ? true : false; }
    public get Executable() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.EXECUTABLE) != 0 ? true : false; }
    public get Mergable() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.MERGABLE) != 0 ? true : false; }
    public get ContainsStrings() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.STRING) != 0 ? true : false; }
    public get InfoLink() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.INFO_LINK) != 0 ? true : false; }
    public get PreserveLinkOrder() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.LINK_ORDER) != 0 ? true : false; }
    public get NonConformingOSHandling() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.OS_NONCONFORMING) != 0 ? true : false; }
    public get GroupMember() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.GROUP) != 0 ? true : false; }
    public get HoldsThreadLocalData() { return (Number(this._flags) & 1 << ELF_SECTION_FLAGS.TLS) != 0 ? true : false; }

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