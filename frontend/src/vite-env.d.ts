/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_REGISTER_API_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
