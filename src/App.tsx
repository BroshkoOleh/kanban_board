import "./App.css";
import Form from "./components/Form";

import IssuesList from "./components/IssuesList";

import RepoTitle from "./components/RepoTitle";

function App() {
  return (
    <>
      <header className="p-5">
        <Form />
        <RepoTitle />
      </header>
      <main className="p-5 flex gap-4">
        <section className="w-full">
          <h2 className="pb-1">ToDo</h2>
          <IssuesList />
        </section>
        <section className="w-full">
          <h2 className="pb-1">In Progress</h2>

          <ul className="flex flex-col items-center p-5 gap-2.5 bg-gray-400 border border-black min-h-[540.4px] overflow-y-auto"></ul>
        </section>
        <section className="w-full ">
          <h2 className="pb-1">Done</h2>

          <ul className="flex flex-col items-center p-5 gap-2.5 bg-gray-400 border border-black min-h-[540.4px]"></ul>
        </section>
      </main>
    </>
  );
}

export default App;
