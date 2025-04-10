import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Input from "../inputs/Input";
import Select from "../inputs/Select";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { ItemsContext } from "../../contexts/items";
import ProductName from "../inputs/ProductName";
import ProductPrice from "../inputs/ProductPrice";
import ProductCategory from "../inputs/ProductCategory";
export default function AddProduct({ categories, setAddingProduct }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { handleAddingItem } = useContext(ItemsContext);
  const handleAddProduct = async (data) => {
    toast.info("Product added successfully");
    try {
      const response = await axios.post("http://localhost:3000/menu/", {
        name: data.prodName,
        price: Number(data.prodPrice),
        category: categories.find((cat) => cat.name === data.prodCategory).id,
        count: 0,
        isInCart: false,
      });
      const item = response.data;
      handleAddingItem(item);
      setAddingProduct(false);
    } catch (error) {
      if (error) {
        setTimeout(() => {
          toast.error("Product can't be added , try again");
        }, 1000);
      }
    }

    // console.log(data);
  };
  return (
    <div>
      {categories ? (
        <form
          onSubmit={handleSubmit((data) => {
            handleAddProduct(data);
          })}
          className="text-[1rem] font-[500] "
        >
          <div className="">
            {" "}
            <div>
              <h3 className="text-violet-900 text-[1.2rem] border-b-2 border-violet-400">
                Adding New Product
              </h3>
            </div>
            {/* Product Name */}
            <ProductName register={register} errors={errors} />
            {/* Product Price */}
            <ProductPrice register={register} errors={errors} />
            {/* Product Category */}
            <ProductCategory
              register={register}
              errors={errors}
              categories={categories}
            />
            <div className="block my-3">
              {" "}
              <input
                className="btn md:btn-md lg:btn-lg "
                type="submit"
                value="Add"
              />
            </div>
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
}
