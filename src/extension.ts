// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {ELFTreeViewDataProvider} from './ELFTreeViewDataProvider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-binutils" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-binutils.BinaryFileViewer', () =>
	{
		// The code you place here will be executed every time your command is executed
		const options: vscode.OpenDialogOptions = {
			canSelectMany: false,
			openLabel: 'Select',
			canSelectFiles: true,
			canSelectFolders: false
		};
		
		// Select the binary file to be openend
		vscode.window.showOpenDialog(options).then(fileUri =>
		{
		   if (fileUri && fileUri[0])
		   {
			   vscode.window.registerTreeDataProvider("elfBinaryViewer", new ELFTreeViewDataProvider(fileUri[0].fsPath));
		   }
	   });
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate()
{
}