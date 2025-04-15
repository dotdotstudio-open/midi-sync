import { useCallback } from "react"
import { useMidiSyncClient } from "./midi-sync-client-context"
import { Button } from "antd"

export const MidiPlaybackControls = () => {
  const client = useMidiSyncClient()

  const triggerPlayback = useCallback(() => {
    client?.triggerStart(500)
  }, [client])

  return (
    <Button onClick={triggerPlayback}>Start Playback</Button>
  )
}