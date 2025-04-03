export const formatDate = (dateString: string): string => {
  const date: Date = new Date(dateString);
  const now: Date = new Date();
  const diffTime: number = Math.abs(now.getTime() - date.getTime());
  const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffHours: number = Math.ceil(diffTime / (1000 * 60 * 60));

  if (diffDays > 1) {
    return `${diffDays} days ago`;
  } else if (diffDays === 1) {
    return `yesterday`;
  } else {
    return `${diffHours} hours ago`;
  }
};
