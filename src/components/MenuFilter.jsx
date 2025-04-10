import React, { useContext } from "react";
import { ItemsContext } from "../contexts/items";

export default function MenuFilter() {
  const { categories, handleSelectedCategory, selectedCategory } =
    useContext(ItemsContext);
  return (
    <div>
      {categories.length > 0 ? (
        <div className="flex-col text-[0.8rem]">
          <p className="text-[0.9rem] font-semibold ">Choose Category</p>
          <div className="my-2 ">
            {" "}
            <label htmlFor="0" className="block cursor-pointer w-[100%] ">
              <input
                onClick={() => handleSelectedCategory(0)}
                id="0"
                type="radio"
                name="radio-2"
                className="radio radio-sm radio-primary mr-1"
                defaultChecked={selectedCategory === 0}
              />
              <span className="font-semibold ">All</span>
            </label>
          </div>
          {categories.map((cat) => (
            <div className="my-2 " key={cat.id}>
              {" "}
              <label
                htmlFor={cat.id}
                className="block cursor-pointer w-[100%]   "
              >
                <input
                  onClick={() => handleSelectedCategory(cat.id)}
                  id={cat.id}
                  type="radio"
                  name="radio-2"
                  className="radio radio-sm radio-primary mr-1 "
                  defaultChecked={selectedCategory === cat.id}
                />
                <span className="font-semibold">{cat.name}</span>
              </label>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
