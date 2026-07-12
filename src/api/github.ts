import type { GitHubRepository, SearchUsersResponse } from "@/types/github"
import { BASE_URL, BASIC_ERROR_MESSAGE } from "./constants"

export const searchUsers = async (
  query: string,
): Promise<SearchUsersResponse> => {
  let response: Response
  try {
    response = await fetch(
      `${BASE_URL}/search/users?q=${encodeURIComponent(query)}&per_page=5`,
    )
  } catch {
    throw new Error(
      "Network error. Please check your connection and try again.",
    )
  }

  if (!response.ok) {
    let errorMessage = BASIC_ERROR_MESSAGE
    try {
      const errorData = await response.json()
      if (errorData && errorData.message) {
        errorMessage = errorData.message
      }
    } catch {
      if (response.status === 403) {
        const resetTime = response.headers.get("x-ratelimit-reset")
        if (resetTime) {
          const time = new Date(parseInt(resetTime) * 1000).toLocaleTimeString()
          throw new Error(`API rate limit exceeded. Resets at ${time}.`)
        }
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
  let response: Response
  try {
    response = await fetch(
      `${BASE_URL}/users/${userName}/repos?per_page=100&sort=updated`,
    )
  } catch {
    throw new Error(
      "Network error. Please check your connection and try again.",
    )
  }

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
