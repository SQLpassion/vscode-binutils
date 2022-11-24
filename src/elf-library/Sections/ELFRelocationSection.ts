/* eslint-disable @typescript-eslint/naming-convention */

import { TreeItemCollapsibleState } from "vscode";
import { DataItem } from "../../ELFTreeViewDataProvider";
import { ELFSectionHeader } from "../ELFSectionHeader";
import { ELF_RELOCATION_AARCH64_TYPE, OBJECT_TYPE } from "../Enums";
import { ELFRelocationEntry } from "./ELFRelocationEntry";
import { ELFSymbolTableSection } from "./ELFSymbolTableSection";
import { IELFSection } from "./IELFSection";

// The length of a Relocation entry
const RELOCATION_ENTRY_LENGTH = 24;

export class ELFRelocationSection implements IELFSection
{
    // Contains the binary section data
    private _binarySectionData: Buffer;
    private _elfSectionHeader: ELFSectionHeader;
    private _relocationEntries : ELFRelocationEntry[];

    public get RelocationEntries() { return this._relocationEntries; }
    public get ELFSectionHeader() { return this._elfSectionHeader; }

    constructor(elfSectionHeader: ELFSectionHeader, binarySectionData: Buffer)
    {
        this._elfSectionHeader = elfSectionHeader;
        this._relocationEntries = [];
        this._binarySectionData = binarySectionData;
        var relocationCount = binarySectionData.length / RELOCATION_ENTRY_LENGTH;
        var currentOffset = 0;

        // Add each found Relocation entry
        for (var i = 0; i < relocationCount; i++)
        {
            this._relocationEntries.push(new ELFRelocationEntry(this, binarySectionData.subarray(currentOffset, currentOffset + RELOCATION_ENTRY_LENGTH)));
            currentOffset += RELOCATION_ENTRY_LENGTH;
        }
    }

    // Returns the raw binary hex content for the ELF section
    public ReturnUIContent(): DataItem []
    {
        var content : DataItem[];
        content = [];

        // Iterate through each Relocation entry
        for (var i = 0; i < this._relocationEntries.length; i++)
        {
            var symbolSection = this._elfSectionHeader.ELFFile.SectionHeaders[this._elfSectionHeader.Link - 1].Section as ELFSymbolTableSection;
            var name = symbolSection.Symbols[this._relocationEntries[i].Symbol].Name;

            if (this._elfSectionHeader.ELFFile.ObjectType === OBJECT_TYPE.RELOCATABLE)
            {
                name = symbolSection.Symbols[this._relocationEntries[i].Symbol].SectionName;
            }

            var relocationEntry = new DataItem(name + " (" + this._relocationEntries[i].Type + ")", TreeItemCollapsibleState.Collapsed, "binarydata.png"); 

            relocationEntry.children = [];
            relocationEntry.children.push(new DataItem("Offset: 0x" + this._relocationEntries[i].Offset.toString(16).toUpperCase(), TreeItemCollapsibleState.None, "binarydata.png"));
            relocationEntry.children.push(new DataItem("Addend: 0x" + this._relocationEntries[i].Addend.toString(16).toUpperCase(), TreeItemCollapsibleState.None, "binarydata.png"));

            content.push(relocationEntry);
        }

        return content;
    }

    // Returns the raw binary content from the ELF Section
    public ReturnRawBinaryContent(): Buffer
    {
       return this._binarySectionData;
    }
}