import React, { useState } from "react";

function EditableCell({ item, field, styles }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(item[field] || "");

  return (
    <td
      style={{
        ...styles.cell,
        textAlign: "left",
        cursor: "text",
        padding: 0,
      }}
      onClick={() => {
        if (!editing) {
          setEditing(true);
          setValue(item[field]);
        }
      }}
    >
      {editing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            item[field] = value;
            setEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setEditing(false);
            if (e.key === "Enter") e.target.blur();
          }}
          autoFocus
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#fff",
            fontSize: "14px",
            fontFamily: "inherit",
            padding: "8px 10px",
            boxSizing: "border-box",
          }}
        />
      ) : (
        <span
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            padding: "8px 10px",
          }}
        >
          {item[field] || <span style={{ opacity: 0.5 }}>내용 없음</span>}
        </span>
      )}
    </td>
  );
}

export default EditableCell;
