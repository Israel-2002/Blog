"use client";

const Input = ({
  type = "text",
  register,
  id,
  required,
  errors,
  errorMessage,
  placeholder,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <input
        {...register(id, { required, minLength: type === "password" && 7, })}
        type={type}
        placeholder={placeholder}
        className={`w-full block rounded-md border bg-transparent p-4  placeholder:text-secondary focus:border-transparent focus:outline ${
          errors[id] ? "border-accent" : "border-secondary"
        } ${errors[id] ? "focus:outline-accent" : "focus:outline-secondary"} ${
          errors[id] ? "placeholder:text-accent" : "placeholder:text-secondary"
        }`}
      />
      {errors[id] && <p className="text-sm text-accent mt-2">{errorMessage}</p>}
    </div>
  );
};

export default Input;
