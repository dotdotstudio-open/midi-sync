import { ReactNode, useMemo, useState } from "react"
import { Clef, ClefContext } from "./clef-context"

export type ClefContextProviderProps = {
  children: ReactNode
}

export const ClefContextProvider = ({
  children
}: ClefContextProviderProps) => {
  const [clef, setClef] = useState<Clef>('𝄞')

  const contextValue = useMemo(() => {
    return {
      clef,
      setClef
    }
  }, [clef, setClef])

  return (
    <ClefContext.Provider value={contextValue}>
      {children}
    </ClefContext.Provider>
  )
}
