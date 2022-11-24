/* eslint-disable @typescript-eslint/naming-convention */
import * as fs from 'fs';
import { ELFProgramHeader } from './ELFProgramHeader';
import { ELFSectionHeader } from './ELFSectionHeader';
import { ARCHITECTURE, DATA_ENCODING, ELF_CLASS, ELF_HEADER_OFFSET, OBJECT_TYPE } from "./Enums";
import { ELFSymbolTableSection } from './Sections/ELFSymbolTableSection';

export class ELFFile
{
    // The raw binary data of the ELF file
    private _binaryData: Buffer;

    // ELF header information
    private _magicConstant: string;
    private _class: ELF_CLASS;
    private _dataEncoding: DATA_ENCODING;
    private _version: number;
    private _objectType: OBJECT_TYPE;
    private _architecture: ARCHITECTURE;
    private _numberOfSections: number;
    private _numberOfSegments: number;
    private _entryPoint: bigint;
    private _programHeaderOffset: bigint;
    private _sectionHeaderOffset: bigint;
    private _sectionHeaderSize: number;
    private _programHeaderSize: number;
    private _stringTableSectionIndex: number;
    private _stringTable: string;

    // Public accessors
    public get MagicConstant() { return this._magicConstant; }
    public get Class() { return this._class; }
    public get DataEncoding() { return this._dataEncoding; }
    public get Version() { return this._version; }
    public get ObjectType() { return this._objectType; }
    public get Architecture() { return this._architecture; }
    public get EntryPoint() { return this._entryPoint; }
    public get ProgramHeaderOffset() { return this._programHeaderOffset; }
    public get SectionHeaderOffset() { return this._sectionHeaderOffset; }

    public SectionHeaders: ELFSectionHeader [];
    public Segments: ELFProgramHeader [];

    constructor(fileName: string)
    {
        // Open the ELF binary file
        this._binaryData = fs.readFileSync(fs.openSync(fileName, 'r'));
        this._magicConstant = "";
        this._class = ELF_CLASS.ELF_NONE;
        this._dataEncoding = DATA_ENCODING.LITTLE_ENDIAN;
        this._version = 0;
        this._objectType = OBJECT_TYPE.NONE;
        this._architecture = ARCHITECTURE.NONE;
        this._entryPoint = 0n;
        this._programHeaderOffset = 0n;
        this._sectionHeaderOffset = 0n;
        this._sectionHeaderSize = 0;
        this._programHeaderSize = 0;
        this._numberOfSections = 0;
        this._numberOfSegments = 0;
        this._stringTableSectionIndex = 0;
        this._stringTable = "";

        // Read the ELF Header
        this.ReadELFHeader();

        // Read the Section Header String Table
        this.ReadSectionHeaderStringTable();

        // Read the ELF section headers
        this.SectionHeaders = this.ReadSectionHeaders();

        // Read the ELF program headers
        this.Segments = this.ReadProgramHeaders(this.SectionHeaders);
    }

