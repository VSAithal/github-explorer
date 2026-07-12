import { fetchUserRepositories } from "@/api/github"
import { renderHook, waitFor } from "@testing-library/react"
import { useUserRepositories } from "./useUserRepositories"
import { QueryWrapper } from "@/test/queryWrapper"
import { mockRepositories } from "@/test/fixtures"

vi.mock("@/api/github")

describe("useUserRepositories", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return user repositories on a successful fetch", async () => {
    vi.mocked(fetchUserRepositories).mockResolvedValue(mockRepositories)

    const { result } = renderHook(() => useUserRepositories("testuser"), {
      wrapper: QueryWrapper,
    })

    await waitFor(() => {
      expect(result.current.isUserRepositoriesLoading).toBe(false)
    })

    expect(result.current.userRepositories).toEqual(mockRepositories)
  })

  it("should display a loading indicator while fetching user repositories", async () => {
    vi.mocked(fetchUserRepositories).mockResolvedValue(mockRepositories)

    const { result } = renderHook(() => useUserRepositories("test"), {
      wrapper: QueryWrapper,
    })

    expect(result.current.isUserRepositoriesLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isUserRepositoriesLoading).toBe(false)
    })
  })

  it("should set isUserRepositoriesError to true when user is not found", async () => {
    vi.mocked(fetchUserRepositories).mockRejectedValue(
      new Error("User not found. Please check the username."),
    )

    const { result } = renderHook(() => useUserRepositories("invalid-user"), {
      wrapper: QueryWrapper,
    })

    await waitFor(() => {
      expect(result.current.isUserRepositoriesLoading).toBe(false)
    })

    expect(result.current.isUserRepositoriesError).toBe(true)
    expect(result.current.userRepositoriesError).toBeDefined()
    expect(result.current.userRepositoriesError?.message).toBe(
      "User not found. Please check the username.",
    )
  })

  it("should not fetch user repositories when username is null", async () => {
    const { result } = renderHook(() => useUserRepositories(null), {
      wrapper: QueryWrapper,
    })

    await waitFor(() => {
      expect(result.current.isUserRepositoriesLoading).toBe(false)
    })

    expect(result.current.userRepositories).toBeUndefined()
    expect(result.current.isUserRepositoriesError).toBe(false)
    expect(fetchUserRepositories).not.toHaveBeenCalled()
  })

  it("should set isUserRepositoriesError to true and display an error message on a failed fetch due to API rate limit", async () => {
    vi.mocked(fetchUserRepositories).mockRejectedValue(
      new Error("API rate limit exceeded. Please try again later."),
    )

    const { result } = renderHook(() => useUserRepositories("test"), {
      wrapper: QueryWrapper,
    })

    await waitFor(() => {
      expect(result.current.isUserRepositoriesLoading).toBe(false)
    })

    expect(result.current.isUserRepositoriesError).toBe(true)
    expect(result.current.userRepositoriesError).toBeDefined()
    expect(result.current.userRepositoriesError?.message).toBe(
      "API rate limit exceeded. Please try again later.",
    )
  })
})
