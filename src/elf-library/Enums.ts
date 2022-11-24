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
    SIZE =              32,
    LINK =              40,
    INFO =              44
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

/***********************/
/*   SYMBOL TABLE      */
/***********************/

// Constants needed for parsing an ELF Symbol
export enum ELF_SYMBOL_TABLE_OFFSET
{
    NAME =                  0,
    INFO =                  4,
    OTHER =                 5,
    SECTION_TABLE_INDEX =   6,
    VALUE =                 8,
    SIZE =                  16
}

// The various Symbol Types
export enum ELF_SYMBOL_TYPE
{
    NOTYPE =    0,
    OBJECT =    1,
    FUNC =      2,
    SECTION =   3,
    FILE =      4,
    COMMON =    5,
    TLS =       6,
    NUM =       7,
    GNU_IFUNC = 10,
    HIOS =      12,
    LOPROC =    13,
    HIPROC =    15
}

// The various Symbol Bindings
export enum ELF_SYMBOL_BINDING
{
    LOCAL =         0,
    GLOBAL =        1,
    WEAK =          2,
    NUM =           3,
    GNU_UNIQUE =    10,
    HIOS =          12,
    LOPROC =        13,
    HIPROC =        15
}

// The various Symbol visibility options
export enum ELF_SYMBOL_VISIBILITY
{
    DEFAULT =   0,
    INTERNAL =  1,
    HIDDEN =    2,
    PROTECTED = 3
}

/***********************/
/*   RELOCATIONS       */
/***********************/

// Constants needed for parsing an ELF Relocation entry
export enum ELF_RELOCATION_ENTRY_OFFSET
{
    OFFSET =    0,
    INFO =      8,
    ADDEND =    16
}

// The various Relocaton entries for the AARCH64 architecture
export enum ELF_RELOCATION_AARCH64_TYPE
{
    R_AARCH64_NONE =                            0,

    /* ILP32 AArch64 relocations */
    R_AARCH64_P32_ABS32 =                       1,
    R_AARCH64_P32_COPY =                        180,
    R_AARCH64_P32_GLOB_DAT =                    181,
    R_AARCH64_P32_JUMP_SLOT =                   182,
    R_AARCH64_P32_RELATIVE =                    183,
    R_AARCH64_P32_TLS_DTPMOD =                  184,
    R_AARCH64_P32_TLS_DTPREL =                  185,
    R_AARCH64_P32_TLS_TPREL =                   186,
    R_AARCH64_P32_TLSDESC =                     187,
    R_AARCH64_P32_IRELATIVE =                   188,

