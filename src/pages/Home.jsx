import React from "react";
import MenuList from "../components/MenuList";
import MenuFilter from "../components/MenuFilter";
import Loading from "../components/Loading";

export default function Home({ isLoading }) {
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 my-2">
        <div className="grid grid-cols-6 justify-around gap-4">
          <div className="col-span-full md:col-span-1 lg:col-start-2">
            <MenuFilter />
          </div>
          <div className="col-span-full md:col-span-4 lg:col-span-3">
            <MenuList />
          </div>
        </div>
      </div>
    </>
  );
}
