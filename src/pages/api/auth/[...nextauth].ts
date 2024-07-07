import Admin from "@/models/Admin";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { Provider } from "next-auth/providers/index";
import bcrypt from "bcrypt";
import connect from "@/lib/mongoose";

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
        const username = credentials?.username;
        const password = credentials?.password;
        await connect();
        let admin = await Admin.findOne({ username });
        try {
          if (admin) {
            const validPassword = bcrypt.compareSync(password!, admin.password);
            if (validPassword) {
              return admin;
            } else {
              return null;
            }
          } else {
            const hashedPassword = bcrypt.hashSync(password!, 10);
            admin = new Admin({ username: username, password: hashedPassword });
            await admin.save();
            return admin;
          }
        } catch (e) {
          console.log(e);
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
