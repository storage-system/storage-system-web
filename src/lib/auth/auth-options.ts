import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials'
import { jwtDecode } from "jwt-decode";
import axios from "axios"

const apiUrl = process.env.NEXT_PUBLIC_STORAGE_SYSTEM_API_URL

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { data } = await axios.post(`${apiUrl}sessions`, {
          email: credentials?.email,
          password: credentials?.password,
        })
        const userResponse = jwtDecode(data.access_token);
        if (userResponse) {
          const user = {
            ...userResponse,
            access_token: data.access_token,
          }
          return {
            ...data,
            ...userResponse,
          }
        } else {
          return null
        }
      },
    }),
    /* GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }) */
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 60 minutes
  },
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        /* data.token.email = data.user.email
        data.token.id = data.user.id */
      }

      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.name = token.name
        session.user.email = token.email
        session.user.access_token = String(token.access_token)
        session.user.id = String(token.id)
      }
      return session
    },
  },
}