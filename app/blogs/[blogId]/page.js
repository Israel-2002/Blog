import { getBlog } from "@/app/actions/getBlog";
import BlogDetails from "./BlogDetails";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

const Blog = async ({ params }) => {
  const { blogId } = params;
  const blog = await getBlog(blogId);
  const currentUser = await getCurrentUser();

  return <BlogDetails blog={blog} currentUser={currentUser} />;
};

export default Blog;
