declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      NEXTAUTH_URL: string
      URL: string
      NEXTAUTH_SECRET: string
      SANITY_TOKEN: string
      SANITY_WEBHOOK_SECRET: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
