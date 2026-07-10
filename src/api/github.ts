import type { GitHubRepository, SearchUsersResponse } from "@/types/github"
import { BASE_URL, BASIC_ERROR_MESSAGE } from "./constants"

export const searchUsers = async (
  query: string,
): Promise<SearchUsersResponse> => {
  console.log("query", query)
  const response = await fetch(
    `${BASE_URL}/search/users?q=${encodeURIComponent(query)}&per_page=5`,
  )

  if (!response.ok) {
    let errorMessage = BASIC_ERROR_MESSAGE
    try {
      const errorData = await response.json()
      if (errorData && errorData.message) {
        errorMessage = errorData.message
      }
    } catch {
      if (response.status === 403) {
        throw new Error("API rate limit exceeded. Please try again later.")
      } else if (response.status === 422) {
        throw new Error("Invalid search query. Please check your input.")
      } else {
        throw new Error(errorMessage)
      }
    }
    throw new Error(errorMessage)
  }
  const data: SearchUsersResponse = await response.json()
  return data
}

export const fetchUserRepositories = async (
  userName: string,
): Promise<GitHubRepository[]> => {
  const response = await fetch(
    `${BASE_URL}/users/${userName}/repos?per_page=100&sort=updated`,
  )

  if (!response.ok) {
    let errorMessage = BASIC_ERROR_MESSAGE
    try {
      const errorData = await response.json()
      if (errorData && errorData.message) {
        errorMessage = errorData.message
      }
    } catch {
      if (response.status === 403) {
        throw new Error("API rate limit exceeded. Please try again later.")
      } else if (response.status === 404) {
        throw new Error("User not found. Please check the username.")
      } else {
        throw new Error(errorMessage)
      }
    }
    throw new Error(errorMessage)
  }

  const data: GitHubRepository[] = await response.json()
  return data
}
