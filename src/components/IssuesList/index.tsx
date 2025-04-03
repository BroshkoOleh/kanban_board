import { useEffect, useRef } from "react";
import { useStore } from "../../store";
import IssueItem from "../IssueItem";

export default function IssuesList() {
  const { issues, loading, error, fetchIssues, hasMore, repoUrl } = useStore();
  const observer = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  console.log("IssuesList", repoUrl);

  // Викликаємо fetchIssues, коли користувач скролить до кінця
  useEffect(() => {
    if (!repoUrl) return; // Додана перевірка
    if (observer.current) return; // Якщо спостерігач вже є, не створюємо новий
    observer.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !loading) {
          fetchIssues(); // Вкажіть тут правильний URL репозиторію
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
  }, [hasMore, loading, fetchIssues]);

  return (
    <ul className="flex flex-col items-center p-5 gap-2.5 bg-gray-400 border border-black h-[540.4px] overflow-y-auto">
      {issues.map((item) => (
        <IssueItem key={item.id} item={item} />
      ))}
      <div ref={bottomRef} className="h-2"></div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </ul>
  );
}
