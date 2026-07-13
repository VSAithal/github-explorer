import type { FallbackProps } from "react-error-boundary"

export const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4 p-8">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground text-sm">
          An unexpected error occurred. Please refresh the page.
        </p>
        <button
          onClick={resetErrorBoundary}
          className="text-sm underline underline-offset-4 hover:text-primary cursor-pointer"
        >
          Refresh page
        </button>
      </div>
    </div>
  )
}
