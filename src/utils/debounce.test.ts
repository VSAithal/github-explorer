import { debounce } from "./debounce"

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should call the callback function after the specified delay", () => {
    const callback = vi.fn()
    const debouncedCallback = debounce(callback, 200)

    debouncedCallback()
    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(200)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("should not call the callback function before the delay has passed", () => {
    const callback = vi.fn()
    const debouncedCallback = debounce(callback, 200)

    debouncedCallback()
    expect(callback).not.toHaveBeenCalled()
    vi.advanceTimersByTime(100)
    expect(callback).not.toHaveBeenCalled()
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("should only call the callback function once if called multiple times within the delay", () => {
    const callback = vi.fn()
    const debouncedCallback = debounce(callback, 200)

    debouncedCallback()
    debouncedCallback()
    debouncedCallback()
    vi.advanceTimersByTime(200)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("should call the callback function with the correct arguments", () => {
    const callback = vi.fn()
    const debouncedCallback = debounce(callback, 200)

    debouncedCallback("arg1", "arg2")
    vi.advanceTimersByTime(200)
    expect(callback).toHaveBeenCalledWith("arg1", "arg2")
  })

  it("should reset the timer if called again before the delay has passed", () => {
    const callback = vi.fn()
    const debouncedCallback = debounce(callback, 200)

    debouncedCallback()
    vi.advanceTimersByTime(100)
    debouncedCallback()
    vi.advanceTimersByTime(100)
    expect(callback).not.toHaveBeenCalled()
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
