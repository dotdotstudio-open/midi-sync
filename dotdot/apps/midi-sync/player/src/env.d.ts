/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVICES_PORT: string;
  readonly VITE_APP_DOMAIN: string;
  readonly VITE_SERVICES_HOST_OVERRIDE: string;
  readonly VITE_SERVICES_DOMAIN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
