import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RequirementTable from "./RequirementTable";

function parseMessageData(messageData)
{
  try{
    return Array.isArray(messageData)
      ? messageData
      : JSON.parse(messageData);
  } catch(err){
    console.error("JSON 파싱 실패", err);
    return [];
  }
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const vscode = acquireVsCodeApi();
    vscode.postMessage({type:'ready'});

    window.addEventListener('message', (event) => {
      const message = event.data;
      if (message.type === 'init') {
        const parsed = parseMessageData(message.data);
        setData(parsed);
      }
    });
  }, []);

  return (
    <div>
      <h2>요구사항 목록</h2>
      <RequirementTable data={data} />
    </div>
  );
}

export default App;

