import React from "react";
import Input from "./Input";

export default function ProductPrice({ register, errors, price }) {
  return (
    <>
      {/* Product Price */}
      <div className="block my-3">
        <Input
          register={register}
          id="productPrice"
          label={"Product Price"}
          name={"prodPrice"}
          type={"number"}
          errors={errors}
          isRequired={true}
          editValue={price || ""}
        />
      </div>
    </>
  );
}
