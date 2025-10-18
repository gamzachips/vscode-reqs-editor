import React, { useState } from "react";
import EditableCell from "./EditableCell";
import EditableStatusCell from "./EditableStatusCell";

function RequirementRow({ item, level, hasChildren, isExpanded, toggleExpand, styles }) {
  const bgColor = `rgba(255,255,255,${level * 0.03 + 0.05})`;

  return (
    <tr style={{ backgroundColor: bgColor }}>
      {/* ID 셀 */}
      <td style={{ ...styles.cell, textAlign: "left" }}>
        <div
            style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: `${level * 20}px`,
            }}
        >
            {/* 항상 공간 확보 */}
            <span
            onClick={() => hasChildren && toggleExpand(item.id)}
            style={{
                ...styles.iconWrapper,
                width: "20px",           // ✅ 항상 고정 너비
                height: "20px",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: hasChildren ? 1 : 0,  // ✅ 없을 때는 투명하게
                cursor: hasChildren ? "pointer" : "default",
            }}
            >
            <svg
                viewBox="0 0 24 24"
                fill={isExpanded ? "#ffd700" : "#aaa"}
                style={{
                ...styles.iconSvg,
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                }}
            >
                <path d="M8 5v14l11-7z" />
            </svg>
            </span>

            {/* ID 텍스트 */}
            <span>{item.id}</span>
        </div>
        </td>


      {/* 내용 셀 (인라인 편집) */}
      <EditableCell item={item} field="text" styles={styles} />

      {/* 상태 셀 */}
      <EditableStatusCell item={item} styles={styles} />

      {/* 동작 셀 */}
      <td style={{ ...styles.cell, textAlign: "center" }}>
        <button style={styles.actionButton}>자식 추가</button>
        <button style={styles.actionButton}>삭제</button>
      </td>
    </tr>
  );
}

export default RequirementRow;
