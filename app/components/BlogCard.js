"use client";

import Image from "next/image";
import arrow from "../../public/Vector.svg";
import Link from "next/link";

const BlogCard = ({ blog }) => {
  const title = `${blog.title.substring(0, 50)}`;
  const description = `${blog.description.substring(0, 100)}`;

  return (
    <li className="border border-secondary/20 rounded-sm p-2">
      <Link href={`/blogs/${blog.id}`} className="h-full  flex flex-col">
        <div className="relative w-full h-[270px]">
          <Image
            src={blog.imageUrl}
            fill
            alt=""
            className="absolute inset-0 object-cover"
          />
        </div>

        <h3 className="font-semibold mt-4 text-lg">
          {title}
          {title.length >= 50 && "..."}
        </h3>
        <p className="mt-4 text-secondary/80 mb-4">
          {description}
          {description.length >= 100 && "..."}
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-t-secondary/20 mt-auto">
          <div className="flex gap-4 items-center text-sm">
            <span>
              {blog.user.firstname} {blog.user.lastname}
            </span>

            <span>{blog.read}min read</span>
          </div>
          <Image src={arrow} width={20} height={10} alt="" />
        </div>
      </Link>
    </li>
  );
};

export default BlogCard;
