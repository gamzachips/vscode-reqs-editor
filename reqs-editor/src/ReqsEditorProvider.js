class ReqsEditorProvider{
	constructor(context){
		this.context = context;
	}

     resolveCustomTextEditor(document, webviewPanel, _token) {
    webviewPanel.webview.options = { enableScripts: true };
    webviewPanel.webview.html = "<h1>Hello Webview</h1>";
  }
}

module.exports = { ReqsEditorProvider };