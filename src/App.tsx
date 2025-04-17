import "./App.css";
import Form from "./components/Form";
import RepoTitle from "./components/RepoTitle";
import Column from "./components/Column";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useStore } from "./store/store";
import { handleDragEnd } from "./utils/dndUtils";

function App() {
  const { columns, repoUrl } = useStore();

  const onDragEnd = (result: DropResult) => {
    handleDragEnd(result, columns, repoUrl, useStore.setState);
  };

  return (
    <>
      <header className="p-5">
        <Form />
        {/* <p>https://github.com/facebook/hhvm</p> */}
        <RepoTitle />
      </header>

      <main className="p-5 flex gap-5 ">
        <DragDropContext onDragEnd={onDragEnd}>
          <Column columnId="todo" title="ToDo" />
          <Column columnId="inProgress" title="In Progress" />
          <Column columnId="done" title="Done" />
        </DragDropContext>
      </main>
    </>
  );
}

export default App;
