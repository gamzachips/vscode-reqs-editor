const vscode = require('vscode');
const fs = require('fs');
const { getReactHtmlPath, getReactDistPath } = require('./paths');

class ReqsEditorProvider
{
	constructor(context)
  {
		this.context = context;
	}

  resolveCustomTextEditor(document, webviewPanel, _token) 
  {
    webviewPanel.webview.options = { enableScripts: true ,
      localResourceRoots: [
      getReactDistPath(this.context)
      ]
    };

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

    webviewPanel.webview.onDidReceiveMessage((message)=>{
      switch (message.type)
      {
        case 'ready':
          webviewPanel.webview.postMessage({type:'init',data});
          break;
        case 'hello':
          vscode.window.showInformationMessage(message.text);
          break;
      }
    });

    webviewPanel.webview.html = this.getHtml(webviewPanel);
  }


    getHtml(webviewPanel){
      const htmlPath = getReactHtmlPath(this.context);
      let html = fs.readFileSync(htmlPath.fsPath, 'utf8');
      const baseUri = webviewPanel.webview.asWebviewUri(getReactDistPath(this.context));
      html = html.replace(/<head>/, `<head><base href="${baseUri.toString()}/">`);

      return html;
    }

}


module.exports = { ReqsEditorProvider };