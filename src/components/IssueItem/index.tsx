import { Issue } from "../../types";
import { formatDate } from "../../utils/formatDate";
import { Draggable } from "@hello-pangea/dnd";

interface IssueItemProps {
  item: Issue;
  // columnId: "todo" | "inProgress" | "done";
  index: number;
}

export default function IssueItem({ item, index }: IssueItemProps) {
  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <li
          className="flex flex-col items-start justify-start gap-1.5 border border-black rounded-2xl bg-white p-4 w-full -mx-5 cursor-grab cursor-grabbing:active"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="text-left break-words w-full">{item.title}</p>
          <p>
            #{item.number} created {formatDate(item.created_at)}
          </p>
          <p>
            {item.user.login} | Comments: {item.comments}
          </p>
        </li>
      )}
    </Draggable>
  );
}

// Додано Draggable від @hello-pangea/dnd.
// Передано draggableId={item.id.toString()} (унікальний ідентифікатор) і index.
// Елемент <li> огорнуто в Draggable, з передачею provided.innerRef,
// provided.draggableProps і provided.dragHandleProps.
