import React from "react";
import Select from "./Select";

export default function ProductCategory({
  register,
  errors,
  categories,
  // category,
}) {
  return (
    <>
      <div className="block my-3">
        <Select
          options={categories}
          optionType={"Category"}
          register={register}
          legend={"Categories"}
          name={"prodCategory"}
          errors={errors}
        />
      </div>
    </>
  );
}
