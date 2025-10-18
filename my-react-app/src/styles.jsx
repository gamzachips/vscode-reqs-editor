const styles = {
  /* ====== 기본 테이블 구조 ====== */
  table: {
    borderCollapse: "separate",
    borderSpacing: 0,
    width: "100%",
    fontFamily: "'Segoe UI', sans-serif",
    fontSize: "14px",
    tableLayout: "fixed",
  },

  /* ====== 헤더 ====== */
  headerCell: {
    backgroundColor: "#2e2e2e",
    color: "#ffffff",
    fontWeight: 600,
    padding: "8px 10px",
    textAlign: "left",
    borderBottom: "2px solid #bfbfbfff",
  },


  /* ====== 셀 ====== */
  cell: {
    padding: "10px 12px",
    verticalAlign: "middle",
    wordBreak: "keep-all",
    whiteSpace: "normal", 
    lineHeight: "1.6em",
    minHeight: "44px",
    boxSizing: "border-box",
    borderRight: "1px solid #2a2a2a", 
  },

  /* ====== 확장 토글 아이콘 ====== */
  iconWrapper: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20px",
    height: "20px",
    marginRight: "6px",
    cursor: "pointer",
    verticalAlign: "middle",
  },

  iconSvg: {
    width: "16px",
    height: "16px",
    transformOrigin: "center",
    transition: "transform 0.2s ease, fill 0.2s ease",
    fill: "#ccc",
  },

  /* ====== 자식추가 / 삭제 버튼 ====== */
  actionButton: {
    background: "#3a3d41",
    border: "1px solid #555",
    borderRadius: "4px",
    color: "#ddd",
    padding: "2px 6px",
    marginRight: "4px",
    cursor: "pointer",
    transition: "background 0.15s ease, border-color 0.15s ease",
  },


};

export default styles;
