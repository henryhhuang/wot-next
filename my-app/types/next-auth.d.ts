import { Session, Profile } from "next-auth"

declare module "next-auth" {
    interface Session {
      user: {
        email: string,
        id: string
      }
    }
    
    interface Profile {
        email: string,
        name: string
    }
  }


