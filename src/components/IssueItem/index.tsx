import { Issue } from "../../types";
import { formatDate } from "../../utils/formatDate";

interface IssueItemProps {
  item: Issue;
}

export default function IssueItem({ item }: IssueItemProps) {
  return (
    <li className="flex flex-col items-start justify-start gap-1.5 border border-black rounded-2xl bg-white p-4 w-full -mx-5">
      <p className="text-left">{item.title}</p>
      <p>
        #{item.number} created {formatDate(item.created_at)}
      </p>

      <p>
        {item.user.login} | Comments: {item.comments}
      </p>
    </li>
  );
}
