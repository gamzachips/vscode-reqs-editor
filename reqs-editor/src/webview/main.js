// @ts-nocheck
const vscode = acquireVsCodeApi();

window.addEventListener('message', (event) => {
    const message = event.data;
    
    if(message.type == 'init')
    {
        renderTable(message.data);
    }
});

function renderTable(data)
{
    const table = document.createElement('table');
    table.innerHTML = `
        ${data.map(d => `<tr><td>${d.id}</td><td>${d.text}</td><td>${d.status}</td><td>동작</td></tr>`).join('')}
    `;
    document.body.appendChild(table);
}
