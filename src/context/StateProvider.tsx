import { createContext, useReducer } from "react";
// 1. state use 2 type
// 2. state type 1
export interface ProductType {
  sku: string;
  name: string;
  price: number;
  incart: boolean;
}
// 3. state type 2
export interface BuyProductType extends ProductType {
  quantity: number;
  total: number;
}
//4. action type
export interface ActionToCartType {
  type: ActionType;
  payload?: ProductType;
}
// 5. my context in
interface StateType {
  product: ProductType[];
  buyProducts: BuyProductType[];
}
export interface MyContextType {
  state: StateType;
  dispatch: React.Dispatch<ActionToCartType>;
}
export enum ActionType {
  ADD,
  REMOVE,
  ADD_QUANTITY,
  REMOVE_QUANTITY,
}

const initState: StateType = {
  product: [
    {
      sku: "12345",
      name: "item0001",
      price: 49.99,
      incart: false,
    },
    {
      sku: "23456",
      name: "item0002",
      price: 59.99,
      incart: false,
    },
    {
      sku: "34567",
      name: "item0003",
      price: 69.99,
      incart: false,
    },
  ],
  buyProducts: [],
};

export const MyContext = createContext<MyContextType>({
  state: initState,
  dispatch: () => {},
});

interface ProviderProps {
  children: React.ReactNode;
}
const reducer = (state: StateType, action: ActionToCartType): StateType => {
  switch (action.type) {
    case ActionType.ADD:
      if (action.payload) {
        const { sku } = action.payload;
        const { buyProducts, product } = state;
        const productIndex = product.findIndex((i) => i.sku === sku);
        product[productIndex].incart = true;
        let newBuyProduct: BuyProductType;
        const { incart, name, price } = product[productIndex];
        newBuyProduct = {
          incart,
          name,
          price,
          sku,
          quantity: 1,
          total: price,
        };
        buyProducts.push(newBuyProduct);
      }
      return { ...state };
    case ActionType.REMOVE:
      if (action.payload) {
        const { sku } = action.payload;
        const { buyProducts, product } = state;
        const productIndex = product.findIndex((i) => i.sku === sku);
        product[productIndex].incart = false;
        const buyProductsIndex = buyProducts.findIndex((i) => i.sku === sku);

        buyProducts.splice(buyProductsIndex, 1);
      }
      return { ...state };
    case ActionType.ADD_QUANTITY:
      if (action.payload) {
        const { sku } = action.payload;
        const { buyProducts } = state;
        const productIndex = buyProducts.findIndex((i) => i.sku === sku);
        buyProducts[productIndex].quantity++;
        let { quantity, price } = buyProducts[productIndex];
        buyProducts[productIndex].total = quantity * price;
        return { ...state };
      }
    case ActionType.REMOVE_QUANTITY:
      if (action.payload) {
        const { sku } = action.payload;
        const { buyProducts } = state;
        const productIndex = buyProducts.findIndex((i) => i.sku === sku);
        let { quantity, price } = buyProducts[productIndex];
        if (quantity > 0) {
          buyProducts[productIndex].quantity--;
          buyProducts[productIndex].total = buyProducts[productIndex].quantity * price;
        }
        return { ...state };
      }
    default:
      throw new Error("no action found");
  }
};

const MyProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initState);
  // const value: MyContextType = { state, dispatch }
  return <MyContext.Provider value={{ state, dispatch }}>{children}</MyContext.Provider>;
};

export default MyProvider;
