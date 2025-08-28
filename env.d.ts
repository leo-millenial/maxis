/// <reference types="vite/client" />

interface ViteTypeOptions {
  VITE_COMPANY_NAME: string
}

interface ImportMetaEnv {
  readonly VITE_COMPANY_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
