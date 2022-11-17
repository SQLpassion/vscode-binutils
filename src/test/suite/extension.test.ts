import * as assert from 'assert';
import * as path from 'path';
import { execPath } from 'process';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { ELFFile } from "../../elf-library/ELFFile";
import { ARCHITECTURE, DATA_ENCODING, ELF_CLASS, OBJECT_TYPE } from "../../elf-library/Enums";

suite('SQLpassion BinUtils Test Suite', () =>
{
	const exampleFiles = path.resolve(__dirname, "../../../example-files/");
	vscode.window.showInformationMessage('Start all tests.');
	
	test('ELF Header Test - EXECUTABLE #1', () =>
	{
		let elfFile = new ELFFile(exampleFiles + "/elf_aarch64");
		assert.equal(elfFile.MagicConstant, "7F 45 4C 46 ('ELF')");
		assert.equal(elfFile.Class, ELF_CLASS.ELF_64);
		assert.equal(elfFile.DataEncoding, DATA_ENCODING.LITTLE_ENDIAN);
		assert.equal(elfFile.Version, 1);
		assert.equal(elfFile.ObjectType, OBJECT_TYPE.EXECUTABLE);
		assert.equal(elfFile.Architecture, ARCHITECTURE.AARCH64);
		assert.equal(elfFile.EntryPoint, 4195840);
		assert.equal(elfFile.ProgramHeaderOffset, 64);
		assert.equal(elfFile.SectionHeaderOffset, 10024);

		assert.equal(elfFile.Sections.length, 34);
	});

	test('ELF Header Test - RELOCATABLE #1', () =>
	{
		let elfFile = new ELFFile(exampleFiles + "/elf_aarch64.o");
		assert.equal(elfFile.MagicConstant, "7F 45 4C 46 ('ELF')");
		assert.equal(elfFile.Class, ELF_CLASS.ELF_64);
		assert.equal(elfFile.DataEncoding, DATA_ENCODING.LITTLE_ENDIAN);
		assert.equal(elfFile.Version, 1);
		assert.equal(elfFile.ObjectType, OBJECT_TYPE.RELOCATABLE);
		assert.equal(elfFile.Architecture, ARCHITECTURE.AARCH64);
		assert.equal(elfFile.EntryPoint, 0);
		assert.equal(elfFile.ProgramHeaderOffset, 0);
		assert.equal(elfFile.SectionHeaderOffset, 1160);

		assert.equal(elfFile.Sections.length, 16);
	});
});