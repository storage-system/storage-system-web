import type { DefaultSession, User } from 'next-auth'

declare module 'next-auth' {
  export interface User {
    sub: string
    name: string
    login: string
    email: string
    avatar?: string
    given_name: string
    family_name: string
    email_verified: boolean
    preferred_username: string
    access_token: string
    refreshToken: string
    name: string
    email: string
    contact: string
    responsible: string
    expireIn: string
  }

  export interface Session {
    user: User
    error: string
    id_token: string
    access_token: string
  }

  export interface Account {
    id: string
    type: string
    scope: string
    provider: string
    id_token: string
    expires_in: number
    token_type: string
    access_token: string
    refresh_token: string
    session_state: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User
    exp: number
    sub: string
    name: string
    email: string
    error: string
    avatar: string
    id_token: string
    expires_at: number
    refresh_token: string
    access_token: string
    contact: string
    responsible: string
  }

  export interface Session extends DefaultSession {
    token: JWT
  }
}
