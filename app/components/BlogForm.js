"use client";

import { CldUploadWidget } from "next-cloudinary";
import Input from "../components/Input";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import useFetch from "../hooks/useFetch";
import Textarea from "../components/Textarea";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const BlogForm = ({
  blogId,
  authorId,
  name,
  register,
  handleSubmit,
  setValue,
  reset,
  errors,
  url,
  method,
  image,
  blog,
  setImage,
  setBlog,
}) => {
  const { isLoading, request } = useFetch();
  const router = useRouter();

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const uploadImage = (response) => {
    setImage(response.info.secure_url);
    setValue("imageUrl", response.info.secure_url);
    toast.success(name === "create" ? "Image uploaded" : "Image changed");
  };

  const submitHandler = (data) => {
    const { title, subtitle, description, read, imageUrl } = data;

    if (imageUrl === "") {
      toast.error("Please add an image");
      return;
    }

    if (blog === "") {
      toast.error("Please add a blog content");
      return;
    }

    request({
      url,
      body: {
        blogId,
        authorId,
        title,
        subtitle,
        description,
        read,
        imageUrl,
        blog,
      },
      action: () => {
        toast.success(name === "create" ? "Blog created" : "Blog edited");
        reset();
        setBlog("");
        setImage("");
        router.push(name === "create" ? "/" : `/blogs/${blogId}`);
        authorId, router.refresh();
      },
      method,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="grid gap-4 w-full max-w-xl mx-auto">
        <Input
          id="title"
          register={register}
          errors={errors}
          placeholder="Title"
          errorMessage="Title field is required"
          required
        />

        <Input
          id="subtitle"
          register={register}
          errors={errors}
          placeholder="Subtitle"
          errorMessage="Subtitle field is required"
          required
        />

        <Textarea
          id="description"
          register={register}
          errors={errors}
          required
        />

        <Input
          id="read"
          register={register}
          errors={errors}
          type="number"
          placeholder="Time it takes to finish reading"
          errorMessage="Time field is required"
          required
        />

        <CldUploadWidget
          uploadPreset="ldnrtuty"
          options={{ maxFiles: 1 }}
          onUpload={uploadImage}
        >
          {({ open }) => {
            return (
              <div
                className="border-[2px] border-secondary border-dotted p-20 rounded-md md:p-32 relative grid place-content-center cursor-pointer group overflow-hidden"
                onClick={() => open()}
              >
                <div className="group-hover:opacity-80 text-center">
                  <TbPhotoPlus size={32} className="w-fit mx-auto" />
                  <p className="mt-4">Click to upload an image</p>
                </div>

                {image && (
                  <Image
                    src={image}
                    fill
                    className="absolute object-cover inset-0"
                    alt=""
                  />
                )}
              </div>
            );
          }}
        </CldUploadWidget>

        <ReactQuill
          theme="snow"
          value={blog}
          onChange={setBlog}
          className="ql mb-24 sm:mb-16"
          placeholder="Add your blog content here..."
        />
      </div>

      <button
        className="p-4 bg-accent w-full max-w-xl mx-auto block rounded-md disabled:cursor-not-allowed disabled:bg-accent/80"
        disabled={isLoading}
      >
        {name === "create" ? "Create" : "Edit"} your Blog
      </button>
    </form>
  );
};

export default BlogForm;
