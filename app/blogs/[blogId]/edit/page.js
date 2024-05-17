import { getBlog } from "@/app/actions/getBlog";
import EditClient from "./EditClient";

const page = async ({ params }) => {
  const { blogId } = params;
  const blog = await getBlog(blogId);

  return <EditClient blogDetails={blog} />;
};

export default page;
