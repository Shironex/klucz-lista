import { NextAuthOptions, getServerSession } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "./db/db";
import { env } from "@/env.mjs";


export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: DrizzleAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),

  ],
}

export const getUserSession = () => {
  return getServerSession(authOptions)
}