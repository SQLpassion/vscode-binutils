/* eslint-disable @typescript-eslint/naming-convention */

import { TreeItemCollapsibleState } from "vscode";
import { DataItem } from "../../ELFTreeViewDataProvider";
import { IELFSection } from "./IELFSection";

export class ELFStringTableSection implements IELFSection
{
    // Contains the binary section data
    private _binarySectionData: Buffer;

    constructor(binarySectionData: Buffer)
    {
        this._binarySectionData = binarySectionData;
    }

    // Returns the raw binary hex content for the ELF section
    ReturnUIContent(): DataItem []
    {
        var content : DataItem[];
        content = [];

        var strings = this._binarySectionData.toString().split("\0");

        for (var i = 0; i < strings.length; i++)
        {
            if (strings[i] !== "")
            {
                content.push(new DataItem(strings[i], TreeItemCollapsibleState.None, "binarydata.png"));
            }
        }

        return content;
    }

    // Returns the raw binary content from the ELF Section
    ReturnRawBinaryContent(): Buffer
    {
       return this._binarySectionData;
    }
}