const path = require('path');
const vscode = require('vscode');

function getReactDistPath(context) {
  return vscode.Uri.joinPath(context.extensionUri, '../my-react-app', 'dist');
}

function getReactHtmlPath(context) {
  return vscode.Uri.joinPath(getReactDistPath(context), 'index.html');
}

module.exports = { getReactDistPath, getReactHtmlPath };