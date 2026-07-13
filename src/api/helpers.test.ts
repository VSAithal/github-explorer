import { getRateLimitMessage } from "./helpers"

describe("getRateLimitMessage", () => {
  it("should return message with reset time when x-ratelimit-reset header exists", () => {
    const resetTimestamp = Math.floor(Date.now() / 1000) + 60
    const headers = new Headers({
      "x-ratelimit-reset": resetTimestamp.toString(),
    })
    const message = getRateLimitMessage(headers)
    const expectedTime = new Date(resetTimestamp * 1000).toLocaleTimeString()

    expect(message).toBe(`API rate limit exceeded. Resets at ${expectedTime}.`)
  })

  it("should return generic message when x-ratelimit-reset header does not exist", () => {
    const headers = new Headers()

    const message = getRateLimitMessage(headers)

    expect(message).toBe("API rate limit exceeded. Please try again later.")
  })

  it("should return generic message when headers object is empty", () => {
    const headers = new Headers({})

    const message = getRateLimitMessage(headers)

    expect(message).toBe("API rate limit exceeded. Please try again later.")
  })
})
