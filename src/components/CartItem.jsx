function CartItem(props) {
  return (
    <>
      <div className="flex p-3 text-xl gap-5 mt-2 ml-2 bg-blue-100 justify-center  rounded-2xl w-[30rem]">
        <div>
          {" "}
          <p>{props.name}</p>
        </div>
        <div>
          {" "}
          <span>{props.count}</span>
        </div>
        <div>
          {" "}
          <button
            className="w-10 h-10 text-center text-3xl just  bg-blue-500 rounded-full "
            onClick={() => props.handleIncrement(props.id)}
          >
            +
          </button>
        </div>
        <div>
          <button
            className="w-10 h-10 text-center bg-emerald-700 rounded-full"
            onClick={() => props.handleDecrement(props.id)}
          >
            -
          </button>
        </div>
        <div>
          {" "}
          <button
            className="bg-orange-500 p-1 rounded-2xl"
            onClick={() => props.handleDelete(props.id)}
          >
            delete
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
