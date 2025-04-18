import { useMemo } from "react";
import { useStore } from "../store/store";
import { IssuesState } from "../store/store";

export function useStoreGeneralInfo() {
  // Вибираємо тільки потрібні дані та функції через селектори
  const perPage = useStore((state: IssuesState) => state.perPage);
  const loading = useStore((state: IssuesState) => state.loading);
  const setRepoData = useStore((state: IssuesState) => state.setRepoData);
  const setRepoUrl = useStore((state: IssuesState) => state.setRepoUrl);
  const setError = useStore((state: IssuesState) => state.setError);
  const setLoading = useStore((state: IssuesState) => state.setLoading);
  const setIssuesData = useStore((state: IssuesState) => state.setIssuesData);
  const setLsData = useStore((state: IssuesState) => state.setLsData);
  const clearStore = useStore((state: IssuesState) => state.clearStore);

  // Мемоізуємо повернення, щоб уникнути створення нового об’єкта при кожному рендері
  return useMemo(
    () => ({
      perPage,
      loading,
      setRepoData,
      setRepoUrl,
      setError,
      setLoading,
      setIssuesData,
      setLsData,
      clearStore,
    }),
    [
      perPage,
      loading,
      setRepoData,
      setRepoUrl,
      setError,
      setLoading,
      setIssuesData,
      setLsData,
      clearStore,
    ]
  );
}
