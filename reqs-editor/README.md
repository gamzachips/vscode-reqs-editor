
1 프로젝트에 대한 간략한 설명과 스크린샷 

본 확장 프로그램은 VS Code Extension Host (백엔드) 와 Webview (프런트엔드, React) 로 구성되어 있으며,
Extension Host는 Node.js 환경에서 VS Code API를 통해 파일을 읽고 쓰는 역할을 담당하고,
Webview는 React 기반 UI로 요구사항 데이터를 테이블 형태로 렌더링합니다.

양측은 postMessage() 및 onDidReceiveMessage() 메서드를 이용해 양방향 통신을 수행합니다.


본 확장 프로그램은 VS Code의 Custom Editor API를 활용하여,
JSON 형태의 요구사항 파일을 테이블 UI로 시각화하는 기능을 제공합니다.

React 기반 Webview에서 사용자가 데이터를 편집하면
postMessage()를 통해 Extension Host로 변경 사항이 전달되며,
Host 측에서는 Node.js의 fs 모듈을 이용하여 원본 JSON 파일을 즉시 갱신합니다.

반대로 파일이 열릴 때에는, Extension Host가 파일 내용을 읽어
초기 데이터를 Webview로 전달하고, Webview는 이를 상태(useState)로 관리하여 렌더링합니다.

이러한 양방향 구조를 통해 사용자는 VS Code 내부에서
별도의 파일 편집 없이 직관적인 UI 기반 요구사항 관리를 수행할 수 있습니다.



2 설치 및 실행 방법


3 설계한 아키텍처나 핵심 로직 (특히 Webview와 Extension Host간의 데이터 통신 방법 )에 대한 설명 


1️⃣ Webview가 로드되면 useEffect() 내부에서
vscode.postMessage({ type: "ready" }) 메시지를 Extension으로 전송합니다.

2️⃣ Extension Host는 "ready" 메시지를 수신하면
현재 열려 있는 요구사항 파일(JSON)을 읽고,
webview.postMessage({ type: "init", data })로 초기 데이터를 다시 Webview로 전달합니다.

3️⃣ 사용자가 테이블에서 수정 / 추가 / 삭제 작업을 수행하면
React 컴포넌트가 vscode.postMessage({ type: "update-requirements", payload })를 보내고,

4️⃣ Extension Host는 이 메시지를 받아 fs.writeFile()로 실제 파일을 업데이트합니다.


+ 모듈별 설명.