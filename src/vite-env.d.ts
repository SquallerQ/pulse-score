/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FOOTBALLDATA_KEY_API_FOOTBALL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
