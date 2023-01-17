import { createContext, useReducer } from "react"

export interface ProductType {
    sku: string,
    name: string,
    price: number
}

export interface BuyProductType extends ProductType {
    quantity: number,
    total: number
}
export interface ActionToCartType {
    type: ActionType,
    payload?: ProductType
}
interface MyContextType {
    state: {
        product: ProductType[],
        buyProducts: BuyProductType[]
    },
    dispatch: React.Dispatch<ActionToCartType>
}
enum ActionType {
    ADD,
    REMOVE,
}

const MyContext = createContext<MyContextType>({
    state: {
        product: [{
            "sku": "12345",
            "name": "item0001",
            "price": 49.99
        }, {
            "sku": "23456",
            "name": "item0002",
            "price": 59.99
        }, {
            "sku": "34567",
            "name": "item0003",
            "price": 69.99
        }],
        buyProducts: []
    },
    dispatch: () => { }
})


interface ProviderProps { 
    children:React.ReactNode
}
const reducer = (state :MyContextType,action:ActionToCartType) => { 
switch (action.type) { 
    case ActionType.ADD:
        
        return {...state,}
    default : 
    return state
}
}

const MyProvider = ({children}: ProviderProps)=> { 
}


