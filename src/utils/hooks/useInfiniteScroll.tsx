import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  columnId: "todo" | "inProgress" | "done";
  repoUrl: string;
  hasMore: boolean;
  loading: boolean;
  page: number;
  perPage: number;
  fetchData: (url: string, perPage: number, page: number) => Promise<any>;
  setData: (data: any) => void;
}

export const useInfiniteScroll = ({
  columnId,
  repoUrl,
  hasMore,
  loading,
  page,
  perPage,
  fetchData,
  setData,
}: UseInfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Виконуємо скрол лише для колонки "todo"
    if (columnId !== "todo" || !repoUrl) return;

    if (observer.current && bottomRef.current) {
      observer.current.unobserve(bottomRef.current);
    }

    observer.current = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !loading) {
          try {
            const data = await fetchData(repoUrl, perPage, page);
            setData(data);
          } catch (error) {
            console.error("Помилка при отриманні даних з сервера:", error);
          }
        }
      },
      { threshold: 1.0 }
    );

    if (bottomRef.current) {
      observer.current.observe(bottomRef.current);
    }

    return () => {
      if (observer.current && bottomRef.current) {
        observer.current.unobserve(bottomRef.current);
      }
    };
  }, [columnId, repoUrl, hasMore, loading, page, perPage, fetchData, setData]);

  return bottomRef;
};
