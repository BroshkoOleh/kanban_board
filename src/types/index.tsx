export interface Issue {
  id: number;
  number: number;
  title: string;
  created_at: string;
  comments: number;
  html_url: string;
  user: {
    login: string;
    html_url: string;
  };
}
export interface Repo {
  name: string;
  owner: {
    login: string;
  };
  stargazers_count: number;
}
