import { useSearchUsers } from "@/hooks/useSearchUsers"
import { render, screen } from "@testing-library/react"
import { UserList } from "./UserList"
import {
  mockEmptyUsersSearchResponse,
  mockSearchResponse,
} from "@/test/fixtures"

vi.mock("@/hooks/useSearchUsers")
vi.mock("../UserItem/UserItem", () => ({
  UserItem: ({ user }: { user: { login: string } }) => (
    <div data-testid="user-item">{user.login}</div>
  ),
}))

describe("UserList", () => {
  let mockOnToggle: (userName: string) => void

  beforeEach(() => {
    vi.clearAllMocks()
    mockOnToggle = vi.fn()
  })

  it("should show loading spinner while fetching", () => {
    vi.mocked(useSearchUsers).mockReturnValue({
      isSearchLoading: true,
      isSearchFetching: false,
      isSearchError: false,
      searchResults: undefined,
      searchError: null,
    })

    render(
      <UserList
        debouncedQuery="abc"
        onToggle={mockOnToggle}
        selectedUsername={null}
      />,
    )

    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("should show error message when fetch fails", () => {
    vi.mocked(useSearchUsers).mockReturnValue({
      isSearchLoading: false,
      isSearchFetching: false,
      isSearchError: true,
      searchResults: undefined,
      searchError: new Error("Invalid search query. Please check your input."),
    })

    render(
      <UserList
        debouncedQuery="ab!="
        onToggle={mockOnToggle}
        selectedUsername={null}
      />,
    )

    expect(screen.getByRole("alert")).toBeInTheDocument()
    expect(
      screen.getByText("Invalid search query. Please check your input."),
    ).toBeInTheDocument()
  })

  it("should show empty state when no users are found", () => {
    vi.mocked(useSearchUsers).mockReturnValue({
      isSearchLoading: false,
      isSearchError: false,
      searchResults: mockEmptyUsersSearchResponse,
      searchError: null,
      isSearchFetching: false,
    })

    render(
      <UserList
        debouncedQuery="ab!="
        onToggle={mockOnToggle}
        selectedUsername={null}
      />,
    )

    expect(screen.getByText("No Users")).toBeInTheDocument()
  })

  it("should render user items on successful fetch", () => {
    vi.mocked(useSearchUsers).mockReturnValue({
      isSearchLoading: false,
      isSearchError: false,
      searchResults: mockSearchResponse,
      searchError: null,
      isSearchFetching: false,
    })

    render(
      <UserList
        debouncedQuery="testuser"
        onToggle={mockOnToggle}
        selectedUsername={null}
      />,
    )

    expect(screen.getByTestId("user-item")).toBeInTheDocument()
  })

  it("should return null and renders nothing when debouncedQuery is too short", () => {
    vi.mocked(useSearchUsers).mockReturnValue({
      isSearchLoading: false,
      isSearchError: false,
      searchResults: undefined,
      searchError: null,
      isSearchFetching: false,
    })

    const { container } = render(
      <UserList
        debouncedQuery="ab"
        onToggle={mockOnToggle}
        selectedUsername={null}
      />,
    )

    expect(screen.queryByTestId("user-item")).not.toBeInTheDocument()
    expect(container).toBeEmptyDOMElement()
  })
})
