import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "../../store";

export default function Form() {
  const [repoUrl, setRepoUrl] = useState<string>("");
  const { fetchIssues, fetchRepo, loading, error } = useStore();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchRepo(repoUrl);
    fetchIssues(repoUrl);
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

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
