/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_REGISTER_API_URL: string;
    // Add other environment variables here as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
