import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { Provider } from "next-auth/providers/index";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: `${process.env.NEXT_GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.NEXT_GOOGLE_CLIENT_SECRET}`,
    }),
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ] as Provider[],
  secret: process.env.NEXTAUTH_URL,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
};

export default NextAuth(authOptions);
