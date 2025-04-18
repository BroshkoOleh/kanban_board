import { create } from "zustand";
import { Issue, Repo } from "../types";
import { setColumnsToLocalStorage, setPageToLocalStorage } from "../utils/localStorageUtils";

export interface IssuesState {
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
  setLsData: (columns: { todo: Issue[]; inProgress: Issue[]; done: Issue[] }, page: number) => void;
  clearStore: () => void;
  setColumns: (columns: { todo: Issue[]; inProgress: Issue[]; done: Issue[] }) => void;
}

export const useStore = create<IssuesState>((set, get) => ({
  repoData: {} as Repo,
  columns: { todo: [], inProgress: [], done: [] },
  loading: false,
  error: null,
  page: 1,
  perPage: 20,
  hasMore: true,
  repoUrl: "",
  setRepoUrl: (url: string) => set({ repoUrl: url }),

  setRepoData: (data: Repo) => set({ repoData: data }),

  setIssuesData: (data: Issue[]) => {
    const { columns, perPage, page, repoUrl } = get();
    const newIssues = page === 1 ? data : [...columns.todo, ...data];
    const updatedColumns = {
      ...columns,
      todo: newIssues,
    };
    const updatedPage = page + 1;
    setColumnsToLocalStorage(updatedColumns, repoUrl);
    setPageToLocalStorage(updatedPage, repoUrl);

    set({
      columns: updatedColumns,
      loading: false,
      page: updatedPage,
      hasMore: data.length === perPage,
    });
  },
  setLsData: (columns: { todo: Issue[]; inProgress: Issue[]; done: Issue[] }, page: number) =>
    set({
      columns,
      page,
    }),

  clearStore: () =>
    set({
      columns: {
        todo: [],
        inProgress: [],
        done: [],
      },
      page: 1,
    }),
  setColumns: (newColumns) => {
    const { repoUrl, columns } = get();
    // Уникаємо оновлення, якщо колонки ідентичні
    if (
      newColumns.todo === columns.todo &&
      newColumns.inProgress === columns.inProgress &&
      newColumns.done === columns.done
    ) {
      return;
    }
    setColumnsToLocalStorage(newColumns, repoUrl);
    set({ columns: newColumns });
  },
  setLoading: (isLoading: boolean) => set({ loading: isLoading }),
  setError: (error) => set({ error }),
}));
