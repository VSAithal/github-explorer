import { Star } from "lucide-react"
import type { GitHubRepository } from "@/types/github"
import { Badge } from "../ui/badge"

export const RepositoryItem = ({
  repository,
}: {
  repository: GitHubRepository
}) => {
  const { name, description, html_url, stargazers_count } = repository

  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b last:border-b-0">
      <div className="flex flex-col gap-1 min-w-0">
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium hover:text-primary hover:underline underline-offset-4 truncate"
        >
          {name}
        </a>
        {description && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {description}
          </p>
        )}
        {repository.language && (
          <Badge variant="outline" className="w-fit text-xs">
            {repository.language}
          </Badge>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1 text-muted-foreground">
        <Star className="size-3.5" />
        <span className="text-xs font-medium">{stargazers_count}</span>
      </div>
    </div>
  )
}
