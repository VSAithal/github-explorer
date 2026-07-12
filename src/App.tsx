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
    <main className="min-h-screen bg-background">
      <h1>GitHub Explorer</h1>
      <SearchInput
        value={inputValue}
        onChange={handleInputChange}
        onSearch={handleSearch}
        placeholder="Search GitHub users..."
      />

      <UserList
        debouncedQuery={debouncedQuery}
        selectedUsername={selectedUsername}
        onToggle={handleToggle}
      />
    </main>
  )
}

export default App
