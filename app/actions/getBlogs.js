import prisma from "../db";

export const getBlogs = async () => {
  const blogs = await prisma.Post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return blogs;
};
