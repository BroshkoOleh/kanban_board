import { Issue } from "../../types";
import { formatDate } from "../../utils/formatDate";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { useStore } from "../../store/store";

interface IssueItemProps {
  item: Issue;
  columnId: "todo" | "inProgress" | "done";
  index: number;
}

export default function IssueItem({ item, columnId, index }: IssueItemProps) {
  const { moveIssue } = useStore();
  const liRef = useRef<HTMLLIElement | null>(null); // Додаємо useRef для li

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ISSUE",
    item: { id: item.id, columnId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ISSUE",
    drop: (droppedItem: {
      id: number;
      columnId: "todo" | "inProgress" | "done";
      index: number;
    }) => {
      if (droppedItem.id !== item.id) {
        moveIssue(droppedItem.id, droppedItem.columnId, columnId, index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // Прив'язуємо drag і drop до liRef
  drag(liRef);
  drop(liRef);

  return (
    <li
      ref={liRef} // Використовуємо liRef
      className="flex flex-col items-start justify-start gap-1.5 border border-black rounded-2xl bg-white p-4 w-full -mx-5"
      style={{ opacity: isDragging ? 0.5 : 1, backgroundColor: isOver ? "#f0f0f0" : "white" }}
    >
      <p className="text-left">{item.title}</p>
      <p>
        #{item.number} created {formatDate(item.created_at)}
      </p>
      <p>
        {item.user.login} | Comments: {item.comments}
      </p>
    </li>
  );
}
