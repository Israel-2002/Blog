'use client'

const Textarea = ({ register, id, errors, required }) => {
  return (
    <div>
      <textarea
        rows={5}
        {...register(id, {
          required,
        })}
        className={`w-full border bg-transparent rounded-md p-4 focus:border-transparent focus:outline placeholder:text-secondary ${
          errors[id] ? "border-accent" : "border-secondary"
        } ${errors[id] ? "focus:outline-accent" : "focus:outline-secondary"}`}
        placeholder="Please add a description of your blog"
      ></textarea>
      {errors[id] && (
        <p className="text-sm text-accent mt-2">
          Description field is required
        </p>
      )}
    </div>
  );
};

export default Textarea;
