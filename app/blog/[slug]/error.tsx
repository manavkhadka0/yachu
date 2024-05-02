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
    <div className='flex flex-col justify-center items-center pt-44 md:pt-48'>
      <h2 className='text-gray-500 text-xl sm:text-3xl '>404 ERROR !!!</h2>
      <h2 className='text-gray-800 pt-2 font-black md:font-bold text-2xl sm:text-5xl'>Something went wrong!</h2>
      <button className='text-xl text-gray-500 pt-5 md:pt-8 sm:font-semibold'
        onClick={
          () => reset()
        }
      >
        Try again
      </button> 
    </div>
  )
}