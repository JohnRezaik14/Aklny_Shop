import React, { useContext, useState } from "react";
import { ItemEditContext, ItemsContext } from "../../contexts/items";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

export default function EditProduct() {
  const { categories, items, handleEditingItems } = useContext(ItemsContext);
  const { productToEdit, setEditingProduct } = useContext(ItemEditContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...productToEdit,
    },
  });

  const handleEditProduct = async (data) => {
    setIsSubmitting(true);
    const updatedProduct = {
      ...productToEdit,
      name: data.name,
      price: data.price,
      category: data.category,
    };

    const oldItems = [...items];
    const newItems = items.map((itm) =>
      itm.id === productToEdit.id ? updatedProduct : itm
    );

    try {
      handleEditingItems(newItems);
      const response = await axios.put(
        `http://localhost:3000/menu/${productToEdit.id}`,
        updatedProduct
      );
      console.log(response);
      toast.success(`Product Edited Successfully`);
      setEditingProduct(null);
    } catch (error) {
      toast.error(`${error.message}`);
      handleEditingItems(oldItems);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-violet-900 text-xl font-bold mb-4 border-b-2 border-violet-400 pb-2">
        Edit your product
      </h3>
      <form onSubmit={handleSubmit(handleEditProduct)} className="space-y-4">
        {/* Product Name */}
        <div className="font-[500] w-full">
          <label htmlFor="name" className="block">
            Product Name
          </label>
          <input
            {...register("name", {
              required: "Product name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            className="input w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            id="name"
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Product Price */}
        <div className="font-[500] w-full">
          <label htmlFor="price" className="block">
            Product Price
          </label>
          <input
            {...register("price", {
              required: "Price is required",
              min: { value: 1, message: "Price must be at least 1" },
            })}
            className="input w-full border border-gray-300 rounded px-3 py-2"
            type="number"
            id="price"
            placeholder="Enter product price"
          />
        </div>

        {/* Product Category */}
        <div className="font-[500] w-full">
          <label htmlFor="category" className="block">
            Product Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            id="category"
            className="select select-primary w-full border border-gray-300 rounded px-3 py-2"
            defaultValue={productToEdit.category}
          >
            <option disabled value="">
              Choose a category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition-colors"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => setEditingProduct(null)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
