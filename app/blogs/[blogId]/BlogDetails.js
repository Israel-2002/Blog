"use client";

import Container from "@/app/components/Container";
import useFetch from "@/app/hooks/useFetch";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const BlogDetails = ({ blog, currentUser }) => {
  const { isLoading, request } = useFetch();
  const router = useRouter();

  const deleteBlogHandler = () => {
    request({
      url: "/api/delete",
      body: { blogId: blog.id, authorId: blog.user.id, currentUser },
      method: "DELETE",
      action: () => {
        toast.success("Blog deleted");
        router.push("/");
        router.refresh();
      },
    });
  };

  return (
    <section className="mb-32 my-40">
      <Container>
        <div className="mb-12">
          <h2 className="font-krooner max-w-3xl mx-auto text-5xl md:text-6xl lg:text-7xl text-center capitalize">
            {blog.title}
          </h2>
          <p className="text-center mt-4 text-lg lg:text-xl text-accent">
            {blog.subtitle}
          </p>
          <p className="text-center mt-2">
            By {blog.user.firstname} {blog.user.lastname}
          </p>

          {currentUser?.id === blog.user.id && (
            <div className="flex gap-4 w-fit mx-auto mt-4">
              <Link
                href={`/blogs/${blog.id}/edit`}
                className="border border-secondary p-4 rounded-md 
              hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80"
                disabled={isLoading}
              >
                Edit Blog
              </Link>
              <button
                className="border border-accent text-accent p-4 rounded-md hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80"
                onClick={deleteBlogHandler}
                disabled={isLoading}
              >
                Delete Blog
              </button>
            </div>
          )}
        </div>

        <div className="w-full max-w-[768px] h-[300px] lg:h-[500px] mx-auto relative mb-8">
          <Image
            src={blog.imageUrl}
            fill
            className="absolute inset-0 object-cover"
            alt="blog image"
          />
        </div>
        <div
          className="max-w-2xl mx-auto"
          dangerouslySetInnerHTML={{ __html: blog.blog }}
        ></div>
      </Container>
    </section>
  );
};

export default BlogDetails;
