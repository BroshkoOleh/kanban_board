import { DropResult } from "@hello-pangea/dnd";
import { IssuesState } from "../store/store";

export const handleDragEnd = (
  result: DropResult,
  columns: IssuesState["columns"],

  setColumns: (columns: IssuesState["columns"]) => void
) => {
  const { source, destination } = result;

  if (!destination) return;

  if (source.droppableId === destination.droppableId && source.index === destination.index) {
    return;
  }

  const sourceColumn = [...columns[source.droppableId as keyof typeof columns]];
  const destColumn =
    source.droppableId === destination.droppableId
      ? sourceColumn
      : [...columns[destination.droppableId as keyof typeof columns]];

  const [movedIssue] = sourceColumn.splice(source.index, 1);
  destColumn.splice(destination.index, 0, movedIssue);

  const updatedColumns = {
    ...columns,
    [source.droppableId]: sourceColumn,
    [destination.droppableId]: destColumn,
  };

  setColumns(updatedColumns);
};
