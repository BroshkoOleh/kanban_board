import { Repo, Issue } from "../../types";

export const fetchRepo = async (repoUrl: string): Promise<Repo> => {
  try {
    const repoPath = repoUrl.split("github.com/")[1];
    const apiUrl = `https://api.github.com/repos/${repoPath}`;

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        "User-Agent": "ReactApp",
      },
    });

    if (!response.ok) {
      throw new Error(`Помилка: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Помилка при отриманні даних про репозиторій:", error.message);
    } else {
      console.error("Невідома помилка:", error);
    }
    throw error;
  }
};

export const fetchIssues = async (
  repoUrl: string,
  perPage: number,
  page: number
): Promise<Issue[]> => {
  try {
    const repoPath = repoUrl.split("github.com/")[1];
    const apiUrl = `https://api.github.com/repos/${repoPath}/issues?per_page=${perPage}&page=${page}`;

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        "User-Agent": "ReactApp",
      },
    });

    if (!response.ok) {
      throw new Error(`Помилка: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Помилка при отриманні даних про репозиторій:", error.message);
    } else {
      console.error("Невідома помилка:", error);
    }
    throw error;
  }
};
