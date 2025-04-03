export interface Issue {
  id: number;
  number: number;
  title: string;
  created_at: string;
  comments: number;
  user: {
    login: string;
  };
}
