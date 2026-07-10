import { searchUsers } from "@/api/github"
import { useQuery } from "@tanstack/react-query"

export const useSearchUsers = (query: string) => {
  const {
    data: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
    isFetching: isSearchFetching,
    isError: isSearchError,
  } = useQuery({
    queryKey: ["users", query],
    queryFn: () => searchUsers(query),
    enabled: query.trim().length >= 3,
  })

  return {
    searchResults,
    isSearchLoading,
    searchError,
    isSearchError,
    isSearchFetching,
  }
}