    /* LP64 AArch64 relocations  */
    R_AARCH64_ABS64 =                           257,
    R_AARCH64_ABS32 =                           258,
    R_AARCH64_ABS16 =                           259,
    R_AARCH64_PREL64 =                          260,
    R_AARCH64_PREL32 =                          261,
    R_AARCH64_PREL16 =                          262,
    R_AARCH64_MOVW_UABS_G0 =                    263,
    R_AARCH64_MOVW_UABS_G0_NC =                 264,
    R_AARCH64_MOVW_UABS_G1 =                    265,
    R_AARCH64_MOVW_UABS_G1_NC =                 266,
    R_AARCH64_MOVW_UABS_G2 =                    267,
    R_AARCH64_MOVW_UABS_G2_NC =                 268,
    R_AARCH64_MOVW_UABS_G3 =                    269,
    R_AARCH64_MOVW_SABS_G0 =                    270,
    R_AARCH64_MOVW_SABS_G1 =                    271,
    R_AARCH64_MOVW_SABS_G2 =                    272,
    R_AARCH64_LD_PREL_LO19 =                    273,
    R_AARCH64_ADR_PREL_LO21 =                   274,
    R_AARCH64_ADR_PREL_PG_HI21 =                275,
    R_AARCH64_ADR_PREL_PG_HI21_NC =             276,
    R_AARCH64_ADD_ABS_LO12_NC =                 277,
    R_AARCH64_LDST8_ABS_LO12_NC =               278,
    R_AARCH64_TSTBR14 =                         279,
    R_AARCH64_CONDBR19 =                        280,
    R_AARCH64_JUMP26 =                          282,
    R_AARCH64_CALL26 =                          283,
    R_AARCH64_LDST16_ABS_LO12_NC =              284,
    R_AARCH64_LDST32_ABS_LO12_NC =              285,
    R_AARCH64_LDST64_ABS_LO12_NC =              286,
    R_AARCH64_MOVW_PREL_G0 =                    287,
    R_AARCH64_MOVW_PREL_G0_NC =                 288,
    R_AARCH64_MOVW_PREL_G1 =                    289,
    R_AARCH64_MOVW_PREL_G1_NC =                 290,
    R_AARCH64_MOVW_PREL_G2 =                    291,
    R_AARCH64_MOVW_PREL_G2_NC =                 292,
    R_AARCH64_MOVW_PREL_G3 =                    293,
    R_AARCH64_LDST128_ABS_LO12_NC =             299,
    R_AARCH64_MOVW_GOTOFF_G0 =                  300,
    R_AARCH64_MOVW_GOTOFF_G0_NC =               301,
    R_AARCH64_MOVW_GOTOFF_G1 =                  302,
    R_AARCH64_MOVW_GOTOFF_G1_NC =               303,
    R_AARCH64_MOVW_GOTOFF_G2 =                  304,
    R_AARCH64_MOVW_GOTOFF_G2_NC =               305,
    R_AARCH64_MOVW_GOTOFF_G3 =                  306,
    R_AARCH64_GOTREL64 =                        307,
    R_AARCH64_GOTREL32 =                        308,
    R_AARCH64_GOT_LD_PREL19 =                   309,
    R_AARCH64_LD64_GOTOFF_LO15 =                310,
    R_AARCH64_ADR_GOT_PAGE =                    311,
    R_AARCH64_LD64_GOT_LO12_NC =                312,
    R_AARCH64_LD64_GOTPAGE_LO15 =               313,
    R_AARCH64_TLSGD_ADR_PREL21 =                512,
    R_AARCH64_TLSGD_ADR_PAGE21 =                513,
    R_AARCH64_TLSGD_ADD_LO12_NC =               514,
    R_AARCH64_TLSGD_MOVW_G1 =                   515,
    R_AARCH64_TLSGD_MOVW_G0_NC =                516,
    R_AARCH64_TLSLD_ADR_PREL21 =                517,
    R_AARCH64_TLSLD_ADR_PAGE21 =                518,
    R_AARCH64_TLSLD_ADD_LO12_NC =               519,
    R_AARCH64_TLSLD_MOVW_G1 =                   520,
    R_AARCH64_TLSLD_MOVW_G0_NC =                521,
    R_AARCH64_TLSLD_LD_PREL19 =                 522,
    R_AARCH64_TLSLD_MOVW_DTPREL_G2 =            523,
    R_AARCH64_TLSLD_MOVW_DTPREL_G1 =            524,
    R_AARCH64_TLSLD_MOVW_DTPREL_G1_NC =         525,
    R_AARCH64_TLSLD_MOVW_DTPREL_G0 =            526,
    R_AARCH64_TLSLD_MOVW_DTPREL_G0_NC =         527,
    R_AARCH64_TLSLD_ADD_DTPREL_HI12 =           528,
    R_AARCH64_TLSLD_ADD_DTPREL_LO12 =           529,
    R_AARCH64_TLSLD_ADD_DTPREL_LO12_NC =        530,
    R_AARCH64_TLSLD_LDST8_DTPREL_LO12 =         531,
    R_AARCH64_TLSLD_LDST8_DTPREL_LO12_NC =      532,
    R_AARCH64_TLSLD_LDST16_DTPREL_LO12 =        533,
    R_AARCH64_TLSLD_LDST16_DTPREL_LO12_NC =     534,
    R_AARCH64_TLSLD_LDST32_DTPREL_LO12 =        535,
    R_AARCH64_TLSLD_LDST32_DTPREL_LO12_NC =     536,
    R_AARCH64_TLSLD_LDST64_DTPREL_LO12 =        537,
    R_AARCH64_TLSLD_LDST64_DTPREL_LO12_NC =     538,
    R_AARCH64_TLSIE_MOVW_GOTTPREL_G1 =          539,
    R_AARCH64_TLSIE_MOVW_GOTTPREL_G0_NC =       540,
    R_AARCH64_TLSIE_ADR_GOTTPREL_PAGE21 =       541,
    R_AARCH64_TLSIE_LD64_GOTTPREL_LO12_NC =     542,
    R_AARCH64_TLSIE_LD_GOTTPREL_PREL19 =        543,
    R_AARCH64_TLSLE_MOVW_TPREL_G2 =             544,
    R_AARCH64_TLSLE_MOVW_TPREL_G1 =             545,
    R_AARCH64_TLSLE_MOVW_TPREL_G1_NC =          546,
    R_AARCH64_TLSLE_MOVW_TPREL_G0 =             547,
    R_AARCH64_TLSLE_MOVW_TPREL_G0_NC =          548,
    R_AARCH64_TLSLE_ADD_TPREL_HI12 =            549,
    R_AARCH64_TLSLE_ADD_TPREL_LO12 =            550,
    R_AARCH64_TLSLE_ADD_TPREL_LO12_NC =         551,
    R_AARCH64_TLSLE_LDST8_TPREL_LO12 =          552,
    R_AARCH64_TLSLE_LDST8_TPREL_LO12_NC =       553,
    R_AARCH64_TLSLE_LDST16_TPREL_LO12 =         554,
    R_AARCH64_TLSLE_LDST16_TPREL_LO12_NC =      555,
    R_AARCH64_TLSLE_LDST32_TPREL_LO12 =         556,
    R_AARCH64_TLSLE_LDST32_TPREL_LO12_NC =      557,
    R_AARCH64_TLSLE_LDST64_TPREL_LO12 =         558,
    R_AARCH64_TLSLE_LDST64_TPREL_LO12_NC =      559,
    R_AARCH64_TLSDESC_LD_PREL19 =               560,
    R_AARCH64_TLSDESC_ADR_PREL21 =              561,
    R_AARCH64_TLSDESC_ADR_PAGE21 =              562,
    R_AARCH64_TLSDESC_LD64_LO12 =               563,
    R_AARCH64_TLSDESC_ADD_LO12 =                564,
    R_AARCH64_TLSDESC_OFF_G1 =                  565,
    R_AARCH64_TLSDESC_OFF_G0_NC =               566,
    R_AARCH64_TLSDESC_LDR =                     567,
    R_AARCH64_TLSDESC_ADD =                     568,
    R_AARCH64_TLSDESC_CALL =                    569,
    R_AARCH64_TLSLE_LDST128_TPREL_LO12 =        570,
    R_AARCH64_TLSLE_LDST128_TPREL_LO12_NC =     571,
    R_AARCH64_TLSLD_LDST128_DTPREL_LO12 =       572,
    R_AARCH64_TLSLD_LDST128_DTPREL_LO12_NC  =   573,
    R_AARCH64_COPY =                            1024,
    R_AARCH64_GLOB_DAT =                        1025,
    R_AARCH64_JUMP_SLOT =                       1026,
    R_AARCH64_RELATIVE =                        1027,
    R_AARCH64_TLS_DTPMOD =                      1028,
    R_AARCH64_TLS_DTPREL =                      1029,
    R_AARCH64_TLS_TPREL =                       1030,
    R_AARCH64_TLSDESC =                         1031,
    R_AARCH64_IRELATIVE =                       1032
}

