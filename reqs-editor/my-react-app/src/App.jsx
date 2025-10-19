import React, { useState, useEffect } from "react";
import RequirementTable from "./components/RequirementTable";
import useWebviewMessaging from "./hooks/useWebviewMessaging.js";
import "./App.css";

const vscode =
  typeof acquireVsCodeApi === "function"
    ? acquireVsCodeApi()
    : { postMessage: (msg) => console.log("(mock) postMessage", msg) };


function App() {
  const {data} = useWebviewMessaging(vscode);

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
