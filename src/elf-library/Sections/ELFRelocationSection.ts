/* eslint-disable @typescript-eslint/naming-convention */

import { getTextOfJSDocComment } from "typescript";
import { TreeItemCollapsibleState } from "vscode";
import { DataItem } from "../../ELFTreeViewDataProvider";
import { ELFFile } from "../ELFFile";
import { ELF_RELOCATION_AARCH64_TYPE } from "../Enums";
import { ELFDynamicLinkerSymbolTableSection } from "./ELFDynamicLinkerSymbolTableSection";
import { ELFRelocationEntry } from "./ELFRelocationEntry";
import { IELFSection } from "./IELFSection";

// The length of a Relocation entry
const RELOCATION_ENTRY_LENGTH = 24;

export class ELFRelocationSection implements IELFSection
{
    // Contains the binary section data
    private _binarySectionData: Buffer;
    private _elfFile: ELFFile;
    private _relocationEntries : ELFRelocationEntry[];

    public get RelocationEntries() { return this._relocationEntries; }

    constructor(elfFile: ELFFile, binarySectionData: Buffer)
    {
        this._elfFile = elfFile;
        this._relocationEntries = [];
        this._binarySectionData = binarySectionData;
        var relocationCount = binarySectionData.length / RELOCATION_ENTRY_LENGTH;
        var currentOffset = 0;

        // Add each found Relocation entry
        for (var i = 0; i < relocationCount; i++)
        {
            this._relocationEntries.push(new ELFRelocationEntry(binarySectionData.subarray(currentOffset, currentOffset + RELOCATION_ENTRY_LENGTH)));
            currentOffset += RELOCATION_ENTRY_LENGTH;
        }
    }

    // Returns the raw binary hex content for the ELF section
    ReturnUIContent(): DataItem []
    {
        var content : DataItem[];
        content = [];

        var content : DataItem[];
        content = [];

        // Iterate through each Relocation entry
        for (var i = 0; i < this._relocationEntries.length; i++)
        {
            // var symbols = this._elfFile.GetDynamicLinkerSymbolTableSection().Symbols;
            var section = this._elfFile.GetDynamicLinkerSymbolTableSection();
            var relocationEntry: DataItem;

            if (section !== undefined)
            {
                relocationEntry = new DataItem(section.Symbols[this._relocationEntries[i].Symbol].Name + " (" + ELF_RELOCATION_AARCH64_TYPE[this._relocationEntries[i].Type] + ")", TreeItemCollapsibleState.Collapsed, "binarydata.png"); 
            }
            else
            {
                relocationEntry = new DataItem(this._relocationEntries[i].Symbol + " (" + ELF_RELOCATION_AARCH64_TYPE[this._relocationEntries[i].Type] + ")", TreeItemCollapsibleState.Collapsed, "binarydata.png"); 
            }

            relocationEntry.children = [];
            relocationEntry.children.push(new DataItem("Offset: 0x" + this._relocationEntries[i].Offset.toString(16).toUpperCase(), TreeItemCollapsibleState.None, "binarydata.png"));
            relocationEntry.children.push(new DataItem("Addend: 0x" + this._relocationEntries[i].Addend.toString(16).toUpperCase(), TreeItemCollapsibleState.None, "binarydata.png"));

            content.push(relocationEntry);
        }

        return content;
    }

    // Returns the raw binary content from the ELF Section
    ReturnRawBinaryContent(): Buffer
    {
       return this._binarySectionData;
    }
}