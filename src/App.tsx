import "./App.css";
import Form from "./components/Form";
// import IssuesList from "./components/IssuesList";
import RepoTitle from "./components/RepoTitle";
import Column from "./components/Column";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function App() {
  return (
    <>
      <header className="p-5">
        <Form />
        <p>https://github.com/facebook/hhvm</p>
        <RepoTitle />
      </header>

      <main className="p-5 flex gap-5">
        <DndProvider backend={HTML5Backend}>
          <Column columnId="todo" title="ToDo" />
          <Column columnId="inProgress" title="In Progress" />
          <Column columnId="done" title="Done" />
        </DndProvider>
      </main>
    </>
  );
}

export default App;
