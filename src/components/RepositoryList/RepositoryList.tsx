import { useUserRepositories } from "@/hooks/useUserRepositories"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import { RepositoryItem } from "../RepositoryItem/RepositoryItem"

export const RepositoryList = ({ username }: { username: string }) => {
  const {
    isUserRepositoriesLoading,
    isUserRepositoriesError,
    userRepositories,
    userRepositoriesError,
  } = useUserRepositories(username)

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
    <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-6 pt-2 pb-2">
      {userRepositories.map((repo) => (
        <RepositoryItem key={repo.id} repository={repo} />
      ))}
    </div>
  )
}
