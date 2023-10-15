"use client";
import { Button } from '@nextui-org/button';
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Da hat etwas nicht geklappt!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        neu laden
      </Button>
    </div>
  )
}