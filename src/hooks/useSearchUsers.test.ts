import { QueryWrapper } from "@/test/queryWrapper"
import { useSearchUsers } from "./useSearchUsers"
import { renderHook, waitFor } from "@testing-library/react"
import { searchUsers } from "@/api/github"
import { mockSearchResponse } from "@/test/fixtures"

vi.mock("@/api/github")

describe("useSearchUsers", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return search results on a successful search", async () => {
    vi.mocked(searchUsers).mockResolvedValue(mockSearchResponse)
    const { result } = renderHook(() => useSearchUsers("testuser"), {
      wrapper: QueryWrapper,
    })

    await waitFor(() => {
      expect(result.current.isSearchLoading).toBe(false)
    })

    expect(result.current.searchResults).toBeDefined()
    expect(result.current.searchResults?.total_count).toBe(
      mockSearchResponse.total_count,
    )
    expect(result.current.searchResults?.items[0].login).toBe(
      mockSearchResponse.items[0].login,
    )
  })

  it("should display a loading indicator while searching", async () => {
    vi.mocked(searchUsers).mockResolvedValue(mockSearchResponse)

    const { result } = renderHook(() => useSearchUsers("testuser"), {
      wrapper: QueryWrapper,
    })

    expect(result.current.isSearchLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isSearchLoading).toBe(false)
    })
  })

  it("should set isSearchError to true and display an error message on a failed search", async () => {
    vi.mocked(searchUsers).mockRejectedValue(
      new Error("API rate limit exceeded. Please try again later."),
    )

    const { result } = renderHook(() => useSearchUsers("testuser"), {
      wrapper: QueryWrapper,
    })

    await waitFor(() => {
      expect(result.current.isSearchLoading).toBe(false)
    })

    expect(result.current.isSearchError).toBe(true)
    expect(result.current.searchError).toBeDefined()
    expect(result.current.searchError?.message).toBe(
      "API rate limit exceeded. Please try again later.",
    )
  })

  it("should not trigger the search if the query is less than 3 characters", async () => {
    const { result } = renderHook(() => useSearchUsers("ab"), {
      wrapper: QueryWrapper,
    })

    await waitFor(() => {
      expect(result.current.isSearchLoading).toBe(false)
    })

    expect(result.current.searchResults).toBeUndefined()
    expect(result.current.isSearchError).toBe(false)
    expect(searchUsers).not.toHaveBeenCalled()
  })

  it("should set isSearchError to true and display an error message on an invalid search query", async () => {
    vi.mocked(searchUsers).mockRejectedValue(
      new Error("Invalid search query. Please check your input."),
    )

    const { result } = renderHook(() => useSearchUsers("invalid!="), {
      wrapper: QueryWrapper,
    })

    await waitFor(() => {
      expect(result.current.isSearchLoading).toBe(false)
    })

    expect(result.current.isSearchError).toBe(true)
    expect(result.current.searchError).toBeDefined()
    expect(result.current.searchError?.message).toBe(
      "Invalid search query. Please check your input.",
    )
  })
})
