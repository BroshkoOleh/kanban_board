import { create } from "zustand";
import { Issue, Repo } from "../types";

export default interface IssuesState {
  repoData: Repo;
  columns: {
    todo: Issue[];
    inProgress: Issue[];
    done: Issue[];
  };
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
  setAllColumns: (columns: { todo: Issue[]; inProgress: Issue[]; done: Issue[] }) => void;
  clearColumns: () => void;
}

export const useStore = create<IssuesState>((set, get) => ({
  repoData: {} as Repo,
  columns: { todo: [], inProgress: [], done: [] },
  loading: false,
  error: null,
  page: 1,
  perPage: 5,
  hasMore: true,
  repoUrl: "",
  setRepoUrl: (url: string) => set({ repoUrl: url }),

  setRepoData: (data: Repo) => set({ repoData: data }),

  setIssuesData: (data: Issue[]) => {
    const { columns, perPage, page } = get();
    const newIssues = page === 1 ? data : [...columns.todo, ...data];

    set({
      columns: {
        ...columns,
        todo: newIssues,
      },
      loading: false,
      page: page + 1,
      hasMore: data.length === perPage,
    });
  },
  setAllColumns: (columns: { todo: Issue[]; inProgress: Issue[]; done: Issue[] }) =>
    set({ columns }),
  clearColumns: () =>
    set({
      columns: {
        todo: [],
        inProgress: [],
        done: [],
      },
    }),
  setLoading: (isLoading: boolean) => set({ loading: isLoading }),
  setError: (error) => set({ error }),
}));
