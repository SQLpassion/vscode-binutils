/* eslint-disable @typescript-eslint/naming-convention */

import { DataItem } from "../../ELFTreeViewDataProvider";

// Defines the common interface for an ELF Section
export interface IELFSection
{
    // Returns the UI content from the ELF Section
    ReturnUIContent(): DataItem [];

    // Returns the raw binary content from the ELF Section
    ReturnRawBinaryContent(): Buffer;
}