import { useStore, IssuesState } from "../../store/store";
import { memo } from "react";

function RepoTitle() {
  // const { repoData } = useStore();
  const selectRepoData = (state: IssuesState) => state.repoData;
  const repoData = useStore(selectRepoData);

  if (!repoData || Object.keys(repoData).length === 0) return null;

  return (
    <div className="flex items-center justify-left gap-4 py-4">
      {repoData.owner?.login && repoData.name && (
        <p className="flex text-blue-600 gap-2">
          <a
            href={`https://github.com/${repoData.owner.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {repoData.owner.login}
          </a>
          <span>&gt;</span>
          <a
            href={`https://github.com/${repoData.owner.login}/${repoData.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {repoData.name.charAt(0).toUpperCase() + repoData.name.slice(1)}
          </a>
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
export default memo(RepoTitle);
