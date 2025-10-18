import React, { useState } from "react";
import styles from "./styles";
import RequirementRow from "./RequirementRow";

function RequirementTable({ data }) {
  const [expanded, setExpanded] = useState(new Set());

  function toggleExpand(id) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function renderRows(data, parentId = null, level = 0, visited = new Set()) {
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
            />
            {isExpanded && renderRows(data, item.id, level + 1, visited)}
          </React.Fragment>
        );
      });
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={{ ...styles.headerCell, width: "70px", textAlign: "center" }}>ID</th>
          <th style={{ ...styles.headerCell, width: "300px", textAlign: "center" }}>내용</th>
          <th style={{ ...styles.headerCell, width: "80px", textAlign: "center" }}>상태</th>
          <th style={{ ...styles.headerCell, width: "120px", textAlign: "center" }}>동작</th>
        </tr>
      </thead>
      <tbody>{renderRows(data)}</tbody>
    </table>
  );
}

export default RequirementTable;
