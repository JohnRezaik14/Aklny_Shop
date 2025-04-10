import React from "react";

export default function Input({
  id,
  name,
  label,
  register,
  type,
  min,
  max,
  InputClasses,
  isRequired,
  // errors,
  // editValue,
}) {
  return (
    <div className="inline-block font-[500] w-full">
      <label className="block" htmlFor={id}>
        {label}
      </label>
      {isRequired ? (
        <input
          className={`input block hover:cursor-pointer ${InputClasses || ""}`}
          type={type}
          name={name}
          id={id}
          placeholder={"Enter " + label}
          min={min ? min : null}
          max={max ? max : null}
          {...register(name)}
          required
          // value={editValue || ""}
          // {...register(
          //   name,
          //   isRequired ? { required: `${label} is required` } : {}
          // )}
          // aria-invalid={errors[name] ? "true" : "false"}
        />
      ) : (
        <input
          className={`input block hover:cursor-pointer ${InputClasses || ""}`}
          type={type}
          name={name}
          id={id}
          placeholder={"Enter " + label}
          min={min ? min : null}
          max={max ? max : null}
          {...register(name)}
          // {...register(
          //   name,
          //   isRequired ? { required: `${label} is required` } : {}
          // )}
          // aria-invalid={errors[name] ? "true" : "false"}
        />
      )}

      {/* {errors[name] && <p role="alert">{errors[name].message}</p>} */}
    </div>
  );
}
