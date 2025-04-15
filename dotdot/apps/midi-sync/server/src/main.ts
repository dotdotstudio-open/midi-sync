import { environment } from './environment/environment'
import { Host } from '@sidewinder/server'
import cors from 'cors'
import { resolveMidiSyncService } from './services/midi-sync-service'
import {RequestHandler} from 'express'

const defaultRequestHandler: RequestHandler = (_, res) => {res.send('Midi Sync Server')}

async function start() {
  const host = new Host({ maxSocketCount: environment.SERVICE_MAX_SOCKET_COUNT })
  host.use(cors())
  host.use('/sync', await resolveMidiSyncService())
  host.use('/', defaultRequestHandler)
  return host.listen(environment.SERVICE_PORT)
}

start().then(() => console.log('Social Server on Port', environment.SERVICE_PORT))
