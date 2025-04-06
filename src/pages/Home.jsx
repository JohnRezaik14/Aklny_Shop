import React from "react";
import MenuList from "../components/MenuList";
import MenuFilter from "../components/MenuFilter";

export default function Home({
  items,
  handleAddToCart,
  loadingItems,
  categories,
  handleSelectedCategory,
  selectedCategory,
  handleSelectedPage,
  paginationNum,
  noOfPage,
  handleSearchChange,
}) {
  if (loadingItems) {
    return (
      <>
        <div className="w-3xs m-auto mt-9">
          <span className="loading loading-dots loading-xl ml-[100px]"></span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-around gap-4">
        <MenuFilter
          categories={categories}
          handleSelectedCategory={handleSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <MenuList
          items={items}
          handleAddToCart={handleAddToCart}
          handleSelectedPage={handleSelectedPage}
          paginationNum={paginationNum}
          noOfPage={noOfPage}
          handleSearchChange={handleSearchChange}
        />
      </div>
    </>
  );
}
