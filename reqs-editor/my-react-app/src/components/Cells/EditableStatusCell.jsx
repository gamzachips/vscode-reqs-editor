// EditableStatusCell.jsx
import React, { useState } from "react";

function EditableStatusCell({ item, styles }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(item.status);

  const statuses = ["Draft", "Pending", "In Review", "Approved"];

  const statusColors = {
  Draft: "#aaa",
  Pending: "#e0c46c",
  "In Review": "#67a0ff",
  Approved: "#6fbf73",
};

  return (
    <td
      style={{
        ...styles.cell,
        textAlign: "center",
        cursor: "pointer",
        padding: 0,
      }}
      onClick={() => !editing && setEditing(true)}
    >
      {editing ? (
        <select
            value={value}
            onChange={(e) => {
                const newValue = e.target.value;
                setValue(newValue);
                item.status = newValue;   // ✅ 즉시 데이터 반영
                setEditing(false);         // ✅ 선택 시 바로 닫기
            }}
            onBlur={() => setEditing(false)} // 보조로 유지
            onKeyDown={(e) => {
                if (e.key === "Escape") setEditing(false);
            }}
            autoFocus
            style={{
                width: "100%",
                height: "100%",
                background: "#2b2b2b",
                border: "none",
                color: statusColors[item.status],
                fontSize: "14px",
                padding: "8px 6px",
                outline: "none",
                borderRadius: "0",
                textAlign: "center"
            }}
            >
            {statuses.map((status) => (
                <option key={status} value={status}>
                {status}
                </option>
            ))}
            </select>

      ) : (
        <span style={{ color: statusColors[item.status] }}>
            {item.status}
        </span>
      )}
    </td>
  );
}

export default EditableStatusCell;
