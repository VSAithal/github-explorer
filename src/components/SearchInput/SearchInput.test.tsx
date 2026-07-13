import { fireEvent, render, screen } from "@testing-library/react"
import { SearchInput } from "./SearchInput"

describe("SearchInput", () => {
  const mockOnChange = vi.fn()
  const mockOnSearch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })
  it("should render the input field and search button", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        placeholder="Search GitHub users..."
      />,
    )

    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument()
  })

  it("should call onChange when user types", async () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        placeholder="Search GitHub users..."
      />,
    )
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test" },
    })
    expect(mockOnChange).toHaveBeenCalledWith("test")
  })

  it("should call onSearch when search button is clicked", () => {
    render(
      <SearchInput
        value="test"
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        placeholder="Search GitHub users..."
      />,
    )

    fireEvent.click(screen.getByRole("button", { name: "Search" }))
    expect(mockOnSearch).toHaveBeenCalledTimes(1)
  })

  it("should call onSearch when enter key is pressed", () => {
    render(
      <SearchInput
        value="test"
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        placeholder="Search GitHub users..."
      />,
    )

    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" })
    expect(mockOnSearch).toHaveBeenCalledTimes(1)
  })

  it("should not show clear button when the input is empty", () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        placeholder="Search GitHub users..."
      />,
    )

    expect(
      screen.queryByRole("button", { name: "Clear search" }),
    ).not.toBeInTheDocument()
  })

  it("should show the clear button when input has a value", () => {
    render(
      <SearchInput
        value="test"
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        placeholder="Search GitHub users..."
      />,
    )
    expect(
      screen.queryByRole("button", { name: "Clear search" }),
    ).toBeInTheDocument()
  })

  it("should call onChange with empty string when clear button is clicked", () => {
    render(
      <SearchInput
        value="test"
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        placeholder="Search GitHub users..."
      />,
    )

    expect(
      screen.queryByRole("button", { name: "Clear search" }),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Clear search" }))

    expect(mockOnChange).toHaveBeenCalledWith("")
  })
})
