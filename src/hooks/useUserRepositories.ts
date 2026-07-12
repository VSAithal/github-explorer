import { fetchUserRepositories } from "@/api/github"
import { useQuery } from "@tanstack/react-query"

export const useUserRepositories = (userName: string | null) => {
  const {
    data: userRepositories,
    isLoading: isUserRepositoriesLoading,
    error: userRepositoriesError,
    isFetching: isUserRepositoriesFetching,
    isError: isUserRepositoriesError,
  } = useQuery({
    queryKey: ["repos", userName],
    queryFn: () => fetchUserRepositories(userName!),
    enabled: userName !== null,
  })

  return {
    userRepositories,
    isUserRepositoriesLoading,
    userRepositoriesError,
    isUserRepositoriesError,
    isUserRepositoriesFetching,
  }
}
