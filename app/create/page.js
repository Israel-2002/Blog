"use client";

import { useForm } from "react-hook-form";
import BlogForm from "../components/BlogForm";
import Container from "../components/Container";
import { useState } from "react";

const CreateBlog = () => {
  const {
    setValue,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      imageUrl: "",
      blog: "",
      read: "",
    },
  });

  const [image, setImage] = useState("");
  const [blog, setBlog] = useState("");

  return (
    <section className="py-32">
      <Container>
        <div className="mb-12">
          <h2 className="font-krooner text-6xl md:text-7xl lg:text-8xl text-center capitalize">
            Create Your Blog
          </h2>
          <p className="text-center mt-4 text-lg lg:text-xl text-accent">
            Start crafting your blog for our amazing audience
          </p>
        </div>

        <BlogForm
          name="create"
          url="/api/upload"
          method="POST"
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

export default CreateBlog;
