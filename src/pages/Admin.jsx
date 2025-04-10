import React, { useContext, useState } from "react";
import { ItemsContext, ItemEditContext } from "../contexts/items";
import Edit from "../components/buttons/Edit";
import Delete from "../components/buttons/delete";
import Loading from "../components/Loading";
import MenuFilter from "../components/MenuFilter";
import AddProduct from "../components/forms/AddProduct";
import { toast } from "react-toastify";
import axios from "axios";
import EditProduct from "../components/forms/EditProduct";

export default function Admin() {
  const { items, isLoading, selectedCategory, categories, handleEditingItems } =
    useContext(ItemsContext);
  const [addingProduct, setAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(false);
  const [productToEdit, setproductToEdit] = useState({});

  const handleAddProduct = () => {
    setAddingProduct(true);
    setEditingProduct(false);
  };
  const handleDeleteProduct = async (id) => {
    const oldItems = items;
    const newItems = items.filter((itm) => itm.id != id);
    handleEditingItems(newItems);
    toast.info(`Product with id: ${id} deleted`);
    try {
      const response = await axios.delete(`http://localhost:3000/menu/${id}`);
      console.log(response);
    } catch (error) {
      // console.log(error);
      toast.error(`${error.message}`);
      handleEditingItems(oldItems);
    }
  };
  const handleEditingProduct = async (id) => {
    setEditingProduct(true);
    setAddingProduct(false);
    const item = items.find((itm) => itm.id == id);
    setproductToEdit(item);
  };
  if (isLoading) {
    return <Loading />;
  }

  if (items.length < 1) {
    return (
      <div className="m-auto mt-3 w-fit">
        <p className="text-center text-2xl">
          Sorry the data isn't available, please reload later
        </p>
      </div>
    );
  }

  return (
    <ItemEditContext.Provider value={{ productToEdit, setEditingProduct }}>
      <div className="container mx-auto px-4 my-2">
        <div className="grid  grid-cols-1 lg:grid-cols-6 gap-6">
          <div className=" lg:col-span-1 lg:col-start-2 divide-y-2 divide-gray-500 flex-col gap-4">
            <MenuFilter />
            {!addingProduct ? (
              <div className="mt-8 mb-2 text-center">
                <p className="text-base font-medium">
                  Want to add item?{" "}
                  <button
                    className="btn btn-soft btn-primary ml-2 text-base font-medium"
                    onClick={() => handleAddProduct()}
                  >
                    Add Product
                  </button>
                </p>
              </div>
            ) : (
              <div className="mt-8 transition-all duration-800 ease-in-out">
                <AddProduct
                  categories={categories}
                  setAddingProduct={setAddingProduct}
                />
              </div>
            )}
          </div>

          <div className=" lg:col-span-3 lg:col-start-3">
            {editingProduct && (
              <div>
                <EditProduct />
              </div>
            )}
            <div className="shadow-[1px_1px_15px_0.9px_rgba(70,42,150,0.2)] rounded-lg overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="w-12 sm:w-16">ID</th>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th className="w-16">Edit</th>
                    <th className="w-16">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedCategory != 0
                    ? items.filter((itm) => itm.category == selectedCategory)
                    : items
                  ).map((itm) => (
                    <tr
                      key={itm.id}
                      className="text-base font-semibold hover:bg-amber-200 transition-all duration-600"
                    >
                      <th>{itm.id}</th>
                      <td className="font-semibold">{itm.name}</td>
                      <td>{itm.price}$</td>
                      <td className="text-cyan-800">
                        <Edit
                          handleEditingProduct={handleEditingProduct}
                          id={itm.id}
                        />
                      </td>
                      <td className="text-red-800">
                        <Delete
                          handleDeleteProduct={handleDeleteProduct}
                          id={itm.id}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ItemEditContext.Provider>
  );
}
