import { AlertCircleIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

export const ErrorMessage = ({
  message,
  title = "Error",
}: {
  message: string
  title?: string
}) => {
  return (
    <Alert variant="destructive" className="w-full">
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
