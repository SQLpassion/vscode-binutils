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
    AARCH64	=   183,
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
    DYNAMIC_LINKING	=               6,
    NOTES =                         7,
    BSS =                           8,
    RELOCATION_ENTRIES_NO_ADDENDS = 9,
    RESERVED =                      10,
    DYNAMIC_LINKER_SYMBOL_TABLE =   11,
    INIT_ARRAY =                    14,
    FINI_ARRAY =                    15,
    PREINIT_ARRAY =                 16,
    SECTION_GROUP =                 17,
    EXTENDED_SECTION_INDEXES =      18
}