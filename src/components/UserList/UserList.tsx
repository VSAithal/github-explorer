import { useSearchUsers } from "@/hooks/useSearchUsers"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import { UserItem } from "../UserItem/UserItem"

export const UserList = ({
  debouncedQuery,
  selectedUsername,
  onToggle,
}: {
  debouncedQuery: string
  selectedUsername: string | null
  onToggle: (username: string) => void
}) => {
  const { isSearchError, isSearchLoading, searchResults, searchError } =
    useSearchUsers(debouncedQuery)

  if (!debouncedQuery || debouncedQuery.trim().length < 3) return null

  if (isSearchLoading)
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    )

  if (searchError && isSearchError)
    return <ErrorMessage message={searchError.message} />

  if (!searchResults || searchResults?.items.length === 0)
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">No Users</p>
    )

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        Showing users for "{debouncedQuery}"
      </p>
      {searchResults.items.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          onToggle={onToggle}
          isExpanded={selectedUsername === user.login}
        />
      ))}
    </div>
  )
}
