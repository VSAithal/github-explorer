import { X } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export const SearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  placeholder?: string
}) => {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch()
          }}
        />
        {value && (
          <button
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <Button onClick={onSearch}>Search</Button>
    </div>
  )
}
