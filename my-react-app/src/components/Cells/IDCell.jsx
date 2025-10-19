// IDCell.jsx
import React from "react";

function IDCell({ item, level, hasChildren, isExpanded, toggleExpand, styles }) {
  return (
    <td style={{ ...styles.cell, textAlign: "left" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: `${level * 20}px`,
        }}
      >
        {/* 항상 공간 확보 (아이콘 자리 유지) */}
        <span
          onClick={() => hasChildren && toggleExpand(item.id)}
          style={{
            ...styles.iconWrapper,
            width: "20px",
            height: "20px",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: hasChildren ? 1 : 0,
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
  );
}

export default IDCell;
