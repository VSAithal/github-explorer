import { useRef, useState } from "react"
import { SearchInput } from "./components/SearchInput/SearchInput"
import { debounce } from "./utils/debounce"
import { UserList } from "./components/UserList/UserList"

const App = () => {
  const [inputValue, setInputValue] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null)
  const debouncedSetQuery = useRef(
    debounce((value: string) => {
      setDebouncedQuery(value)
    }, 300),
  )

  const handleInputChange = (value: string) => {
    setInputValue(value)
    if (!value) {
      setDebouncedQuery("")
      setSelectedUsername(null)
    } else {
      debouncedSetQuery.current(value)
    }
  }

  const handleSearch = () => {
    setDebouncedQuery(inputValue)
  }

  const handleToggle = (username: string) => {
    setSelectedUsername((prev) => (prev === username ? null : username))
  }

  return (
    <div className="h-dvh flex flex-col bg-background">
      <header className="border-b bg-background shrink-0 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold tracking-tight mb-4">
            GitHub Explorer
          </h1>
          <SearchInput
            value={inputValue}
            onChange={handleInputChange}
            onSearch={handleSearch}
            placeholder="Search GitHub users..."
          />
        </div>
      </header>

      <main className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <UserList
            debouncedQuery={debouncedQuery}
            selectedUsername={selectedUsername}
            onToggle={handleToggle}
          />
        </div>
      </main>
    </div>
  )
}

export default App
