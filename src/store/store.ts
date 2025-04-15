import { create } from "zustand";
import { Issue, Repo } from "../types";

interface IssuesState {
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
  moveIssue: (
    issueId: number,
    sourceColumn: "todo" | "inProgress" | "done",
    targetColumn: "todo" | "inProgress" | "done",
    targetIndex?: number
  ) => void;
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
  setLoading: (isLoading: boolean) => set({ loading: isLoading }),
  setError: (error) => set({ error }),

  moveIssue: (
    issueId: number,
    sourceColumn: "todo" | "inProgress" | "done",
    targetColumn: "todo" | "inProgress" | "done",
    targetIndex?: number
  ) =>
    set((state) => {
      const newColumns = { ...state.columns };
      let issueToMove: Issue | undefined;

      // Знаходимо issue у вихідній колонці
      newColumns[sourceColumn] = newColumns[sourceColumn].filter((issue) => {
        if (issue.id === issueId) {
          issueToMove = issue;
          return false;
        }
        return true;
      });

      // Додаємо issue до цільової колонки
      if (issueToMove) {
        const targetIssues = [...newColumns[targetColumn]];
        if (targetIndex !== undefined) {
          targetIssues.splice(targetIndex, 0, issueToMove);
        } else {
          targetIssues.push(issueToMove);
        }
        newColumns[targetColumn] = targetIssues;
      }

      return { columns: newColumns };
    }),
}));
