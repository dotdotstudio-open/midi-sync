import { useCallback } from "react"
import { Button, Flex } from "antd"
import { useSetClef } from "./clef-context"

export const ClefSelector = () => {
  const setClef = useSetClef()

  const setClef1 = useCallback(() => {
    setClef('𝄞')
  }, [setClef])

  const setClef2 = useCallback(() => {
    setClef('𝄢')
  }, [setClef])


  return (
    <Flex dir='row'>
        <Button onClick={setClef1}>𝄞</Button>
        <Button onClick={setClef2}>𝄢</Button>
    </Flex>
  )
}
