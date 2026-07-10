import { fetchUserRepositories } from "@/api/github"
import { useQuery } from "@tanstack/react-query"

export const useUserRepositories = (username: string | null) => {
  const {
    data: userRepositories,
    isLoading: isUserRepositoriesLoading,
    error: userRepositoriesError,
    isFetching: isUserRepositoriesFetching,
    isError: isUserRepositoriesError,
  } = useQuery({
    queryKey: ["repos", username],
    queryFn: () => fetchUserRepositories(username!),
    enabled: username !== null,
  })

  return {
    userRepositories,
    isUserRepositoriesLoading,
    userRepositoriesError,
    isUserRepositoriesError,
    isUserRepositoriesFetching,
  }
}
