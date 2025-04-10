import React, { useContext } from "react";
import CartItem from "./cartItem";
import { ItemsContext } from "../contexts/items";
export default function Cart() {
  const { items, handleIncrement, handleDecrement, handleDelete, resetCount } =
    useContext(ItemsContext);
  const itemsInCart = items.filter((item) => item.isInCart);
  return (
    <div>
      <div>
        {" "}
        <div className="ml-5  text-black">
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
          <button className="btn btn-accent ml-5 mt-3" onClick={resetCount}>
            Reset Count
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
