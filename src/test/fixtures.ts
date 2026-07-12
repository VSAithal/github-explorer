import type {
  GitHubRepository,
  GitHubUser,
  SearchUsersResponse,
} from "@/types/github"

export const mockRepositories: GitHubRepository[] = [
  {
    id: 1,
    name: "test-repo",
    full_name: "test/test-repo",
    description: "A test repository",
    html_url: "https://github.com/test/test-repo",
    stargazers_count: 10,
    language: "TypeScript",
    updated_at: "2023-01-01T00:00:00Z",
    fork: false,
    visibility: "public",
  },
  {
    id: 2,
    name: "another-repo",
    full_name: "test/another-repo",
    description: "Another test repository",
    html_url: "https://github.com/test/another-repo",
    stargazers_count: 5,
    language: "JavaScript",
    updated_at: "2023-01-02T00:00:00Z",
    fork: false,
    visibility: "public",
  },
]

export const mockUsers: GitHubUser[] = [
  {
    id: 1,
    login: "testuser",
    avatar_url: "https://avatars.githubusercontent.com/u/1",
    html_url: "https://github.com/testuser",
    type: "User",
  },
]

export const mockSearchResponse: SearchUsersResponse = {
  total_count: 1,
  incomplete_results: false,
  items: mockUsers,
}
