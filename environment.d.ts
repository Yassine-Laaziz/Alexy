declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // next-auth
      NEXTAUTH_URL: string
      URL: string
      NEXTAUTH_SECRET: string
      // sanity
      SANITY_TOKEN: string
      SANITY_WEBHOOK_SECRET: string
      // mongodb
      MONGODB_URI: string
      // google provider
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      // stripe
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string
      STRIPE_SECRET_KEY: string
      STRIPE_WEBHOOK_SECRET: string
      // nodemailer
      user: string
      pass: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
