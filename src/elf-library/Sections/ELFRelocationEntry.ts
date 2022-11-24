/* eslint-disable @typescript-eslint/naming-convention */

import { ELF_RELOCATION_AARCH64_TYPE, ELF_RELOCATION_X86_64_TYPE, ELF_RELOCATION_ENTRY_OFFSET, ELF_CLASS, ARCHITECTURE } from "../Enums";
import { ELFRelocationSection } from "./ELFRelocationSection";

export class ELFRelocationEntry
{
    private _elfRelocationSection: ELFRelocationSection;
    private _offset: bigint;
    private _typeAarch64: ELF_RELOCATION_AARCH64_TYPE;
    private _typeX86_64: ELF_RELOCATION_X86_64_TYPE;
    private _symbol: number;
    private _addend: bigint;

    public get Offset() { return this._offset; }
    public get Symbol() { return this._symbol; }
    public get Addend() { return this._addend; }
    
    // Returns the type of the Relocation Entry - based on the Architecture type of the ELF file
    public get Type(): string
    {
        switch (this._elfRelocationSection.ELFSectionHeader.ELFFile.Architecture)
        {
            case ARCHITECTURE.AARCH64:
            {
                return ELF_RELOCATION_AARCH64_TYPE[this._typeAarch64];
            }
            case ARCHITECTURE.X86_64:
            {
                return ELF_RELOCATION_X86_64_TYPE[this._typeX86_64];
            }
        }
        
        return "*** UNKNOWN TYPE ***";
    }

    constructor(elfRelocationSection: ELFRelocationSection, elfBinarySectionData: Buffer)
    {
        this._elfRelocationSection = elfRelocationSection;
        this._offset = elfBinarySectionData.readBigUint64LE(ELF_RELOCATION_ENTRY_OFFSET.OFFSET);
        this._typeAarch64 = this._typeX86_64 =  Number(elfBinarySectionData.readBigUint64LE(ELF_RELOCATION_ENTRY_OFFSET.INFO) & 0xFFFFFFFFn);
        this._symbol = Number(elfBinarySectionData.readBigUint64LE(ELF_RELOCATION_ENTRY_OFFSET.INFO) >> 32n);
        this._addend = elfBinarySectionData.readBigUint64LE(ELF_RELOCATION_ENTRY_OFFSET.ADDEND);
    }
}