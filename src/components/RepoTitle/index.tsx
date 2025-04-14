import { useStore } from "../../store/store";

export default function RepoTitle() {
  const { repoData } = useStore();

  if (!repoData || Object.keys(repoData).length === 0) return null;

  return (
    <div className="flex items-center justify-left gap-4 py-4">
      {repoData.owner?.login && repoData.name && (
        <p className="flex text-blue-600 gap-2">
          <span>{repoData.owner.login}</span>
          <span>&gt;</span>
          <span>{repoData.name.charAt(0).toUpperCase() + repoData.name.slice(1)}</span>
        </p>
      )}
      {repoData.stargazers_count !== undefined && (
        <p className="flex items-center">
          <img className="w-6 h-6 pr-1" src="images/star.svg" alt="starIcon" />
          {repoData.stargazers_count >= 1000
            ? (repoData.stargazers_count / 1000).toFixed(1) + "k"
            : repoData.stargazers_count}{" "}
          stars
        </p>
      )}
    </div>
  );
}
