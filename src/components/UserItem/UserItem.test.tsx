import { mockUsers } from "@/test/fixtures"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import { UserItem } from "./UserItem"

vi.mock("../RepositoryList/RepositoryList", () => ({
  RepositoryList: () => <div data-testid="repository-list" />,
}))

describe("UserItem", () => {
  const mockUser = mockUsers[0]
  let mockOnToggle: (username: string) => void

  beforeEach(() => {
    vi.clearAllMocks()
    mockOnToggle = vi.fn()
  })
  it("should render user avatar and login name", () => {
    render(
      <UserItem user={mockUser} isExpanded={false} onToggle={mockOnToggle} />,
    )

    const avatar = screen.getByAltText("testuser")
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute(
      "src",
      "https://avatars.githubusercontent.com/u/1",
    )
  })

  it("should have aria-expanded true when expanded", () => {
    render(
      <UserItem user={mockUser} isExpanded={true} onToggle={mockOnToggle} />,
    )

    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true")
  })

  it("should have aria-expanded false when collapsed", () => {
    render(
      <UserItem user={mockUser} isExpanded={false} onToggle={mockOnToggle} />,
    )

    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false")
  })

  it("should call onToggle with correct username when clicked", async () => {
    render(
      <UserItem user={mockUser} isExpanded={false} onToggle={mockOnToggle} />,
    )
    const user = userEvent.setup()
    await user.click(screen.getByRole("button"))

    expect(mockOnToggle).toHaveBeenCalledWith(mockUser.login)
  })

  it("should render RepositoryList when expanded", () => {
    render(
      <UserItem user={mockUser} isExpanded={true} onToggle={mockOnToggle} />,
    )
    expect(screen.getByTestId("repository-list")).toBeInTheDocument()
  })

  it("should not render RepositoryList when collapsed", () => {
    render(
      <UserItem user={mockUser} isExpanded={false} onToggle={mockOnToggle} />,
    )
    expect(screen.queryByTestId("repository-list")).not.toBeInTheDocument()
  })
})
