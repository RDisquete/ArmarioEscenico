/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_ID: string;
  // añade aquí otras variables si las tienes...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}