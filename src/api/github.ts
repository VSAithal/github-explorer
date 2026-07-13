import type { GitHubRepository, SearchUsersResponse } from "@/types/github"
import {
  BASE_URL,
  BASIC_ERROR_MESSAGE,
  NETWORK_ERROR_MESSAGE,
} from "./constants"
import { getRateLimitMessage } from "./helpers"

export const searchUsers = async (
  query: string,
  signal?: AbortSignal,
): Promise<SearchUsersResponse> => {
  let response: Response
  try {
    response = await fetch(
      `${BASE_URL}/search/users?q=${encodeURIComponent(query)}&per_page=5`,
      { signal },
    )
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error
    }
    throw new Error(NETWORK_ERROR_MESSAGE, { cause: error })
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
        const rateLimitErrorMessage = getRateLimitMessage(response.headers)
        throw new Error(rateLimitErrorMessage)
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
  username: string,
  signal?: AbortSignal,
): Promise<GitHubRepository[]> => {
  let response: Response

  try {
    response = await fetch(
      `${BASE_URL}/users/${username}/repos?per_page=100&sort=updated`,
      { signal },
    )
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error
    }
    throw new Error(NETWORK_ERROR_MESSAGE, { cause: error })
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
        const rateLimitErrorMessage = getRateLimitMessage(response.headers)
        throw new Error(rateLimitErrorMessage)
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
