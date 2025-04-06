import React from "react";

export default function MenuFilter({
  categories,
  handleSelectedCategory,
  selectedCategory,
}) {
  return (
    <div className="flex-1/3">
      {categories.length > 0 ? (
        <div className="flex-col pl-9 pt-6">
          <p className="text-xl font-semibold">Choose Category</p>
          <div className="m-4">
            {" "}
            <label
              htmlFor="0"
              className="block cursor-pointer ml-4 p-2 w-fit  text-[1rem]   border-b-indigo-800 border-2 rounded-full"
            >
              <input
                onClick={() => handleSelectedCategory(0)}
                id="0"
                type="radio"
                name="radio-4"
                className="radio radio-primary mr-3"
                defaultChecked={selectedCategory === 0}
              />
              <span className="font-semibold text-xl">All</span>
            </label>
          </div>
          {categories.map((cat) => (
            <div className="m-4 " key={cat.id}>
              {" "}
              <label
                htmlFor={cat.id}
                className="block cursor-pointer ml-4 p-2 w-fit  text-[1rem]  border-b-indigo-800 border-2 rounded-full"
              >
                <input
                  onClick={() => handleSelectedCategory(cat.id)}
                  id={cat.id}
                  type="radio"
                  name="radio-4"
                  className="radio radio-primary mr-3"
                  defaultChecked={selectedCategory === cat.id}
                />
                <span className="font-semibold text-xl">{cat.name}</span>
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
