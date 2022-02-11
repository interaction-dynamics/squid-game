import { useEffect, useMemo, useState } from 'react'

const determineDisplaySize = width => ({
  sm: width > 640,
  md: width > 768,
  lg: width > 1024,
  xl: width > 1280,
  xl2: width > 1536,
})

const useResponsive = () => {
  const [currentDisplaySize, setCurrentDisplaySize] = useState(
    determineDisplaySize(typeof window !== 'undefined' ? window.innerWidth : 0)
  )

  useEffect(() => {
    const handler = () =>
      setCurrentDisplaySize(
        determineDisplaySize(
          typeof window !== 'undefined' ? window.innerWidth : 0
        )
      )
    window.addEventListener('resize', handler)

    setCurrentDisplaySize(
      determineDisplaySize(
        typeof window !== 'undefined' ? window.innerWidth : 0
      )
    )
    return () => window.removeEventListener('resize', handler)
  }, [])

  return useMemo(() => currentDisplaySize, [currentDisplaySize])
}

export default useResponsive
