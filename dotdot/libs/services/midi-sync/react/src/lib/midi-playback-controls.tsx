import { useCallback } from "react"
import { useMidiSyncClient } from "./midi-sync-client-context"
import { Button, Flex } from "antd"

export const MidiPlaybackControls = () => {
  const client = useMidiSyncClient()

  const triggerPlayback = useCallback(() => {
    client?.triggerStart(500)
  }, [client])

  const triggerStop = useCallback(() => {
    client?.triggerStop()
  }, [client])

  return (
    <Flex dir='row'>
        <Button onClick={triggerPlayback}>Start Playback</Button>
        <Button onClick={triggerStop}>Stop Playback</Button>
    </Flex>
  )
}