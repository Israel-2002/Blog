import prisma from "@/app/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  const { firstname, lastname, email, password, confirm_password } =
    await request.json();

  const existingUser = await prisma.User.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return NextResponse.error();
  }

  if (password.trim() !== confirm_password.trim()) {
    return NextResponse.error();
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.User.create({
    data: {
      firstname,
      lastname,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
};
