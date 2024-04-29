'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
  error, reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='flex flex-col justify-center items-center pt-56'>
      <h2 className='text-gray-500 text-3xl '>404 ERROR !!!</h2>
      <h2 className='text-gray-800 pt-2 font-extrabold text-6xl'>Something went wrong!</h2>
      <button className='text-xl text-gray-500 pt-8 font-semibold'
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}