import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "../../store/store";
import { fetchRepo, fetchIssues } from "../../utils/API/api";
import { getColumnsFromLocalStorage, getPageFromLocalStorage } from "../../utils/localStorageUtils";

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
    repoUrl,
    columns,
    page,
    perPage,
    loading,
  } = useStore();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputUrl(event.target.value);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRepoUrl(inputUrl); // оновлюємо стейт, але використовуємо inputUrl далі
    setLoading(true);

    try {
      const data = await fetchRepo(inputUrl); // завантажуємо репозиторій
      setRepoData(data);

      // 1. Отримуємо дані з LS
      const savedColumns = getColumnsFromLocalStorage(inputUrl);
      const savedPage = getPageFromLocalStorage(inputUrl);

      if (savedColumns && savedPage) {
        // Якщо є збережені колонки і сторінка в LS — оновлюємо Zustand
        setLsData(savedColumns, savedPage);
      } else {
        clearStore(); // <- очищаємо перед fetch

        // const { page: resetPage } = useStore.getState();

        const issuesData = await fetchIssues(inputUrl, perPage, 1);

        setIssuesData(issuesData);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Помилка під час завантаження даних:", err.message);
        setError(err.message);
      } else {
        console.error("Невідома помилка:", err);
        setError("Невідома помилка");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex gap-4">
      <input
        className="w-full border h-9 border-gray-700 rounded-2xl pl-5"
        type="text"
        value={inputUrl}
        onChange={handleInputChange}
        placeholder="Enter repo URL"
        required
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Load Issues"}
      </Button>
    </form>
  );
}
