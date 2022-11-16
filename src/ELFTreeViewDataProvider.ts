import { TreeDataProvider, Event, TreeItem, TreeItemCollapsibleState, ProviderResult } from "vscode";
import { ELFFile} from "./elf-library/ELFFile";
import * as path from 'path';

export class ELFTreeViewDataProvider implements TreeDataProvider<DataItem>
{
    onDidChangeTreeData?: Event<DataItem | null | undefined> | undefined;
    data: DataItem[];

    constructor(fileName: string)
    {
        this.data = [];
        
        // Open the ELF binary file provided by the file name parameter
        let elfFile = new ELFFile(fileName);
        console.log(elfFile);

        // ELF Header
        let elfHeader = new DataItem("ELF Header", TreeItemCollapsibleState.Expanded, "elfheader.png");
        elfHeader.children = [];
        this.data.push(elfHeader);
        elfHeader.children.push(new DataItem("Magic Constant: " + elfFile.MagicConstant, TreeItemCollapsibleState.None, "binarydata.png"));

        // Sections
        let sections = new DataItem("Sections",  TreeItemCollapsibleState.Expanded, "sections.png");
        sections.children = [];
        this.data.push(sections);

        // Iterate over the different ELF sections
        for (var i = 0; i < elfFile.NumberOfSections; i++)
        {
            let section = new DataItem("Section " + i.toString(), TreeItemCollapsibleState.Collapsed, "section.png");
            section.children = [];

            for (var j = 0; j < 5; j++)
            {
                let property = new DataItem("Property "+ j.toString(), TreeItemCollapsibleState.None, "binarydata.png");
                section.children[j] = property;
            }

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