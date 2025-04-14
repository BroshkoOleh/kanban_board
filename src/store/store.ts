import { create } from "zustand";
import { Issue, Repo } from "../types";

interface IssuesState {
  repoData: Repo;
  issues: Issue[];
  loading: boolean;
  error: string | null;
  page: number;
  perPage: number;
  hasMore: boolean;
  repoUrl: string;
  setRepoUrl: (url: string) => void;
  setRepoData: (data: Repo) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setIssuesData: (data: Issue[]) => void;
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

  setRepoData: (data: Repo) => set({ repoData: data }),

  setIssuesData: (data: Issue[]) => {
    const { issues, perPage, page } = get();
    set({
      issues: page === 1 ? data : [...issues, ...data],
      loading: false,
      page: page + 1,
      hasMore: data.length === perPage,
    });
  },
  setLoading: (isLoading: boolean) => set({ loading: isLoading }),
  setError: (error) => set({ error }),
}));
