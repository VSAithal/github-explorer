import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const sizeClasses = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
} as const

export const LoadingSpinner = ({
  size = "md",
  className = "",
  ...props
}: {
  size?: "sm" | "md" | "lg"
  className?: string
}) => {
  return (
    <Loader2
      role="status"
      aria-label="Loading"
      className={cn("animate-spin", sizeClasses[size], className)}
      {...props}
    />
  )
}
