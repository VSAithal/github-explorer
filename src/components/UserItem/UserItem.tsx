import type { GitHubUser } from "@/types/github"
import { ChevronDown, ChevronUp } from "lucide-react"
import { RepositoryList } from "../RepositoryList/RepositoryList"

export const UserItem = ({
  user,
  isExpanded,
  onToggle,
}: {
  user: GitHubUser
  isExpanded: boolean
  onToggle: (username: string) => void
}) => {
  return (
    <div className="w-full border rounded-lg bg-card overflow-hidden">
      <button
        onClick={() => onToggle(user.login)}
        className="flex items-center gap-3 w-full p-4 hover:bg-muted cursor-pointer transition-colors"
        aria-expanded={isExpanded}
      >
        <img
          src={user.avatar_url}
          alt={user.login}
          className="size-8 rounded-full"
        />

        <span className="flex-1 text-left font-medium">{user.login}</span>

        {isExpanded ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
      </button>

      {isExpanded && (
        <div className="p-3 border-t">
          <RepositoryList username={user.login} />
        </div>
      )}
    </div>
  )
}
