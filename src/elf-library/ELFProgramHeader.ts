/* eslint-disable @typescript-eslint/naming-convention */
import { ELFSectionHeader } from "./ELFSectionHeader";
import { ELF_SEGMENT_TYPE, ELF_SEGMENT_OFFSET, ELF_SEGMENT_FLAGS } from "./Enums";

export class ELFProgramHeader
{
    // ELF program header information
    private _type: ELF_SEGMENT_TYPE;
    private _flags: number;
    private _fileOffset: bigint;
    private _virtualAddress: bigint;
    private _physicalAddress: bigint;
    private _fileSize: bigint;
    private _memorySize: bigint;
    private _alignment: bigint;
    private _containedSections: ELFSectionHeader [];

    // Public accessors
    public get Type() { return this._type; }
    public get FileOffset() { return this._fileOffset; }
    public get VirtualAddress() { return this._virtualAddress; }
    public get PhysialAddress() { return this._physicalAddress; }
    public get FileSize() { return this._fileSize; }
    public get MemorySize() { return this._memorySize; }
    public get Alignment() { return this._alignment; }
    public get Executable() { return (Number(this._flags) & 1 << ELF_SEGMENT_FLAGS.EXECUTABLE) !== 0 ? true : false; }
    public get Writable() { return (Number(this._flags) & 1 << ELF_SEGMENT_FLAGS.WRITABLE) !== 0 ? true : false; }
    public get Readable() { return (Number(this._flags) & 1 << ELF_SEGMENT_FLAGS.READABLE) !== 0 ? true : false; }
    public get Range() { return "0x" + this.FileOffset.toString(16).toUpperCase() + " - 0x" + (this.FileOffset + this.FileSize).toString(16).toUpperCase(); }
    public get ContainedSections() { return this._containedSections; }

    constructor(binaryData: Buffer, sections: ELFSectionHeader [])
    {
        // Read the program header information
        this._type = binaryData.readUInt32LE(ELF_SEGMENT_OFFSET.TYPE);
        this._flags = binaryData.readUInt32LE(ELF_SEGMENT_OFFSET.FLAGS);
        this._fileOffset = binaryData.readBigUint64LE(ELF_SEGMENT_OFFSET.FILE_OFFSET);
        this._virtualAddress = binaryData.readBigUint64LE(ELF_SEGMENT_OFFSET.VIRTUAL_ADDRESS);
        this._physicalAddress = binaryData.readBigUint64LE(ELF_SEGMENT_OFFSET.PHYSICAL_ADDRESS);
        this._fileSize = binaryData.readBigUint64LE(ELF_SEGMENT_OFFSET.FILE_SIZE);
        this._memorySize = binaryData.readBigUint64LE(ELF_SEGMENT_OFFSET.MEMORY_SIZE);
        this._alignment = binaryData.readBigUint64LE(ELF_SEGMENT_OFFSET.ALIGNMENT);

        this._containedSections = this.SectionToSegmentMapping(sections);
    }

    // Maps the various ELF sections to the ELF segments
    private SectionToSegmentMapping(sections: ELFSectionHeader []): ELFSectionHeader []
    {
        var containedSections : ELFSectionHeader[];
        containedSections = [];

        // Check which section is within the current ELF segment
        for (var i = 0; i < sections.length; i++)
        {
            if ((sections[i].Offset >= this.FileOffset) && (sections[i].Offset + sections[i].Size <= this.FileOffset + this.MemorySize))
            {
                containedSections.push(sections[i]);
            }
        }

        return containedSections;
    }
}