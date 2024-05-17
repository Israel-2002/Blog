"use client";

import Input from "../components/Input";
import { useForm } from "react-hook-form";
import useFetch from "../hooks/useFetch";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const { isLoading, request } = useFetch();
  const router = useRouter();

  const submitHandler = (data) => {
    if (data.password.trim() !== data.confirm_password.trim()) {
      toast.error("Passwords do not match");
      return;
    }

    const action = () => {
      reset();
      toast.success("Account created, log in to continue");
      router.push("/login");
    };

    request({
      url: "/api/register",
      method: "POST",
      body: data,
      action,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="grid gap-4">
        <Input
          id="firstname"
          register={register}
          placeholder="Firstname"
          errors={errors}
          errorMessage="Firstname field is required"
          required
        />
        <Input
          id="lastname"
          register={register}
          placeholder="Lastname"
          errors={errors}
          errorMessage="Lastname field is required"
          required
        />
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
        <Input
          id="confirm_password"
          register={register}
          placeholder="Confirm Password"
          type="password"
          errors={errors}
          errorMessage="Confirm password field must be at least 7 characters"
          required
        />
      </div>

      <button
        className="p-4 bg-accent w-full max-w-xl mt-8 mx-auto block rounded-md disabled:cursor-not-allowed disabled:bg-accent/80"
        disabled={isLoading}
      >
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
