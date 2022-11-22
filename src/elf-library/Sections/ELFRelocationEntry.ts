/* eslint-disable @typescript-eslint/naming-convention */

import { ELF_RELOCATION_AARCH64_TYPE, ELF_RELOCATION_ENTRY_OFFSET } from "../Enums";

export class ELFRelocationEntry
{
    private _offset: bigint;
    private _typeAarch64: ELF_RELOCATION_AARCH64_TYPE;
    private _symbol: number;
    private _addend: bigint;

    public get Offset() { return this._offset; }
    public get Type() { return this._typeAarch64; }
    public get Symbol() { return this._symbol; }
    public get Addend() { return this._addend; }

    constructor(elfBinarySectionData: Buffer)
    {
        this._offset = elfBinarySectionData.readBigUint64LE(ELF_RELOCATION_ENTRY_OFFSET.OFFSET);
        this._typeAarch64 = Number(elfBinarySectionData.readBigUint64LE(ELF_RELOCATION_ENTRY_OFFSET.INFO) & 0xFFFFFFFFn);
        this._symbol = Number(elfBinarySectionData.readBigUint64LE(ELF_RELOCATION_ENTRY_OFFSET.INFO) >> 32n);
        this._addend = elfBinarySectionData.readBigUint64LE(ELF_RELOCATION_ENTRY_OFFSET.ADDEND);
    }
}