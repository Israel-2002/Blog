import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/db";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email", placeholder: "Email Address" },
        password: { type: "password", placeholder: "Password" },
      },

      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.User.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const passwordMatches = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!passwordMatches) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  url: process.env.NEXTAUTH_URL,
};

export default NextAuth(authOptions);
