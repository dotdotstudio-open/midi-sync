import dotenv_expand from 'dotenv-expand'
import dotenv from 'dotenv'

import { configuration } from './configuration'
dotenv_expand.expand(dotenv.config())

export const environment = configuration.resolve({
  // environment
  ...process.env,
})
