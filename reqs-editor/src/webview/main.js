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

/**
 * 주어진 요구사항 리스트를 트리 구조로 변환합니다. 
 * @param {Array<Object>} data - 요구사항 객체 배열 
 * @returns {Array<Object>} 최상위 요구사항들의 배열
 */
function buildHierarchy(data)
{
    const map = new Map();
    const roots = [];

    data.forEach (item => {
        map.set(item.id, {...item, children: []});
    });

    data.forEach(item => {
        if(item.parent_id)
        {
            const parent = map.get(item.parent_id);
            if(parent)
            {
                parent.children.push(map.get(item.id));
            }
            else
            {
                roots.push(map.get(item.id)); 
            }
        }
    });

    return roots;
}