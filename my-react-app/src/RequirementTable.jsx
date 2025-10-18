import React, {useState} from "react";
import styles from "./styles";


function RequirementTable({ data }) {
    const [expanded, setExpanded] = useState(new Set());

    function toggleExpand(id){
        setExpanded((prev) => {
            const next = new Set(prev);
            if(next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }

    function renderRows(data, parentId = null, level = 0, visited = new Set()){
        
        if(!Array.isArray(data)) return null;
        
        return data
        .filter((item) => item.parentId === parentId)
        .map((item) => {
            /* 무한 재귀 감지*/
            if(visited.has(item.id)){
                console.error("무한 재귀 :", item.id);
                throw new Error(`무한 재귀 감지 : ${item.id}`);
            }
            visited.add(item.id);

            const hasChildren = data.some((d)=> d.parentId === item.id);
            const isExpanded = expanded.has(item.id);

            return (
            <React.Fragment key={item.id}>
                <tr style={{ backgroundColor: `rgba(255,255,255,${level * 0.03 + 0.05})` }}>
                    <td style = {{...styles.cell,textAlign:"left"}}>
    
                    <div style={{display: "flex", alignItems: "left", paddingLeft: `${level * 20}px`}}>
                    {/* 화살표 버튼 */}
                    <span
                        onClick={() => hasChildren && toggleExpand(item.id)}
                        style={{
                            ...styles.iconWrapper,
                            cursor: hasChildren ? "pointer" : "default",
                        }}
                        >
                        {hasChildren && (
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
                        )}
                    </span>
                    {item.id}
                    </div>
                    </td>
                    <td style={{...styles.cell, textAlign: "left"}}>{item.text}</td>
                    <td style={{...styles.cell, textAlign: "center"}}>{item.status}</td>
                    <td style={{...styles.cell, textAlign: "center"}}>
                        <button style={styles.actionButton}>자식 추가</button>
                        <button style={styles.actionButton}>삭제</button>
                    </td>
                </tr>
                {isExpanded && renderRows(data, item.id, level +1)}
            </React.Fragment>
            );
        });
    }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={{...styles.headerCell, width: "70px", textAlign: "center"}}>ID</th>
          <th style={{...styles.headerCell, width: "200px", wordWrap: "break-word", textAlign: "center"}}>내용</th>
          <th style={{...styles.headerCell, width: "50px", textAlign: "center"}}>상태</th>
          <th style={{...styles.headerCell, width: "80px", textAlign: "center"}}>동작</th>
        </tr>
      </thead>
      <tbody>{renderRows(data)}</tbody>
    </table>
  );
}

export default RequirementTable;
