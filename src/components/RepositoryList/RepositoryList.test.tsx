import { useUserRepositories } from "@/hooks/useUserRepositories"
import { render, screen } from "@testing-library/react"
import { RepositoryList } from "./RepositoryList"
import { mockRepositories } from "@/test/fixtures"

vi.mock("@/hooks/useUserRepositories")

describe("RepositoryList", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should show loading spinner while fetching", () => {
    vi.mocked(useUserRepositories).mockReturnValue({
      isUserRepositoriesLoading: true,
      isUserRepositoriesError: false,
      isUserRepositoriesFetching: false,
      userRepositories: undefined,
      userRepositoriesError: null,
    })

    render(<RepositoryList userName="testuser" />)

    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("should show error message when fetch fails", () => {
    vi.mocked(useUserRepositories).mockReturnValue({
      isUserRepositoriesLoading: false,
      isUserRepositoriesError: true,
      userRepositories: undefined,
      userRepositoriesError: new Error(
        "User not found. Please check the username.",
      ),
      isUserRepositoriesFetching: false,
    })
    render(<RepositoryList userName="testuser" />)

    expect(screen.getByRole("alert")).toBeInTheDocument()
    expect(
      screen.getByText("User not found. Please check the username."),
    ).toBeInTheDocument()
  })

  it("should show empty state when user has no public repositories", () => {
    vi.mocked(useUserRepositories).mockReturnValue({
      isUserRepositoriesLoading: false,
      isUserRepositoriesError: false,
      userRepositories: [],
      userRepositoriesError: null,
      isUserRepositoriesFetching: false,
    })

    render(<RepositoryList userName="testuser" />)

    expect(screen.getByText("No public repositories found")).toBeInTheDocument()
  })
  it("should render repository items on successful fetch", () => {
    vi.mocked(useUserRepositories).mockReturnValue({
      isUserRepositoriesLoading: false,
      isUserRepositoriesError: false,
      userRepositories: mockRepositories,
      userRepositoriesError: null,
      isUserRepositoriesFetching: false,
    })

    render(<RepositoryList userName="testuser" />)

    expect(screen.getByText("test-repo")).toBeInTheDocument()
    expect(screen.getByText("another-repo")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "test-repo" })).toHaveAttribute(
      "href",
      "https://github.com/test/test-repo",
    )
  })
})
