interface ErrorProps {
  message?: string
}

export const Error = ({ message = 'Something went wrong' }: ErrorProps) => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-red-600 text-center">
        <h3 className="text-lg font-semibold mb-2">Error</h3>
        <p>{message}</p>
      </div>
    </div>
  )
}
