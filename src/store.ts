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
  fetchRepo: () => Promise<void>;
  fetchIssues: () => Promise<void>;
  page: number;
  perPage: number;
  hasMore: boolean;
  repoUrl: string;
  setRepoUrl: (url: string) => void;
}

export const useStore = create<IssuesState>((set, get) => ({
  repoData: {} as Repo,
  issues: [],
  loading: false,
  error: null,
  page: 1,
  perPage: 10,
  hasMore: true,
  repoUrl: "",
  setRepoUrl: (url: string) => set({ repoUrl: url }),

  // Запит на інформацію про репозиторій
  fetchRepo: async () => {
    try {
      const currentState = get(); // Отримуємо поточний стан
      if (!currentState.repoUrl) return; // Додана перевірка
      set({ loading: true, error: null });

      const repoPath = currentState.repoUrl.split("github.com/")[1];
      console.log("repoPath", repoPath);
      const apiUrl = `https://api.github.com/repos/${repoPath}`;

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
  fetchIssues: async () => {
    try {
      const currentState = get(); // Отримуємо поточний стан
      if (!currentState.repoUrl) return; // Додана перевірка
      set({ loading: true, error: null });

      // Витягуємо owner та repo з URL
      const repoPath = currentState.repoUrl.split("github.com/")[1];

      const apiUrl = `https://api.github.com/repos/${repoPath}/issues?per_page=${currentState.perPage}&page=${currentState.page}`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          "User-Agent": "ReactApp",
        },
      });

      if (!response.ok) throw new Error(`Помилка: ${response.statusText}`);

      const data: Issue[] = await response.json();
      set((state) => ({
        issues: state.page === 1 ? data : [...state.issues, ...data],
        loading: false,
        page: state.page + 1,
        hasMore: data.length === state.perPage,
      }));
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },
}));
