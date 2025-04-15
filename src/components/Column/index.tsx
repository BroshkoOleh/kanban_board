import { useDrop } from "react-dnd";
import { useStore } from "../../store/store";
import IssueItem from "../IssueItem";
import { useRef } from "react";
import { fetchIssues } from "../../utils/API/api";
import { useInfiniteScroll } from "../../utils/hooks/useInfiniteScroll";

interface ColumnProps {
  columnId: "todo" | "inProgress" | "done";
  title: string;
}

export default function Column({ columnId, title }: ColumnProps) {
  const { columns, loading, error, repoUrl, hasMore, setIssuesData, page, perPage, moveIssue } =
    useStore();

  // Логіка нескінченного скролу для колонки ToDo
  const bottomRef = useInfiniteScroll({
    columnId,
    repoUrl,
    hasMore,
    loading,
    page,
    perPage,
    fetchData: fetchIssues,
    setData: setIssuesData,
  });

  //////////////////////////////////////////////////////////////////////////////////////
  const dropRef = useRef<HTMLUListElement | null>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ISSUE",
    drop: (item: { id: number; columnId: "todo" | "inProgress" | "done" }) => {
      moveIssue(item.id, item.columnId, columnId);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // Прив'язуємо drop до dropRef
  drop(dropRef);

  return (
    <section className=" w-1/3">
      <h2 className="pb-1">{title}</h2>

      <ul
        ref={dropRef}
        className="flex flex-col items-center p-5 gap-2.5 bg-gray-400 border border-black h-[540.4px] overflow-y-auto"
        style={{ backgroundColor: isOver ? "#e0e0e0" : undefined }}
      >
        {columns[columnId].map((item, index) => (
          <IssueItem key={item.id} columnId={columnId} item={item} index={index} />
        ))}
        {columnId === "todo" && columns.todo.length > 0 && (
          <div ref={bottomRef} className="h-2"></div>
        )}
        {columnId === "todo" && loading && <p>Loading...</p>}
        {columnId === "todo" && error && <p className="text-red-500">{error}</p>}
      </ul>
    </section>
  );
}
