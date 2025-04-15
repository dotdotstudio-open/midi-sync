const servicesDomain = import.meta.env.VITE_SERVICES_DOMAIN
  ? `${import.meta.env.VITE_SERVICES_DOMAIN}.`
  : ''
const servicesPort = import.meta.env.VITE_SERVICES_PORT
  ? `:${import.meta.env.VITE_SERVICES_PORT}`
  : ''
const servicesHost =
  import.meta.env.VITE_SERVICES_HOST_OVERRIDE ||
  `${window.location.protocol.replace(
    'http',
    'ws'
  )}//${servicesDomain}${window.location.hostname.replace(
    'www.',
    ''
  )}${servicesPort}`

export const environment = {
  production: import.meta.env.PROD,
  servicesHost,
  syncEndpoint: `${servicesHost}/sync`,
  appDomain: `${window.location.protocol}//${window.location.hostname.replace(
    'www.',
    ''
  )}${window.location.port ? `:${window.location.port}` : ''}`,
}
