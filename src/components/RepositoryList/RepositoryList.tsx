import { useUserRepositories } from "@/hooks/useUserRepositories"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import { RepositoryItem } from "../RepositoryItem/RepositoryItem"

export const RepositoryList = ({ userName }: { userName: string }) => {
  const {
    isUserRepositoriesLoading,
    isUserRepositoriesError,
    userRepositories,
    userRepositoriesError,
  } = useUserRepositories(userName)

  if (isUserRepositoriesLoading)
    return (
      <div className="flex justify-center py-4">
        <LoadingSpinner />
      </div>
    )

  if (isUserRepositoriesError && userRepositoriesError)
    return <ErrorMessage message={userRepositoriesError.message} />

  if (!userRepositories || userRepositories.length === 0)
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">
        No public repositories found
      </p>
    )

  return (
    <div className="flex flex-col gap-3">
      {userRepositories.map((repo) => (
        <RepositoryItem key={repo.id} repository={repo} />
      ))}
    </div>
  )
}
