import { useEffect, useRef } from "react";
import { useStore } from "../../store/store";
import IssueItem from "../IssueItem";
import { fetchIssues } from "../../utils/API/api";

export default function IssuesList() {
  const { issues, loading, error, repoUrl, hasMore, setIssuesData, page, perPage } = useStore();
  const observer = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!repoUrl) return; // Якщо немає URL, виходимо

    // Очищаємо попередній спостерігач, якщо він існує
    if (observer.current && bottomRef.current) {
      observer.current.unobserve(bottomRef.current);
    }

    observer.current = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !loading) {
          try {
            const issuesData = await fetchIssues(repoUrl, perPage, page);
            setIssuesData(issuesData);
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
  }, [hasMore, loading, page, repoUrl, perPage, setIssuesData]);

  return (
    <ul className="flex flex-col items-center p-5 gap-2.5 bg-gray-400 border border-black h-[540.4px] overflow-y-auto">
      {issues.map((item) => (
        <IssueItem key={item.id} item={item} />
      ))}
      {issues.length > 0 && <div ref={bottomRef} className="h-2"></div>}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </ul>
  );
}
