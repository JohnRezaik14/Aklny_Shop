import Delete from "./buttons/delete";
import Minus from "./buttons/Minus";
import Plus from "./buttons/plus";

function CartItem(props) {
  return (
    <>
      <div className="grid grid-cols-6 p-3 mt-3 text-xl gap-5 bg-gray-200 rounded-2xl max-w-[40rem] ">
        {/* item name */}
        <div className=" col-span-2">
          <p>{props.name}</p>
        </div>
        {/* item increment */}
        <div
          onClick={() => props.handleIncrement(props.id)}
          className=" col-span-1"
        >
          <Plus />
        </div>
        {/* item count */}
        <div className="col-span-1">
          {" "}
          <span>{props.count}</span>
        </div>
        {/* item decrement */}
        <div
          className=" col-span-1 text-amber-500 "
          onClick={() => props.handleDecrement(props.id)}
        >
          <Minus />
        </div>
        {/* delete item form cart */}
        <div
          className="text-red-900 col-span-1"
          onClick={() => props.handleDelete(props.id)}
        >
          {" "}
          <Delete />
        </div>
      </div>
    </>
  );
}

export default CartItem;
