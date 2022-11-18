/* eslint-disable @typescript-eslint/naming-convention */

/***********************/
/*    ELF HEADER       */
/***********************/

// Constants needed for parsing the ELF header
export enum ELF_HEADER_OFFSET
{
    MAGIC0 =                        0,
    MAGIC1 =                        1,
    MAGIC2 =                        2,
    MAGIC3 =                        3,
    CLASS =                         4,
    DATA_ENCODING =                 5,
    VERSION =                       6,
    OBJECT_TYPE =                   16,
    ARCHITECTURE =                  18,
    ENTRY_POINT =                   24,
    PROGRAM_HEADER_OFFSET =         32,
    SECTION_HEADER_OFFSET =         40,
    PROGRAM_HEADER_SIZE =           54,
    PROGRAM_HEADER_COUNT =          56,
    SECTION_HEADER_SIZE =           58,
    SECTION_COUNT =                 60,
    STRING_TABLE_SECTION_INDEX =    62
}

// The various ELF classes
export enum ELF_CLASS
{
    ELF_NONE =  0,
    ELF_32 =    1,
    ELF_64 =    2
}

// The various data encodings
export enum DATA_ENCODING
{
    LITTLE_ENDIAN = 1,
    BIG_ENDIAN =    2
}

// The various object types
export enum OBJECT_TYPE
{
    NONE =          0,
    RELOCATABLE =   1,
    EXECUTABLE =    2,
    SHARED_OBJECT = 3,
    CORE =          4
}

// The various architecture types
export enum ARCHITECTURE
{
    NONE =      0,
    I386 =      3,
    X86_64 =    62,
    AARCH64 =   183,
}

/***********************/
/*    SECTION HEADER   */
/***********************/

// Constants needed for parsing the ELF section headers
export enum ELF_SECTION_OFFSET
{
    NAME =              0,
    TYPE =              4,
    FLAGS =             8,
    VIRTUAL_ADDRESS =   16,
    OFFSET =            24,
    SIZE =              32
}

// The various section header types
export enum ELF_SECTION_TYPE
{
    NULL =                          0,
    PROGRAM_DATA =                  1,
    SYMBOL_TABLE =                  2,
    STRING_TABLE =                  3,
    RELOCATION_ENTRIES =            4,
    HASH_TABLE =                    5,
    DYNAMIC_LINKING =               6,
    NOTES =                         7,
    BSS =                           8,
    RELOCATION_ENTRIES_NO_ADDENDS = 9,
    RESERVED =                      10,
    DYNAMIC_LINKER_SYMBOL_TABLE =   11,
    INIT_ARRAY =                    14,
    FINI_ARRAY =                    15,
    PREINIT_ARRAY =                 16,
    SECTION_GROUP =                 17,
    EXTENDED_SECTION_INDEXES =      18,
    NUM =                           19,
    LOOS =                          0x60000000,
    GNU_ATTRIBUTES =                0x6ffffff5,
    GNU_HASH =                      0x6ffffff6,
    GNU_LIBLIST	=                   0x6ffffff7,
    CHECKSUM =                      0x6ffffff8,
    LOSUNW =                        0x6ffffffa,
    SUNW_MOVE =                     0x6ffffffa,
    SUNW_COMDAT =                   0x6ffffffb,
    SUNW_SYMINFO =                  0x6ffffffc,
    GNU_VERDEF =                    0x6ffffffd,
    GNU_VERNEED	=                   0x6ffffffe,
    GNU_VERSYM =                    0x6fffffff,
    HISUNW =                        0x6fffffff,
    HIOS =                          0x6fffffff,
    LOPROC =                        0x70000000,
    HIPROC =                        0x7fffffff,
    LOUSER =                        0x80000000,
    HIUSER =                        0x8fffffff
}

// The various section flags
export enum ELF_SECTION_FLAGS
{
    WRITABLE =          0,
    ALLOCATABLE =       1,
    EXECUTABLE =        2,
    MERGABLE =          4,
    STRING =            5,
    INFO_LINK =         6,
    LINK_ORDER =        7,
    OS_NONCONFORMING =  8,
    GROUP =             9,
    TLS =               10
}

/***********************/
/*    PROGRAM HEADER   */
/***********************/

// The various program header types
export enum ELF_SEGMENT_TYPE
{
    NULL =          0,
    LOAD =          1,
    DYNAMIC =       2,
    PT_INTERPETER = 3,
    NOTE =          4,
    SHLIB =         5,
    PHDR =          6,
    TLS =           7,
    NUM =           8,
    LOOS =          0x60000000,
    GNU_EH_FRAME =  0x6474e550,
    GNU_STACK =     0x6474e551,
    GNU_RELRO =     0x6474e552,
    LOSUNW =        0x6ffffffa,
    SUNWBSS =       0x6ffffffa,
    SUNWSTACK =     0x6ffffffb,
    HISUNW =        0x6fffffff,
    HIOS =          0x6fffffff,
    LOPROC =        0x70000000,
    HIPROC =        0x7fffffff
}

// Constants needed for parsing the ELF program headers
export enum ELF_SEGMENT_OFFSET
{
    TYPE =              0,
    FLAGS =             4,
    FILE_OFFSET =       8,
    VIRTUAL_ADDRESS =   16,
    PHYSICAL_ADDRESS =  24,
    FILE_SIZE =         32,
    MEMORY_SIZE =       40,
    ALIGNMENT =         48
}

// The various segment flags
export enum ELF_SEGMENT_FLAGS
{
    EXECUTABLE =    0,
    WRITABLE =      1,
    READABLE =      2
}