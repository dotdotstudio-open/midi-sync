import { createContext, useContext } from "react"

export type Clef = '𝄞' | '𝄢' | '𝄡'

export const ClefOffsets: Record<Clef, number> = {
  '𝄞': -1,
  '𝄢': -6,
  '𝄡': 0
}

export type ClefContextType = {
  clef: Clef,
  setClef: (newClef: Clef) => void
}

export const ClefContext = createContext<ClefContextType>({
  clef: '𝄞',
  setClef: () => console.error('[Clef Context] Missing context provider')
})

export const useClef = () => {
  return useContext(ClefContext).clef
}

export const useSetClef = () => {
  return useContext(ClefContext).setClef
}
