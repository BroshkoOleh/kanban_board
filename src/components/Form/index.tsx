import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import RepoInput from "../RepoInput";
import { useStore } from "../../store/store";
import { fetchRepo, fetchIssues } from "../../utils/API/api";
import {
  getColumnsFromLocalStorage,
  getPageFromLocalStorage,
  setLastRepoUrl,
} from "../../utils/localStorageUtils";

export default function Form() {
  const [inputUrl, setInputUrl] = useState("");

  const {
    setRepoData,
    setRepoUrl,
    setError,
    setLoading,
    setIssuesData,
    setLsData,
    clearStore,
    perPage,
    loading,
  } = useStore();

  // для оновлення підказок після сабміту
  const [suggestionsKey, setSuggestionsKey] = useState(0);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRepoUrl(inputUrl);
    setLoading(true);

    try {
      const data = await fetchRepo(inputUrl);
      setRepoData(data);
      setLastRepoUrl(inputUrl);

      const savedColumns = getColumnsFromLocalStorage(inputUrl);
      const savedPage = getPageFromLocalStorage(inputUrl);

      if (savedColumns && savedPage) {
        setLsData(savedColumns, savedPage);
      } else {
        clearStore();
        const issuesData = await fetchIssues(inputUrl, perPage, 1);
        setIssuesData(issuesData);
      }
      //  Зберігаємо посилання в історію
      setLastRepoUrl(inputUrl);

      // Оновлюємо RepoInput (форсим перерендер)
      setSuggestionsKey((prev) => prev + 1);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Помилка під час завантаження:", err.message);
        setError(err.message);
      } else {
        setError("Невідома помилка");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex gap-4 w-full">
      <RepoInput key={suggestionsKey} value={inputUrl} onChange={setInputUrl} />

      <Button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Load Issues"}
      </Button>
    </form>
  );
}
