import React from "react";
import CartItem from "./cartItem";
export default function Cart(props) {
  const { items, handleIncrement, handleDecrement, handleDelete, resetCount } =
    props;
  const itemsInCart = items.filter((item) => item.isInCart);
  return (
    <div>
      <div>
        {" "}
        <div className="p-3 text-black">
          {itemsInCart.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              count={item.count}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              handleDelete={handleDelete}
            />
          ))}
        </div>
        {itemsInCart.length > 0 ? (
          <button
            className="bg-gray-400 p-2 text-[1.2rem] m-5"
            onClick={resetCount}
          >
            Reset
          </button>
        ) : (
          <p className="m-auto w-fit text-2xl font-semibold">
            you haven't added products yet
          </p>
        )}
      </div>
    </div>
  );
}
