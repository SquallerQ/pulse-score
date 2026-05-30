/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FOOTBALLDATA_KEY_API_FOOTBALL: string;
  readonly VITE_FOOTBALLDATA_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
