import { Button } from "../ui/button"
import { Input } from "../ui/input"

export const SearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
}: {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  placeholder?: string
}) => {
  return (
    <div className="flex gap-2">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <Button onClick={onSearch}>Search</Button>
    </div>
  )
}
