import { MidiSyncServiceContract } from '@dotdot/services-midi-sync-contract'
import {WebSocketClient} from '@sidewinder/client'

export class MidiSyncServiceClient extends WebSocketClient<typeof MidiSyncServiceContract>{
  serverLatency: number = 0

  public updateStateSync = async () => {
    const sendTime = Date.now()
    const response = await this.call('getSyncState')
    const responseTime = Date.now()
    const roundTripLatency = sendTime - responseTime
    const serverSideLatency = response.serverTime - sendTime
  }

  public triggerStart = async (startDelayMs: number, restart?: boolean) => {
    if (restart) {
      await this.call('startPlayback', {
        startDelayMs,
        restart
      })  
    } else {
      await this.call('startPlayback', {
        startDelayMs
      })
    }
  }

  public triggerStop = async () => {
    await this.call('stopPlayback')
  }
}