    // Reads the whole ELF file header
    public ReadELFHeader(): void
    {
        // Check for the ELF magic value
        if ((this._binaryData.readUint8(ELF_HEADER_OFFSET.MAGIC0) === 0x7F) &&
            (this._binaryData.readUint8(ELF_HEADER_OFFSET.MAGIC1) === 0x45) &&
            (this._binaryData.readUint8(ELF_HEADER_OFFSET.MAGIC2) === 0x4C) &&
            (this._binaryData.readUint8(ELF_HEADER_OFFSET.MAGIC3) === 0x46))
        {
            // Read the magic constant
            this._magicConstant = 
            (this._binaryData.readUint8(ELF_HEADER_OFFSET.MAGIC0).toString(16) + " " +
            this._binaryData.readUint8(ELF_HEADER_OFFSET.MAGIC1).toString(16) + " " +
            this._binaryData.readUint8(ELF_HEADER_OFFSET.MAGIC2).toString(16) + " " +
            this._binaryData.readUint8(ELF_HEADER_OFFSET.MAGIC3).toString(16) + " ('" + 
            String.fromCharCode(this._binaryData.readUint8(ELF_HEADER_OFFSET.MAGIC1)) + 
            String.fromCharCode(this._binaryData.readUint8(ELF_HEADER_OFFSET.MAGIC2)) +
            String.fromCharCode(this._binaryData.readUint8(ELF_HEADER_OFFSET.MAGIC3)) + "')").toUpperCase();

            // Read the remaining part of the ELF header
            this._class = this._binaryData.readUint8(ELF_HEADER_OFFSET.CLASS);
            this._dataEncoding = this._binaryData.readUint8(ELF_HEADER_OFFSET.DATA_ENCODING);
            this._version = this._binaryData.readUint8(ELF_HEADER_OFFSET.VERSION);
            this._objectType = this._binaryData.readUint16LE(ELF_HEADER_OFFSET.OBJECT_TYPE);
            this._architecture = this._binaryData.readUint16LE(ELF_HEADER_OFFSET.ARCHITECTURE);
            this._entryPoint = this._binaryData.readBigUint64LE(ELF_HEADER_OFFSET.ENTRY_POINT);
            this._programHeaderOffset = this._binaryData.readBigUint64LE(ELF_HEADER_OFFSET.PROGRAM_HEADER_OFFSET);
            this._sectionHeaderOffset = this._binaryData.readBigUint64LE(ELF_HEADER_OFFSET.SECTION_HEADER_OFFSET);
            this._sectionHeaderSize = this._binaryData.readUint16LE(ELF_HEADER_OFFSET.SECTION_HEADER_SIZE);
            this._programHeaderSize = this._binaryData.readUint16LE(ELF_HEADER_OFFSET.PROGRAM_HEADER_SIZE);
            this._numberOfSegments = this._binaryData.readUint16LE(ELF_HEADER_OFFSET.PROGRAM_HEADER_COUNT);
            this._numberOfSections = this._binaryData.readUint8(ELF_HEADER_OFFSET.SECTION_COUNT);
            this._stringTableSectionIndex = this._binaryData.readUint8(ELF_HEADER_OFFSET.STRING_TABLE_SECTION_INDEX);

            // Check if the ELF file has a supported architecture
            if ((this._architecture !== ARCHITECTURE.AARCH64) && (this.Architecture !== ARCHITECTURE.X86_64))
            {
                throw new Error("Unknown architecture. The following architectures are currently supported: AARCH64, X86_64");
            }
        }
        else
        {
            throw new Error("This is not a valid ELF file.");
        }
    }

    // Reads the string table
    public ReadSectionHeaderStringTable(): void
    {
        // Read the string table data
        var offset = Number(this._sectionHeaderOffset) + Number(this._stringTableSectionIndex) * this._sectionHeaderSize;
        var stringTableSection = new ELFSectionHeader(this, 0, this._binaryData, Number(offset), Number(offset) + this._sectionHeaderSize);
        this._stringTable = this._binaryData.subarray(Number(stringTableSection.Offset), Number(stringTableSection.Offset + stringTableSection.Size)).toString();
    }

    // Reads the various ELF section headers
    public ReadSectionHeaders(): ELFSectionHeader []
    {
        var offset = this._sectionHeaderOffset;
        var sections : ELFSectionHeader[];
        sections = [];
        
        for (var i = 0; i < this._numberOfSections; i++)
        {
            // Create a new ELFSectionHeader object
            var section = new ELFSectionHeader(this, i, this._binaryData, Number(offset), Number(offset) + this._sectionHeaderSize, this._stringTable);
            
            // Skip the NULL section...
            if (section.Name !== "")
            {
                sections.push(section);
            }

            // Move on to the next section header
            offset += BigInt(this._sectionHeaderSize);
        }

        // Decrement the number of sections by 1, because we have skipped the NULL section
        this._numberOfSections--;

        // Return all found sections
        return sections;
    }

    // Reads the various ELF program headers
    public ReadProgramHeaders(Sections: ELFSectionHeader []): ELFProgramHeader []
    {
        var offset = this._programHeaderOffset;
        var segments : ELFProgramHeader [];
        segments = [];

        for (var i = 0; i < this._numberOfSegments; i++)
        {
            // Create a new ELFProgramHeader object
            segments.push(new ELFProgramHeader(this._binaryData.subarray(Number(offset), Number(offset) + this._programHeaderSize), Sections));

            // Move on to the next program header
            offset += BigInt(this._programHeaderSize);
        }

        // Return all found segments
        return segments;
    }

    // Returns the Symbol Table Section
    public GetSymbolTableSection(): ELFSymbolTableSection | undefined
    {
        for (var i = 0; i < this._numberOfSections; i++)
        {
            if (this.SectionHeaders[i].Name === ".symtab")
            {
                return this.SectionHeaders[i].Section as ELFSymbolTableSection;
            }
        }

        // The String Table Section was not found (a stripped binary doesn't have a Symbol section!)
        return undefined;
    }
}