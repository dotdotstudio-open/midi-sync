import { Configuration, Type } from '@sidewinder/config'

export const configuration = Configuration(Type.Object({
  // ----------------------------------------------------------------
  // PRODUCTION
  // ----------------------------------------------------------------
  PRODUCTION: Type.Boolean(),
  // ----------------------------------------------------------------
  // SERVICE
  // ----------------------------------------------------------------
  SERVICE_MAX_SOCKET_COUNT: Type.Number({ default: 4000 }),
  SERVICE_PORT: Type.Number({default: 5010}),
}))
