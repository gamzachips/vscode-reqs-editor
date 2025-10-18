import React, { useState } from "react";
import EditableCell from "./EditableCell";
import EditableStatusCell from "./EditableStatusCell";
import IDCell from "./IDCell";

function RequirementRow({ item, level, hasChildren, isExpanded, toggleExpand, styles, onUpdate, onAddChild, onDelete }) {
  const bgColor = `rgba(255,255,255,${level * 0.03 + 0.05})`;

  return (
    <tr style={{ backgroundColor: bgColor }}>
      {/* ID 셀 */}
      <IDCell
        item={item}
        level={level}
        hasChildren={hasChildren}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
        styles={styles}
      />

      {/* 내용 셀 (인라인 편집) */}
      <EditableCell item={item} field="text" styles={styles} onUpdate={onUpdate}/>

      {/* 상태 셀 */}
      <EditableStatusCell item={item} styles={styles} onUpdate={onUpdate} />

      {/* 동작 셀 */}
      <td style={{ ...styles.cell, textAlign: "center" }}>
        <button style={styles.actionButton}
        onClick={()=> onAddChild(item.id, level)}
        >
          자식 추가
        </button>
        <button 
          style={styles.actionButton}
          onClick={() => onDelete(item.id)}
        >
          삭제
        </button>
      </td>
    </tr>
  );
}

export default RequirementRow;
