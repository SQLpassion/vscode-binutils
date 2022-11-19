/* eslint-disable @typescript-eslint/naming-convention */

import { isBooleanObject } from "util/types";
import { TreeItemCollapsibleState } from "vscode";
import { DataItem } from "../../ELFTreeViewDataProvider";
import { IELFSection } from "./IELFSection";

// The ELFDefaultSection class just returns the hexadecimal representation
// of the binary section content.
// No further post-processing of the section data is done.
export class ELFDefaultSection implements IELFSection
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
        var hexContent : string;
        content = [];
        hexContent = "";

        // Convert the raw binary content to hex values
        for (var i = 0; i < this._binarySectionData.length; i++)
        {
            // Convert the current byte to its hex value
            var hexValue = this._binarySectionData.readUInt8(i).toString(16);
            
            // Add a leading zero value, if needed
            if ((hexValue.length) === 1)
            {
                hexValue = "0" + hexValue;
            }

            hexContent += hexValue;
        }

        // The outer loop splits the hex values into lines of 16 hex values
        for (var i = 0, charsLength = hexContent.length; i < charsLength; i += 32)
        {
            var currentHexLine = hexContent.substring(i, i + 32);
            var finalHexLine = "";

            // The inner loop adds a space after every 2 hex values
            for (var j = 0, charsLength1 = currentHexLine.length; j < charsLength1; j += 2)
            {
                var hex = currentHexLine.substring(j, j + 2);
                finalHexLine += hex + " ";
            }

            // Add the formatted hex line string to the output
            content.push(new DataItem(finalHexLine.toUpperCase(), TreeItemCollapsibleState.None, "binarydata.png"));
        }

        // Return the whole output
        return content;
    }

     // Returns the raw binary content from the ELF Section
     ReturnRawBinaryContent(): Buffer
     {
        return this._binarySectionData;
     }
}