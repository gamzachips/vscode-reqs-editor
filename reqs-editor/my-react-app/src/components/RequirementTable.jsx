import React from "react";
import styles from "../styles";
import RequirementRow from "./RequirementRow";
import useRequirements from "../hooks/useRequirements";

function RequirementTable({ data: initialData, vscode }) {
  const {
    data,
    expanded,
    MAX_DEPTH,
    toggleExpand,
    addRootRequirement,
    addChildRequirement,
    deleteRequirement,
    handleUpdate,
  } = useRequirements(initialData, vscode);

  if (!Array.isArray(data)) return null;

  const renderRows = (parentId = null, level = 0, visited = new Set()) => {
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
              onAddChild={addChildRequirement}
              onDelete={deleteRequirement}
              maxDepth={MAX_DEPTH}
            />
            {isExpanded && renderRows(item.id, level + 1, visited)}
          </React.Fragment>
        );
      });
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
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

      {Array.isArray(data) && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.headerCell, width: "80px" }}>ID</th>
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
