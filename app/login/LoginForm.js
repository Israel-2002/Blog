"use client";

import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const submitHandler = async (data, event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        throw new Error("Invalid Credentials");
      }
      reset();
      toast.success("Logged in");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="grid gap-4">
        <Input
          id="email"
          register={register}
          placeholder="Email Address"
          type="email"
          errors={errors}
          errorMessage="Email field is required"
          required
        />
        <Input
          id="password"
          register={register}
          placeholder="Password"
          type="password"
          errors={errors}
          errorMessage="Password field must be at least 7 characters"
          required
        />
      </div>

      <button
        className="p-4 bg-accent w-full max-w-xl mt-8 mx-auto block rounded-md disabled:cursor-not-allowed disabled:bg-accent/80"
        disabled={isLoading}
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
