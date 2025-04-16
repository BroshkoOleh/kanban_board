import { useStore } from "../../store/store";
import IssueItem from "../IssueItem";
import { fetchIssues } from "../../utils/API/api";
import { useInfiniteScroll } from "../../utils/hooks/useInfiniteScroll";
import { Droppable } from "@hello-pangea/dnd";

interface ColumnProps {
  columnId: "todo" | "inProgress" | "done";
  title: string;
}

export default function Column({ columnId, title }: ColumnProps) {
  const { columns, loading, error, repoUrl, hasMore, setIssuesData, page, perPage } = useStore();

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

  return (
    <section className=" w-1/3">
      <h2 className="pb-1">{title}</h2>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <ul
            className="flex flex-col items-center p-5 gap-2.5 bg-gray-400 border border-black h-[540.4px] overflow-y-auto"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {columns[columnId].map((item, index) => (
              <IssueItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
            {columnId === "todo" && columns.todo.length > 0 && (
              <div ref={bottomRef} className="h-2"></div>
            )}
            {columnId === "todo" && loading && <p>Loading...</p>}
            {columnId === "todo" && error && <p className="text-red-500">{error}</p>}
          </ul>
        )}
      </Droppable>
    </section>
  );
}

// Додано Droppable від @hello-pangea/dnd.
// Елемент <ul> огорнуто в Droppable, з передачею droppableId={columnId}.
// Додано provided.innerRef і provided.droppableProps до <ul>.
// Додано provided.placeholder, щоб забезпечити місце для перетягнутих елементів.
