import prisma from "@/app/db";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export const PUT = async (request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const {
    authorId,
    blogId,
    title,
    subtitle,
    description,
    read,
    imageUrl,
    blog,
  } = await request.json();

  if (currentUser.id !== authorId) {
    return NextResponse.error();
  }

  const editedBlog = await prisma.Post.update({
    where: {
      id: blogId,
    },
    data: {
      title,
      subtitle,
      description,
      read,
      imageUrl,
      blog,
    },
  });

  return NextResponse.json(editedBlog);
};
