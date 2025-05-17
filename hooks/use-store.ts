'use client'

import { useState, useEffect } from 'react'

export function useStore<T, F>(
  store: (selector: (state: T) => F) => F,
  selector: (state: T) => F
): F | undefined {
  const result = store(selector)
  const [data, setData] = useState<F>()

  useEffect(() => {
    setData(result)
  }, [result])

  // Return the actual store value instead of the hydration-safe value
  // when we're on the client side
  if (typeof window !== 'undefined') {
    return result
  }

  return data
}
