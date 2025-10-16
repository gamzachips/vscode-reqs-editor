const vscode = require('vscode');
const fs = require('fs');

class ReqsEditorProvider
{
	constructor(context)
  {
		this.context = context;
	}

  resolveCustomTextEditor(document, webviewPanel, _token) 
  {
    webviewPanel.webview.options = { enableScripts: true };

    //parsing the file
    const text = document.getText();
    let data = [];
    try
    {
      data = JSON.parse(text);
    }
    catch(err)
    {
      console.error("JSON 파싱 오류:", err);
    }

    //to webview
    webviewPanel.webview.html = this.getHtml(webviewPanel);
    webviewPanel.webview.postMessage({ type:'init', data });

    //from webview
    webviewPanel.webview.onDidReceiveMessage((message)=>{
      switch (message.type)
      {
        case 'hello':
          vscode.window.showInformationMessage(message.text);
          break;
      }
    });
  }


    getHtml(webviewPanel){
      const htmlPath = vscode.Uri.joinPath(this.context.extensionUri, 'src', 'webview', 'index.html');
      
      let html = fs.readFileSync(htmlPath.fsPath, 'utf8');

      const scriptUri = webviewPanel.webview.asWebviewUri(
        vscode.Uri.joinPath(this.context.extensionUri, 'src', 'webview', 'main.js')
      );
      html = html.replace('{{mainScript}}', scriptUri.toString());

      return html;
    }

}


module.exports = { ReqsEditorProvider };