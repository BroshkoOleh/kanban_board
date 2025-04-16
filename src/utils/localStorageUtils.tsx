import { Issue, Repo } from "../types";

const getRepoNameFromUrl = (url: string) => url.split("github.com/")[1];

const getItemFromLocalStorage = <T,>(key: string): T | null => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const setItemToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const setRepoToLocalStorage = (data: Repo, url: string) => {
  const repoName = getRepoNameFromUrl(url);
  const REPO_LS_KEY = `${repoName}`;
  setItemToLocalStorage(REPO_LS_KEY, data);
};

export const getRepoFromLocalStorage = (url: string): Repo | null => {
  const repoName = getRepoNameFromUrl(url);
  const REPO_LS_KEY = `${repoName}`;
  return getItemFromLocalStorage<Repo>(REPO_LS_KEY);
};

export const setColumnsToLocalStorage = (
  data: { todo: Issue[]; inProgress: Issue[]; done: Issue[] },
  url: string
) => {
  const repoName = getRepoNameFromUrl(url);
  const COLUMNS_LS_KEY = `${repoName}/issues`;
  setItemToLocalStorage(COLUMNS_LS_KEY, data);
};

export const getColumnsFromLocalStorage = (
  url: string
): { todo: Issue[]; inProgress: Issue[]; done: Issue[] } | null => {
  const repoName = getRepoNameFromUrl(url);
  const COLUMNS_LS_KEY = `${repoName}/issues`;
  return getItemFromLocalStorage<{ todo: Issue[]; inProgress: Issue[]; done: Issue[] }>(
    COLUMNS_LS_KEY
  );
};

export const setPageToLocalStorage = (page: number, url: string) => {
  const repoName = getRepoNameFromUrl(url);
  const PAGE_LS_KEY = `${repoName}/page`;
  setItemToLocalStorage(PAGE_LS_KEY, page);
};

export const getPageFromLocalStorage = (url: string): number | null => {
  const repoName = getRepoNameFromUrl(url);
  const PAGE_LS_KEY = `${repoName}/page`;
  return getItemFromLocalStorage<number>(PAGE_LS_KEY);
};
