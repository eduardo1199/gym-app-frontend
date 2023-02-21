import { createContext, ReactNode, useEffect, useState } from "react";

export const ViewPortContext = createContext(false)

const BREAK_POINT = 1024

interface ViewPortProviderProps {
  children: ReactNode
}

export function ViewPortProvider({ children }: ViewPortProviderProps) {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const matchMedia = window.matchMedia(`(max-width:${BREAK_POINT}px)`)

    window.addEventListener('resize', () => {
      setMatch(matchMedia.matches)
    })
  }, [])

  return (
    <ViewPortContext.Provider value={match}>
      {children}
    </ViewPortContext.Provider>
  )
}
