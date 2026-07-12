import { Star } from "lucide-react"
import type { GitHubRepository } from "@/types/github"
import { Badge } from "../ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

export const RepositoryItem = ({
  repository,
}: {
  repository: GitHubRepository
}) => {
  const { name, full_name, description, html_url, stargazers_count } =
    repository

  return (
    <Card className="w-full max-w-sm transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between gap-1">
        <div className="flex flex-col gap-1">
          <CardTitle>
            <a
              href={html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-primary hover:underline"
            >
              {name}
            </a>
          </CardTitle>
          <CardDescription>{full_name}</CardDescription>
        </div>
        <div className="flex shrink-0 items-center gap-1 text-muted-foreground">
          <Star className="size-3.5" />
          <span className="text-xs font-medium">{stargazers_count}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        )}

        {repository.language && (
          <Badge variant="outline">{repository.language}</Badge>
        )}
      </CardContent>
    </Card>
  )
}
