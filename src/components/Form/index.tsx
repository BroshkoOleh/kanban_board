import { ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "../../store/store";
import { fetchRepo, fetchIssues } from "../../utils/API/api";

export default function Form() {
  const {
    setRepoData,
    setRepoUrl,
    setError,
    setLoading,
    setIssuesData,
    page,
    perPage,
    repoUrl,
    loading,
  } = useStore();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setRepoUrl(url);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await fetchRepo(repoUrl);
      setRepoData(data);

      const issuesData = await fetchIssues(repoUrl, perPage, page);
      setIssuesData(issuesData);
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
    <form onSubmit={handleFormSubmit} className="flex  gap-4">
      <input
        className="w-full border h-9 border-gray-700 rounded-2xl pl-5"
        type="text"
        value={repoUrl}
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
