import { jwtDecode } from 'jwt-decode'
import { NextAuthOptions } from 'next-auth'
import axios from 'axios'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

const apiUrl = process.env.NEXT_PUBLIC_STORAGE_SYSTEM_API_URL

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const { data } = await axios.post(`${apiUrl}sessions`, {
            email: credentials.email,
            password: credentials.password,
          })

          const userResponse = jwtDecode(data.access_token)

          if (userResponse) {
            return {
              ...data,
              ...userResponse,
            }
          }

          return null
        } catch (error) {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 60 minutes
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token = {
          ...token,
          user,
        }
      }

      return token
    },
    session: ({ session, token }) => {
      if (token?.user) {
        session.user = token.user
        session.user.id = String(token.id)
      }
      return session
    },
  },
}
