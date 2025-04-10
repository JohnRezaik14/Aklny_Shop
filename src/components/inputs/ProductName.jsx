import React from "react";
import Input from "./Input";

export default function ProductName({ register, errors /*name*/ }) {
  return (
    <>
      {" "}
      {/* Product Name */}
      <div className="block my-3">
        <Input
          register={register}
          id="productName"
          label={"Product Name"}
          name={"prodName"}
          type={"text"}
          isRequired={true}
          errors={errors}
          // editValue={name || ""}
        />
      </div>
    </>
  );
}
