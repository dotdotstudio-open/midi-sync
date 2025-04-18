import { MidiSyncServiceContract, StartPlaybackTriggerRequest, StopPlaybackRequest } from '@dotdot/services-midi-sync-contract'
import {WebSocketClient} from '@sidewinder/client'
import {EventHandler, EventListener, Events} from '@sidewinder/events'

export class MidiSyncServiceClient {
  private readonly client: WebSocketClient<typeof MidiSyncServiceContract>
  private readonly events: Events
  private syncOffset = 0

  constructor(endpoint: string){
    this.client = new WebSocketClient(MidiSyncServiceContract, endpoint)
    this.events = new Events()
    this.client.method('startPlayback', (event) => this.events.send('startPlayback', {serverTime: event.serverTime + this.syncOffset, startDelayMs: event.startDelayMs}))
    this.client.method('stopPlayback', (event) => this.events.send('stopPlayback', event))
    this.client.event('error', error => console.error('[Midi Sync Service Client] Connection error: ', error))
  }

  public sync = async () => {
    const clientTime = Date.now()
    const response = await this.client.call('getSyncState', undefined)
    const responseTime = Date.now()
    const roundTripLatency = responseTime - clientTime
    const approxServerResponseTime = clientTime + (roundTripLatency / 2)
    const estimateServerTimeOffset = approxServerResponseTime - response.serverTime // calculate for server => client time transform
    this.syncOffset += (estimateServerTimeOffset - this.syncOffset) * 0.9 // use simple low pass filter to smooth latency variations

    // trigger sync time update with updated latency
    if (response.syncTime > 0) {
      const playbackTime = response.serverTime + this.syncOffset
      const startTime = playbackTime - response.syncTime
      this.events.send('syncPlayback', {startTime})
    }
  }

  public triggerStart = async (startDelayMs: number, restart?: boolean) => {
    if (restart) {
      await this.client.call('startPlayback', {
        startDelayMs,
        restart
      })  
    } else {
      await this.client.call('startPlayback', {
        startDelayMs
      })
    }
  }

  public triggerStop = async () => {
    await this.client.call('stopPlayback', undefined)
  }

  public on(event: 'syncPlayback', handler: EventHandler<{startTime: number}>): EventListener
  public on(event: 'stopPlayback', handler: EventHandler<StopPlaybackRequest>): EventListener
  public on(event: 'startPlayback', handler: EventHandler<StartPlaybackTriggerRequest>): EventListener 
  public on(event: string, handler: EventHandler<any>): EventListener {
    return this.events.on(event, handler)
  }

  public dispose() {
    this.events.dispose()
    this.client.close()
  }
}