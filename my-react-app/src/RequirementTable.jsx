import React, { useState, useRef, useEffect } from "react";
import styles from "./styles";
import RequirementRow from "./RequirementRow";

function RequirementTable({ data: initialData, vscode }) {
  const [data, setData] = useState(null); // null: 아직 파일 못 받음
  const [expanded, setExpanded] = useState(new Set());
  const nextIdRef = useRef(1);

  /* 파일 내용 도착 시 초기화 */
  useEffect(() => {
    if (Array.isArray(initialData)) {
      setData(initialData);

       const ids = initialData
        .map((d) => {
            if (!d || typeof d.id !== "string") return 0;
            const parts = d.id.split("-");
            const num = parseInt(parts[1], 10);
            return Number.isFinite(num)? num: 0;
        });

        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        nextIdRef.current = maxId + 1;
    }
  }, [initialData]);

  /* 데이터 없으면 아무것도 안 그림 */
  if (data === null) {
    return null;
  }

  /* ID 부여 */

  function generateNewId() {
    return `REQ-${String(nextIdRef.current++).padStart(3, "0")}`;
  }

  function toggleExpand(id) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  /* VSCode로 데이터 업데이트 */
  function handleUpdate(updatedData = data) {
    vscode.postMessage({
      type: "update-requirements",
      payload: updatedData,
    });
  }

  /* 최상위 요구사항 추가 */
  function addRootRequirement() {
    const newItem = {
      id: generateNewId(),
      parentId: null,
      text: "새로운 요구사항을 입력하세요.",
      status: "Draft",
    };

    setData((prev) => {
      const updated = [...prev, newItem];
      handleUpdate(updated);
      return updated;
    });
  }

  /* 행 렌더링 */
  function renderRows(parentId = null, level = 0, visited = new Set()) {
    if (!Array.isArray(data)) return null;

    return data
      .filter((item) => item.parentId === parentId)
      .map((item) => {
        if (visited.has(item.id)) throw new Error(`무한 재귀 감지: ${item.id}`);
        visited.add(item.id);

        const hasChildren = data.some((d) => d.parentId === item.id);
        const isExpanded = expanded.has(item.id);

        return (
          <React.Fragment key={item.id}>
            <RequirementRow
              item={item}
              level={level}
              hasChildren={hasChildren}
              isExpanded={isExpanded}
              toggleExpand={toggleExpand}
              styles={styles}
              onUpdate={handleUpdate}
            />
            {isExpanded && renderRows(item.id, level + 1, visited)}
          </React.Fragment>
        );
      });
  }

  /* ✅ 렌더링 시작 */
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <h2 style={{ color: "#fff", marginBottom: "12px" }}>요구사항 목록</h2>

      <button
        onClick={addRootRequirement}
        style={{
          marginBottom: "8px",
          backgroundColor: "#3a3a3a",
          color: "#fff",
          border: "1px solid #555",
          padding: "6px 12px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        + 최상위 요구사항 추가
      </button>

      {data.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.headerCell, width: "70px" }}>ID</th>
              <th style={{ ...styles.headerCell, width: "300px" }}>내용</th>
              <th style={{ ...styles.headerCell, width: "80px" }}>상태</th>
              <th style={{ ...styles.headerCell, width: "120px" }}>동작</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      )}
    </div>
  );
}

export default RequirementTable;
