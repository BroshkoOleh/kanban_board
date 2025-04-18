import { useMemo } from "react";
import { useStore } from "../store/store";
import { IssuesState } from "../store/store";

export function useStoreColumnInfo(columnId: "todo" | "inProgress" | "done") {
  // Вибираємо тільки потрібні дані через селектори
  const columns = useStore((state: IssuesState) => state.columns);
  const loading = useStore((state: IssuesState) => state.loading);
  const error = useStore((state: IssuesState) => state.error);
  const repoUrl = useStore((state: IssuesState) => state.repoUrl);
  const hasMore = useStore((state: IssuesState) => state.hasMore);
  const page = useStore((state: IssuesState) => state.page);
  const perPage = useStore((state: IssuesState) => state.perPage);
  const setIssuesData = useStore((state: IssuesState) => state.setIssuesData);

  // Мемоізуємо повернення, повертаючи тільки потрібну колонку
  return useMemo(
    () => ({
      column: columns[columnId], // Повертаємо тільки потрібну колонку
      loading,
      error,
      repoUrl,
      hasMore,
      page,
      perPage,
      setIssuesData,
    }),
    [
      columns[columnId], // Залежність тільки від конкретної колонки
      loading,
      error,
      repoUrl,
      hasMore,
      page,
      perPage,
      setIssuesData,
    ]
  );
}
