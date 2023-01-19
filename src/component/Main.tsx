import React, { useContext } from "react";
import { ActionType, BuyProductType, MyContext, MyContextType } from "../context/StateProvider";
const generateCurrency = (number: number): string => {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(number);
};

const Main = () => {
  const { state, dispatch } = useContext<MyContextType>(MyContext);
  const img = (name: string): string => {
    return new URL(`../image/${name}.jpg`, import.meta.url).href;
  };
  return (
    <div className="capitalize">
      <div className="flex align-middle justify-center space-x-3">
        {state.product.map((item, index) => {
          const { name, incart, price, sku } = item;
          return (
            <div key={index} className=" space-x-4 w-1/4 my-6">
              <img src={img(name)} alt="" className="rounded-md" />
              <div className="flex justify-between align-middle place-items-center mt-5">
                <button
                  className={`text-red-400 ${
                    incart ? "bg-white" : "bg-slate-500"
                  } hover:bg-gray-100  font-semibold py-2 px-4 border border-gray-400 rounded shadow `}
                  disabled={incart}
                  onClick={() => {
                    dispatch({ type: ActionType.ADD, payload: item });
                  }}
                >
                  add +
                </button>
                <p>price: {generateCurrency(price)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <hr></hr>

      <div className="flex flex-col gap-5 place-items-center ">
        <h1> Cart:</h1>

        {state.buyProducts.map((item, index) => {
          const { name, quantity, total, price } = item;
          return (
            <div key={index} className="flex justify-center place-items-center gap-5 text-slate-400 text-xl">
              <img src={img(name)} className="rounded-full w-10 h-10" alt="" />
              <p>quatity: {quantity}</p>
              <button
                onClick={() => {
                  dispatch({ type: ActionType.ADD_QUANTITY, payload: item });
                }}
                className="rounded-full bg-slate-700 h-10 w-10 hover:bg-gray-500 "
              >
                +
              </button>
              <p>{generateCurrency(price)}</p>
              <p>Total: {generateCurrency(total)}</p>
              <button
                onClick={() => {
                  dispatch({ type: ActionType.REMOVE_QUANTITY, payload: item });
                }}
                className="rounded-full bg-slate-700 h-10 w-10 hover:bg-gray-500"
              >
                -
              </button>
              <button
                className="text-red-400 bg-slate-500 hover:bg-gray-500 font-semibold py-2 px-4 border border-gray-400 rounded shadow  "
                onClick={() => {
                  dispatch({ type: ActionType.REMOVE, payload: item });
                }}
              >
                remove -
              </button>
            </div>
          );
        })}
        
      </div>
    </div>
  );
};

export default Main;
