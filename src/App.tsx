import "./App.css";
import Form from "./components/Form";
import RepoTitle from "./components/RepoTitle";
import Column from "./components/Column";

function App() {
  return (
    <>
      <header className="p-5">
        <Form />
        <p>https://github.com/facebook/hhvm</p>
        <RepoTitle />
      </header>

      <main className="p-5 flex gap-5">
        <Column columnId="todo" title="ToDo" />
        <Column columnId="inProgress" title="In Progress" />
        <Column columnId="done" title="Done" />
      </main>
    </>
  );
}

export default App;
