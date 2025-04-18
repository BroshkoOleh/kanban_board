import Column from "../Column";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useStore, IssuesState } from "../../store/store";
import { handleDragEnd } from "../../utils/dndUtils";

export default function Board() {
  const columns = useStore((state: IssuesState) => state.columns);
  const setColumns = useStore((state: IssuesState) => state.setColumns);

  const onDragEnd = (result: DropResult) => {
    handleDragEnd(result, columns, setColumns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Column columnId="todo" title="To Do" />
      <Column columnId="inProgress" title="In Progress" />
      <Column columnId="done" title="Done" />
    </DragDropContext>
  );
}
