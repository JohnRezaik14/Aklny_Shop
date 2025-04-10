import React from "react";
import { NavLink } from "react-router";
export default function NavBar({ items, noOfItems }) {
  const navLinksClasses = (isActive) =>
    isActive
      ? "btn btn-sm sm:btn-md md:btn-md lg:btn-lg xl:btn-xl btn-ghost font-bold  text-indigo-900 ml-1 bg-gray-100 hover:bg-gray-300 "
      : "btn btn-sm sm:btn-md md:btn-md lg:btn-lg xl:btn-xl btn-ghost  ml-1 bg-gray-50 hover:bg-gray-300 ";

  return (
    <>
      <div className="">
        <div className="navbar bg-base-100 shadow-sm ">
          <div className="flex-1 lg:flex-1/3">
            <NavLink
              className="btn btn-sm sm:btn-md md:btn-md lg:btn-lg xl:btn-xl btn-ghost"
              to="/"
            >
              Aklny
            </NavLink>
          </div>
          <div className="flex-1/3 lg:mx-auto">
            <NavLink
              className={({ isActive }) => navLinksClasses(isActive)}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => navLinksClasses(isActive)}
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className={({ isActive }) => navLinksClasses(isActive)}
              to="/admin"
            >
              Admin
            </NavLink>
          </div>

          <div className="flex-none ">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
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
                  <span className="badge badge-sm indicator-item bg-amber-500 rounded-full w-[20px]">
                    {noOfItems}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className=" font-bold">{noOfItems} Items</span>
                  <span className="text-info">
                    Subtotal: $
                    {items.reduce(
                      (sum, item) => sum + item.count * item.price,
                      0
                    ) || 0}
                  </span>
                  <div className="card-actions">
                    <NavLink to={"/cart"} className="btn btn-primary btn-block">
                      {" "}
                      View cart
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
