import React, { useState, useEffect } from "react";
import RequirementTable from "./RequirementTable";
import "./App.css";

const vscode =
  typeof acquireVsCodeApi === "function"
    ? acquireVsCodeApi()
    : { postMessage: (msg) => console.log("(mock) postMessage", msg) };


function parseMessageData(messageData) {
  try {
    return Array.isArray(messageData)
      ? messageData
      : JSON.parse(messageData);
  } catch (err) {
    console.error("JSON 파싱 실패", err);
    return [];
  }
}


function App() {
  const [data, setData] = useState(undefined); 


  useEffect(() => {
    // ready 메시지 전송
    vscode.postMessage({ type: "ready" });
    console.log("📤 ready 전송됨");

    // VSCode -> React 데이터 수신
    const handleMessage = (event) => {
      console.log("📤 메시지 수신됨");
      const message = event.data;
      if (message.type === "init") {
        const parsed = parseMessageData(message.data);
        setData(parsed);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // 아직 init 데이터 못 받았을 때
  if (data === undefined) return null;

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#1e1e1e",
        boxSizing: "border-box",
      }}
    >
      <div style={{ padding: "16px" }}>
        <RequirementTable data={data} vscode={vscode} />
      </div>
    </div>
  );
}

export default App;
