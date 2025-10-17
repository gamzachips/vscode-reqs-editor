import React from "react";

function RequirementTable({ data }) {
  return (
    <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>내용</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        {data.map((req) => (
          <tr key={req.id}>
            <td>{req.id}</td>
            <td>{req.text}</td>
            <td>{req.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RequirementTable;
