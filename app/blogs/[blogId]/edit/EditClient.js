"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import BlogForm from "@/app/components/BlogForm";
import Container from "@/app/components/Container";

const EditClient = ({ blogDetails }) => {
  const {
    setValue,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: blogDetails.title,
      subtitle: blogDetails.subtitle,
      description: blogDetails.description,
      imageUrl: blogDetails.imageUrl,
      blog: "",
      read: blogDetails.read,
    },
  });

  const [image, setImage] = useState(blogDetails.imageUrl);
  const [blog, setBlog] = useState(blogDetails.blog);

  return (
    <section className="py-32">
      <Container>
        <div className="mb-12">
          <h2 className="font-krooner text-6xl md:text-7xl lg:text-8xl text-center capitalize">
            Edit Your Blog
          </h2>
          <p className="text-center mt-4 text-lg lg:text-xl text-accent">
            Add some touches to your blog
          </p>
        </div>

        <BlogForm
          blogId={blogDetails.id}
          authorId={blogDetails.user.id}
          name="edit"
          url="/api/edit"
          method="PUT"
          register={register}
          setValue={setValue}
          reset={reset}
          handleSubmit={handleSubmit}
          errors={errors}
          image={image}
          blog={blog}
          setImage={(value) => setImage(value)}
          setBlog={(value) => setBlog(value)}
        />
      </Container>
    </section>
  );
};

export default EditClient;
