/* eslint-disable @typescript-eslint/naming-convention */

import { TreeItemCollapsibleState } from "vscode";
import { DataItem } from "../../ELFTreeViewDataProvider";
import { ELFSectionHeader } from "../ELFSectionHeader";
import { ELFSymbol } from "./ELFSymbol";
import { IELFSection } from "./IELFSection";
import { ELF_SYMBOL_TYPE, ELF_SYMBOL_BINDING, ELF_SYMBOL_VISIBILITY } from "../Enums";

// The length of a Symbol entry
const SYMBOL_ENTRY_LENGTH = 24;

export class ELFSymbolTableSection implements IELFSection
{
    private _symbols : ELFSymbol[];
    private _binarySectionData: Buffer;
    private _elfSectionHeader: ELFSectionHeader;

    public get Symbols() { return this._symbols; }
    public get SectionHeader() { return this._elfSectionHeader; }

    constructor(elfSectionHeader: ELFSectionHeader, binarySectionData: Buffer)
    {
        this._elfSectionHeader = elfSectionHeader;
        this._symbols = [];
        this._binarySectionData = binarySectionData;
        var symbolCount = binarySectionData.length / SYMBOL_ENTRY_LENGTH;
        var currentOffset = 0;

        // Add each found symbol to the Symbol Table
        for (var i = 0; i < symbolCount; i++)
        {
            this._symbols.push(new ELFSymbol(binarySectionData.subarray(currentOffset, currentOffset + SYMBOL_ENTRY_LENGTH), this));
            currentOffset += SYMBOL_ENTRY_LENGTH;
        }
    }

    // Returns all the entries in the Symbol section
    public ReturnUIContent(): DataItem []
    {
        return this.GetSymbolsForSection("");
    }

    // Returns the raw binary content from the ELF Section
    public ReturnRawBinaryContent(): Buffer
    {
       return this._binarySectionData;
    }

    // Returns the Symbols for the given Section name
    public GetSymbolsForSection(sectionName: string): DataItem []
    {
        var content : DataItem[];
        content = [];

        // Iterate through each symbol
        for (var i = 0; i < this._symbols.length; i++)
        {
            var symbol = new DataItem(i.toString() + ": " + this._symbols[i].Name + " (" + ELF_SYMBOL_TYPE[this._symbols[i].Type] + ")", TreeItemCollapsibleState.Collapsed, "binarydata.png");
            symbol.children = [];

            symbol.children.push(new DataItem("Value: 0x" + this._symbols[i].Value.toString(16).toUpperCase(), TreeItemCollapsibleState.None, "binarydata.png"));
            symbol.children.push(new DataItem("Size: " + this._symbols[i].Size.toString(), TreeItemCollapsibleState.None, "binarydata.png"));
            symbol.children.push(new DataItem("Binding: " + ELF_SYMBOL_BINDING[this._symbols[i].Binding], TreeItemCollapsibleState.None, "binarydata.png"));
            symbol.children.push(new DataItem("Section: " + this._symbols[i].SectionName, TreeItemCollapsibleState.None, "binarydata.png"));
            symbol.children.push(new DataItem("Visibility: " + ELF_SYMBOL_VISIBILITY[this._symbols[i].Visibility], TreeItemCollapsibleState.None, "binarydata.png"));

            // When a Section name wasn't supplied, 
            if (sectionName === "")
            {
                // ... we return all symbols
                content.push(symbol);
            }
            // If a Section name was supplied,
            else if (this._symbols[i].SectionName === sectionName)
            {
                // ... we only return the symbol if the Section name matches
                content.push(symbol);
            }
        }

        // Return all found Symbols
        return content;
    }
}