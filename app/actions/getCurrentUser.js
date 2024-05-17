import prisma from "../db";
import { getServerSession } from "next-auth";
import NextAuth from "next-auth/next";

export const getCurrentUser = async () => {
  const session = await getServerSession(NextAuth);

  if (!session?.user) {
    return null;
  }

  const currentUser = await prisma.User.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    return null;
  }

  return currentUser;
};
