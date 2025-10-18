// @ts-nocheck
const vscode = acquireVsCodeApi();

window.addEventListener('message', (event) => {
    const message = event.data;
    
    if(message.type == 'init')
    {
        renderTable(message.data);
    }
});
