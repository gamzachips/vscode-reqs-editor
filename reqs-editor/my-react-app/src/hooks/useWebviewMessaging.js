import { useState, useEffect } from "react";

/**
 * VSCode Webview와 메시지 통신을 담당하는 커스텀 훅
 * - ready 신호 전송
 * - init 데이터 수신
 * - vscode.postMessage 객체 제공
 */
export default function useWebviewMessaging(vscode) {
  const [data, setData] = useState(undefined);

  // JSON 파싱 보조 함수
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

  // 메시지 리스너 등록
  useEffect(() => {
    const handleMessage = (event) => {
      const message = event.data;

      if (message.type === "init"  && data === undefined) {
        const parsed = parseMessageData(message.data);
        setData(parsed);
      }
    };

    window.addEventListener("message", handleMessage);
    vscode.postMessage({ type: "ready" });

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return { data, setData };
}
