import { TreeDataProvider, Event, TreeItem, TreeItemCollapsibleState, ProviderResult } from "vscode";
import { ELFFile } from "./elf-library/ELFFile";
import { ARCHITECTURE, DATA_ENCODING, ELF_CLASS, ELF_SECTION_TYPE, OBJECT_TYPE } from "./elf-library/Enums";
import * as path from 'path';

export class ELFTreeViewDataProvider implements TreeDataProvider<DataItem>
{
    onDidChangeTreeData?: Event<DataItem | null | undefined> | undefined;
    data: DataItem[];

    constructor(fileName: string)
    {
        // Open the ELF binary file provided by the file name parameter
        let elfFile = new ELFFile(fileName);
        this.data = [];
        
        // ELF Header
        let elfHeader = new DataItem("ELF Header", TreeItemCollapsibleState.Expanded, "elfheader.png");
        elfHeader.children = [];
        this.data.push(elfHeader);
        elfHeader.children.push(new DataItem("Magic Constant: " + elfFile.MagicConstant, TreeItemCollapsibleState.None, "binarydata.png"));
        elfHeader.children.push(new DataItem("Version: " + elfFile.Version, TreeItemCollapsibleState.None, "binarydata.png"));
        elfHeader.children.push(new DataItem("Class: " + ELF_CLASS[elfFile.Class], TreeItemCollapsibleState.None, "binarydata.png"));
        elfHeader.children.push(new DataItem("Data Encoding: " + DATA_ENCODING[elfFile.DataEncoding], TreeItemCollapsibleState.None, "binarydata.png"));
        elfHeader.children.push(new DataItem("Object Type: " + OBJECT_TYPE[elfFile.ObjectType], TreeItemCollapsibleState.None, "binarydata.png"));
        elfHeader.children.push(new DataItem("Architecture: " + ARCHITECTURE[elfFile.Architecture], TreeItemCollapsibleState.None, "binarydata.png"));
        elfHeader.children.push(new DataItem("Entry Point: 0x" + elfFile.EntryPoint.toString(16), TreeItemCollapsibleState.None, "binarydata.png"));

        // Sections
        let sections = new DataItem("Sections",  TreeItemCollapsibleState.Collapsed, "sections.png");
        sections.children = [];
        this.data.push(sections);

        // Iterate over the different ELF section headers
        for (var i = 0; i < elfFile.Sections.length; i++)
        {
            let section = new DataItem(elfFile.Sections[i].Name + " (" + ELF_SECTION_TYPE[elfFile.Sections[i].Type] + ")", TreeItemCollapsibleState.Collapsed, "section.png");
            section.children = [];

            // Add all necessary section header properties
            section.children.push(new DataItem("Virtual Address: 0x" + elfFile.Sections[i].VirtualAddress.toString(16).toUpperCase(), TreeItemCollapsibleState.None, "binarydata.png"));
            section.children.push(new DataItem("Offset: 0x" + elfFile.Sections[i].Offset.toString(16).toUpperCase(), TreeItemCollapsibleState.None, "binarydata.png"));
            section.children.push(new DataItem("Size: " + elfFile.Sections[i].Size, TreeItemCollapsibleState.None, "binarydata.png"));
            sections.children.push(section);
        }
    }

    getTreeItem(element: DataItem): TreeItem | Thenable<TreeItem>
    {
        return element;
    }

    getChildren(element?: DataItem | undefined): ProviderResult<DataItem[]>
    {
        if (element === undefined)
        {
            return this.data;
        }

        return element.children;
    }
}

class DataItem extends TreeItem
{
    public children: DataItem[] | undefined;

    constructor(label: string, state: TreeItemCollapsibleState, iconPath: string)
    {
        super(label, state);
        this.children = [];
        this.iconPath = path.resolve(__dirname, '../media/') + "/" + iconPath;
    }
}