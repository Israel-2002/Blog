import prisma from "../db";

export const getBlog = async (blogId) => {
  try {
    const blog = await prisma.Post.findUnique({
      where: {
        id: blogId,
      },
      include: {
        user: true,
      },
    });

    if (!blog) {
      throw new Error();
    }

    return blog;
  } catch (error) {}
};
