import { useContext } from "react";
import SearchInput from "./searchInput";
import { ItemsContext } from "../contexts/items";

export default function MenuList() {
  const {
    filteredItems,
    handleAddToCart,
    handleSelectedPage,
    paginationNum,
    noOfPage,
    handleSearchChange,
  } = useContext(ItemsContext);
  let pages = [];
  for (let i = 1; i < paginationNum + 1; i++) {
    pages.push(i);
  }
  return (
    <div className="flex-1/3 overflow-x-auto">
      <div className="mt-3 ml-2">
        <SearchInput handleSearchChange={handleSearchChange} />
      </div>

      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((itm) => (
            <tr className="bg-base-200" key={itm.id}>
              <td className="font-[600] ">{itm.name}</td>
              <td>{itm.price}$</td>
              <td>
                {" "}
                <svg
                  onClick={() => handleAddToCart(itm.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 cursor-pointer transition-all ease-in-out duration-200 hover:scale-110"
                  fill={itm.isInCart == true ? "black" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />{" "}
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="join mt-3">
        {pages.length > 1
          ? pages.map((page) => (
              <button
                key={page}
                className={
                  page == noOfPage
                    ? "join-item btn btn-lg btn-active"
                    : "join-item btn btn-lg "
                }
                onClick={() => handleSelectedPage(page)}
              >
                {page}
              </button>
            ))
          : ""}
      </div>
    </div>
  );
}
