const vscode = require('vscode');
const {ReqsEditorProvider} = require('./ReqsEditorProvider');

function activate(context) {
	context.subscriptions.push(
	vscode.window.registerCustomEditorProvider(
		'reqsEditor',
		new ReqsEditorProvider(context)
	)
	);
}

module.exports = {
	activate
}
