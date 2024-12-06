/// <reference types="vite-envs/client" />


type ImportMetaEnv = {
  // Auto-generated by `npx vite-envs update-types` and hot-reloaded by the `vite-env` plugin
  // You probably want to add `/src/vite-env.d.ts` to your .prettierignore
  BASE_URL: string
  MODE: string
  DEV: boolean
  PROD: boolean
  GITHUB_REPO_OWNER: string
  GITHUB_REPO_NAME: string
  GITHUB_REPO_BRANCH: string
  GITHUB_TOKEN: string
  PREFERED_LANGUAGE: string
  // @user-defined-start
  /*
   *  You can use this section to explicitly extend the type definition of `import.meta.env`
   *  This is useful if you're using Vite plugins that define specific `import.meta.env` properties.
   *  If you're not using such plugins, this section should remain as is.
   */
  SSR: boolean;
  // @user-defined-end
}



interface ImportMeta {
  // Auto-generated by `npx vite-envs update-types`

  url: string

  readonly hot?: import('vite-envs/types/hot').ViteHotContext

  readonly env: ImportMetaEnv

  glob: import('vite-envs/types/importGlob').ImportGlobFunction
}

