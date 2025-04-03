import { create } from "zustand";
import { Issue } from "./types";
interface Repo {
  name: string;
  owner: {
    login: string;
  };
  stargazers_count: number;
}

interface IssuesState {
  repoData: Repo;
  issues: Issue[];
  loading: boolean;
  error: string | null;
  fetchRepo: (repoUrl: string) => Promise<void>;
  fetchIssues: (repoUrl: string) => Promise<void>;
}

export const useStore = create<IssuesState>((set) => ({
  repoData: {} as Repo,
  issues: [],
  loading: false,
  error: null,

  // Запит на інформацію про репозиторій
  fetchRepo: async (repoUrl: string) => {
    try {
      set({ loading: true, error: null });

      // Витягуємо owner та repo з URL
      const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!match) throw new Error("Некоректний URL репозиторію.");

      const [, owner, repo] = match;
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          "User-Agent": "ReactApp",
        },
      });

      if (!response.ok) throw new Error(`Помилка: ${response.statusText}`);

      const data: Repo = await response.json();
      set({ repoData: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  // Запит на Issues
  fetchIssues: async (repoUrl: string) => {
    try {
      set({ loading: true, error: null });

      // Витягуємо owner та repo з URL
      const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!match) throw new Error("Некоректний URL репозиторію.");

      const [, owner, repo] = match;
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues?per_page=5`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          "User-Agent": "ReactApp",
        },
      });

      if (!response.ok) throw new Error(`Помилка: ${response.statusText}`);

      const data: Issue[] = await response.json();
      set({ issues: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
