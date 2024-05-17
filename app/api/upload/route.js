import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { title, subtitle, description, read, blog, imageUrl } =
    await request.json();

  const newBlog = await prisma.Post.create({
    data: {
      title,
      subtitle,
      description,
      read,
      blog,
      imageUrl,
      authorId: currentUser.id,
    },
  });

  return NextResponse.json(newBlog);
};
