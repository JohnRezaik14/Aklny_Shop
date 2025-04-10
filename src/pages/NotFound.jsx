import React from "react";
import NF from "../assets/15.svg";
export default function NotFound() {
  return (
    <div className="overflow-hidden grid grid-cols-9 h-screen relative">
      <p
        className="pl-12 col-span-4 mt-[23vh] py-8 w-fit  
      text-shadow-teal-900 text-shadow-md text-blue-500 font-[600] text-[3rem] z-10"
      >
        <span>OOOPS!</span> We couldn't find this page
      </p>
      <div
        className="col-span-4 absolute right-0 top-0 h-full w-1/2 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${NF})`,
        }}
      ></div>
    </div>
  );
}
