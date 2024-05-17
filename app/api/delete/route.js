import prisma from "@/app/db";
import { NextResponse } from "next/server";

export const DELETE = async (request) => {
  const { blogId, authorId, currentUser } = await request.json();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (currentUser.id !== authorId) {
    return NextResponse.error();
  }

  const blog = await prisma.Post.delete({
    where: {
      id: blogId,
    },
  });

  return NextResponse.json(blog);
};
