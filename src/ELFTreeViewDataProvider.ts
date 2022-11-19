import { TreeDataProvider, Event, TreeItem, TreeItemCollapsibleState, ProviderResult } from "vscode";
import { ELFFile } from "./elf-library/ELFFile";
import { ARCHITECTURE, DATA_ENCODING, ELF_CLASS, ELF_SECTION_TYPE, OBJECT_TYPE, ELF_SEGMENT_TYPE } from "./elf-library/Enums";
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

        // Section
        let sections = new DataItem("Sections (" + elfFile.SectionHeaders.length.toString() + ")",  TreeItemCollapsibleState.Collapsed, "sections.png");
        sections.children = [];
        this.data.push(sections);

        // Iterate over the different ELF section headers
        for (var i = 0; i < elfFile.SectionHeaders.length; i++)
        {
            let sectionHeader = new DataItem(elfFile.SectionHeaders[i].Name + " (" + ELF_SECTION_TYPE[elfFile.SectionHeaders[i].Type] + ")", TreeItemCollapsibleState.Collapsed, "section.png");
            sectionHeader.children = [];

            // Add all necessary section header properties
            sectionHeader.children.push(new DataItem("Virtual Address: 0x" + elfFile.SectionHeaders[i].VirtualAddress.toString(16).toUpperCase(), TreeItemCollapsibleState.None, "binarydata.png"));
            sectionHeader.children.push(new DataItem("File Offset: 0x" + elfFile.SectionHeaders[i].Offset.toString(16).toUpperCase(), TreeItemCollapsibleState.None, "binarydata.png"));
            sectionHeader.children.push(new DataItem("Size: " + elfFile.SectionHeaders[i].Size, TreeItemCollapsibleState.None, "binarydata.png"));
            sections.children.push(sectionHeader);

            // Flags
            let flags = new DataItem("Flags", TreeItemCollapsibleState.Collapsed, "sections.png");
            flags.children = [];
            sectionHeader.children.push(flags);

            // Add all the necessary flag properties
            if (elfFile.SectionHeaders[i].Writable)
                {flags.children.push(new DataItem("Writable (W)", TreeItemCollapsibleState.None, "binarydata.png"));}

            if (elfFile.SectionHeaders[i].Allocatable)
                {flags.children.push(new DataItem("Allocable (A)", TreeItemCollapsibleState.None, "binarydata.png"));}

            if (elfFile.SectionHeaders[i].Executable)
                {flags.children.push(new DataItem("Executable (X)", TreeItemCollapsibleState.None, "binarydata.png"));}

            if (elfFile.SectionHeaders[i].Mergable)
                {flags.children.push(new DataItem("Mergable (M)", TreeItemCollapsibleState.None, "binarydata.png"));}

            if (elfFile.SectionHeaders[i].ContainsStrings)
                {flags.children.push(new DataItem("Contains Strings (S)", TreeItemCollapsibleState.None, "binarydata.png"));}

            if (elfFile.SectionHeaders[i].InfoLink)
                {flags.children.push(new DataItem("Info (I)", TreeItemCollapsibleState.None, "binarydata.png"));}

            if (elfFile.SectionHeaders[i].PreserveLinkOrder)
                {flags.children.push(new DataItem("Preserve Link Order (L)", TreeItemCollapsibleState.None, "binarydata.png"));}

            if (elfFile.SectionHeaders[i].NonConformingOSHandling)
                {flags.children.push(new DataItem("Extra OS processing required (O)", TreeItemCollapsibleState.None, "binarydata.png"));}

            if (elfFile.SectionHeaders[i].GroupMember)
                {flags.children.push(new DataItem("Group Member (G)", TreeItemCollapsibleState.None, "binarydata.png"));}

            if (elfFile.SectionHeaders[i].HoldsThreadLocalData)
                {flags.children.push(new DataItem("Holds Thread-Local Storage (T)", TreeItemCollapsibleState.None, "binarydata.png"));}

            // Content
            var content = new DataItem("Content", TreeItemCollapsibleState.Collapsed, "sections.png");
            content.children = [];
            sectionHeader.children.push(content);

            // Get the Section specific content
            var data: DataItem [] = elfFile.SectionHeaders[i].Section.ReturnUIContent();

            // Add the Section specific content to the TreeView
            for (j = 0; j < data.length; j++)
            {
                content.children.push(data[j]);
            }

            // Symbols
            var symbols = new DataItem("Symbols", TreeItemCollapsibleState.Collapsed, "sections.png");
            symbols.children = [];
            sectionHeader.children.push(symbols);

            // Get the Symbols for the current section
            var symbolItems = elfFile.GetSymbolTableSection().GetSymbolsForSection(elfFile.SectionHeaders[i].Name);

            for (j = 0; j < symbolItems.length; j++)
            {
                symbols.children.push(symbolItems[j]);
            }
        }

        // Segments
        let segments = new DataItem("Segments (" + elfFile.Segments.length.toString() + ")",  TreeItemCollapsibleState.Collapsed, "sections.png");
        segments.children = [];
        this.data.push(segments);

        // Iterate over the different ELF program headers
        for (var i = 0; i < elfFile.Segments.length; i++)
        {
            let segment = new DataItem(ELF_SEGMENT_TYPE[elfFile.Segments[i].Type] + " (" + elfFile.Segments[i].Range + ")", TreeItemCollapsibleState.Collapsed, "section.png");
            segment.children = [];

            segments.children.push(segment);

            // Add all necessary program header properties
            segment.children.push(new DataItem("File Offset: 0x" + elfFile.Segments[i].FileOffset.toString(16).toUpperCase(), TreeItemCollapsibleState.None, "binarydata.png"));
            segment.children.push(new DataItem("Virtual Address: 0x" + elfFile.Segments[i].VirtualAddress.toString(16).toUpperCase(), TreeItemCollapsibleState.None, "binarydata.png"));
            segment.children.push(new DataItem("Physical Address: 0x" + elfFile.Segments[i].PhysialAddress.toString(16).toUpperCase(), TreeItemCollapsibleState.None, "binarydata.png"));
            segment.children.push(new DataItem("Size in File: " + elfFile.Segments[i].FileSize, TreeItemCollapsibleState.None, "binarydata.png"));
            segment.children.push(new DataItem("Size in Memory: " + elfFile.Segments[i].MemorySize, TreeItemCollapsibleState.None, "binarydata.png"));
            segment.children.push(new DataItem("Alignment: 0x" + elfFile.Segments[i].Alignment.toString(16).toUpperCase(), TreeItemCollapsibleState.None, "binarydata.png"));

            // Flags
            let flags = new DataItem("Flags", TreeItemCollapsibleState.Expanded, "sections.png");
            flags.children = [];
            segment.children.push(flags);

            // Add all the necessary flag properties
            if (elfFile.Segments[i].Executable)
                {flags.children.push(new DataItem("Executable (X)", TreeItemCollapsibleState.None, "binarydata.png"));}

            if (elfFile.Segments[i].Writable)
                {flags.children.push(new DataItem("Writable (W)", TreeItemCollapsibleState.None, "binarydata.png"));}

            if (elfFile.Segments[i].Readable)
                {flags.children.push(new DataItem("Readable (R)", TreeItemCollapsibleState.None, "binarydata.png"));}

            // Coontained Sections
            let containedSections = new DataItem("Contained Sections (" + elfFile.Segments[i].ContainedSections.length.toString() + ")", TreeItemCollapsibleState.Collapsed, "sections.png");
            containedSections.children = [];
            segment.children.push(containedSections);

            // Add each contained section
            for (var j = 0; j < elfFile.Segments[i].ContainedSections.length; j++)
            {
                let section = new DataItem(elfFile.Segments[i].ContainedSections[j].Name, TreeItemCollapsibleState.None, "binarydata.png");
                containedSections.children.push(section);
            }
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

export class DataItem extends TreeItem
{
    public children: DataItem[] | undefined;

    constructor(label: string, state: TreeItemCollapsibleState, iconPath: string)
    {
        super(label, state);
        this.children = [];
        this.iconPath = path.resolve(__dirname, '../media/') + "/" + iconPath;
    }
}