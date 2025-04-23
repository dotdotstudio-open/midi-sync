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

  const setClef3 = useCallback(() => {
    setClef('𝄡')
  }, [setClef])


  return (
    <Flex dir='row' gap={20}>
        <Button type='primary' size='large' onClick={setClef1}>𝄞</Button>
        <Button type='primary' size='large' onClick={setClef3}>𝄡</Button>
        <Button type='primary' size='large' onClick={setClef2}>𝄢</Button>
    </Flex>
  )
}
