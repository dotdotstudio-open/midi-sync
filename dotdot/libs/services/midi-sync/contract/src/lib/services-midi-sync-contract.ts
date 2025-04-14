import { Type, Static } from '@sidewinder/contract'

// ---------------------------------------------------------------
//
// Sync Methods
//
// ---------------------------------------------------------------

// ---------------------------------------------------------------
// Get Sync State
// ---------------------------------------------------------------

export type GetSyncStateRequest = Static<typeof GetSyncStateRequest>
export type GetSyncStateResponse = Static<typeof GetSyncStateResponse>
export const GetSyncStateRequest = Type.Void()
export const GetSyncStateResponse = Type.Object({
  serverTime: Type.Number(),
  syncTime: Type.Number(),
})

export type StartPlaybackRequest = Static<typeof StartPlaybackRequest>
export type StartPlaybackResponse = Static<typeof StartPlaybackResponse>
export const StartPlaybackRequest = Type.Object({
  startDelayMs: Type.Number(),
  restart: Type.Optional(Type.Boolean()),
})
export const StartPlaybackResponse = Type.Boolean()

export type StartPlaybackTriggerRequest = Static<typeof StartPlaybackTriggerRequest>
export const StartPlaybackTriggerRequest = Type.Object({
  serverTime: Type.Number(),
  startDelayMs: Type.Number(),
})

export type StopPlaybackRequest = Static<typeof StopPlaybackRequest>
export type StopPlaybackResponse = Static<typeof StopPlaybackResponse>
export const StopPlaybackRequest = Type.Void()
export const StopPlaybackResponse = Type.Void()

// ---------------------------------------------------------------
// Sync Service Contract
// ---------------------------------------------------------------

export const MidiSyncServiceContract = Type.Contract({
  format: 'msgpack',
  server: {
    getSyncState: Type.Function([GetSyncStateRequest], GetSyncStateResponse),
    startPlayback: Type.Function([StartPlaybackRequest], StartPlaybackResponse),
    stopPlayback: Type.Function([StopPlaybackResponse], StopPlaybackResponse),
  },
  client: {
    startPlayback: Type.Function([StartPlaybackTriggerRequest], Type.Void()),
    stopPlayback: Type.Function([Type.Void()], Type.Void())
  },
})