// The various Relocaton entries for the x86_64 architecture
export enum ELF_RELOCATION_X86_64_TYPE
{
    R_X86_64_NONE =             0,
    R_X86_64_64 =               1,
    R_X86_64_PC32 =             2,
    R_X86_64_GOT32 =            3,
    R_X86_64_PLT32 =            4,
    R_X86_64_COPY =             5,
    R_X86_64_GLOB_DAT =         6,
    R_X86_64_JUMP_SLOT =        7,
    R_X86_64_RELATIVE =         8,
    R_X86_64_GOTPCREL =         9,
    R_X86_64_32 =               10,
    R_X86_64_32S =              11,
    R_X86_64_16 =               12,
    R_X86_64_PC16 =             13,
    R_X86_64_8 =                14,
    R_X86_64_PC8 =              15,
    R_X86_64_DTPMOD64 =         16,
    R_X86_64_DTPOFF64 =         17,
    R_X86_64_TPOFF64 =          18,
    R_X86_64_TLSGD =            19,
    R_X86_64_TLSLD =            20,
    R_X86_64_DTPOFF32 =         21,
    R_X86_64_GOTTPOFF =         22,
    R_X86_64_TPOFF32 =          23,
    R_X86_64_PC64 =             24,
    R_X86_64_GOTOFF64 =         25,
    R_X86_64_GOTPC32 =          26,
    R_X86_64_GOT64 =            27,
    R_X86_64_GOTPCREL64 =       28,
    R_X86_64_GOTPC64 =          29,
    R_X86_64_GOTPLT64 =         30,
    R_X86_64_PLTOFF64 =         31,
    R_X86_64_SIZE32 =           32,
    R_X86_64_SIZE64 =           33,
    R_X86_64_GOTPC32_TLSDESC =  34,
    R_X86_64_TLSDESC_CALL =     35,
    R_X86_64_TLSDESC =          36,
    R_X86_64_IRELATIVE =        37,
    R_X86_64_RELATIVE64 =       38,
    R_X86_64_GOTPCRELX =        41,
    R_X86_64_REX_GOTPCRELX =    42,
    R_X86_64_NUM =              43
}