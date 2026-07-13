export interface GitHubUser {
  id: number
  login: string
  avatar_url: string
  html_url: string
  type: string
}

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  updated_at: string
  fork: boolean
  visibility: string
}

export interface SearchUsersResponse {
  total_count: number
  incomplete_results: boolean
  items: GitHubUser[]
}

// Represents the error response shape from the GitHub API
export type ApiError = {
  message: string
  documentation_url?: string
}
