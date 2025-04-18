import "./App.css";
import Form from "./components/Form";
import RepoTitle from "./components/RepoTitle";
import Board from "./components/Board";
function App() {
  return (
    <>
      <header className="p-5">
        <Form />
        <RepoTitle />
      </header>

      <main className="p-5 flex gap-5 ">
        <Board />
      </main>
    </>
  );
}

export default App;
