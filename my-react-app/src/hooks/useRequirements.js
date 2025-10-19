import { useState, useRef, useEffect } from "react";

const MAX_DEPTH = 4;

export default function useRequirements(initialData, vscode) {
  const [data, setData] = useState(initialData ?? []);
  const [expanded, setExpanded] = useState(new Set());
  const nextIdRef = useRef(1);

  useEffect(() => {
    if (Array.isArray(initialData)) {
      setData(initialData);

      const ids = initialData.map((d) => {
        if (!d || typeof d.id !== "string") return 0;
        const num = parseInt(d.id.split("-")[1], 10);
        return Number.isFinite(num) ? num : 0;
      });

      const maxId = ids.length > 0 ? Math.max(...ids) : 0;
      nextIdRef.current = maxId + 1;
    }
  }, [Array.isArray(initialData) ? initialData.length : null]);

  const generateNewId = () => `REQ-${String(nextIdRef.current++).padStart(3, "0")}`;

  const toggleExpand = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleUpdate = (updatedData = data) => {
    vscode.postMessage({
      type: "update-requirements",
      payload: updatedData,
    });
  };

  const addRootRequirement = () => {
    const newItem = {
      id: generateNewId(),
      parentId: null,
      text: "새로운 요구사항을 입력하세요.",
      status: "Draft",
    };
    setData((prev) => {
      const updated = [...prev, newItem];
      handleUpdate(updated);
      return updated;
    });
  };

  const addChildRequirement = (parentId, parentLevel = 0) => {
    if (parentLevel + 1 > MAX_DEPTH) {
      alert(`요구사항은 최대 ${MAX_DEPTH + 1}단계까지만 추가할 수 있습니다.`);
      return;
    }

    const newItem = {
      id: generateNewId(),
      parentId,
      text: "새로운 하위 요구사항을 입력하세요.",
      status: "Draft",
    };

    setData((prev) => {
      const updated = [...prev, newItem];
      handleUpdate(updated);
      return updated;
    });

    setExpanded((prev) => new Set([...prev, parentId]));
  };

  const deleteRequirement = (id) => {
    const collectIdsToDelete = (targetId, data) => {
      const ids = [targetId];
      data.forEach((item) => {
        if (item.parentId === targetId) {
          ids.push(...collectIdsToDelete(item.id, data));
        }
      });
      return ids;
    };

    const idsToDelete = collectIdsToDelete(id, data);
    setData((prev) => {
      const updated = prev.filter((item) => !idsToDelete.includes(item.id));
      handleUpdate(updated);
      return updated;
    });
  };

  return {
    data,
    expanded,
    MAX_DEPTH,
    toggleExpand,
    addRootRequirement,
    addChildRequirement,
    deleteRequirement,
    handleUpdate,
  };
}
