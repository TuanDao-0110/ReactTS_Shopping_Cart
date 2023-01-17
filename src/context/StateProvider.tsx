import { createContext, useReducer } from "react"
// 1. state use 2 type
// 2. state type 1
export interface ProductType {
    sku: string,
    name: string,
    price: number,
    incart: boolean
}
// 3. state type 2
export interface BuyProductType extends ProductType {
    quantity?: number,
    total?: number
}
//4. action type
export interface ActionToCartType {
    type: ActionType,
    payload?: ProductType
}
// 5. my context in
interface StateType {
    product: ProductType[],
    buyProducts: BuyProductType[]
}
export interface MyContextType {
    state: StateType
    dispatch: React.Dispatch<ActionToCartType>
}
export enum ActionType {
    ADD,
    REMOVE,
}

const initState: StateType = {
    product: [{
        "sku": "12345",
        "name": "item0001",
        "price": 49.99,
        incart: false
    }, {
        "sku": "23456",
        "name": "item0002",
        "price": 59.99,
        incart: false
    }, {
        "sku": "34567",
        "name": "item0003",
        "price": 69.99,
        incart: false
    }],
    buyProducts: []
}

export const MyContext = createContext<MyContextType>({
    state: initState,
    dispatch: () => { }
})


interface ProviderProps {
    children: React.ReactNode
}
const reducer = (state: StateType, action: ActionToCartType): StateType => {
    switch (action.type) {
        case ActionType.ADD:
            if (action.payload) {
                const { sku } = action.payload
                const { buyProducts, product } = state
                const productIndex = product.findIndex(i => i.sku === sku)
                product[productIndex].incart = true
                buyProducts.push(product[productIndex])
            }
            return { ...state, }
        case ActionType.REMOVE:
            if (action.payload) {
                const { sku } = action.payload
                const { buyProducts, product } = state
                const productIndex = product.findIndex(i => i.sku === sku)
                product[productIndex].incart = false
                const buyProductsIndex = buyProducts.findIndex(i=> i.sku === sku)

                buyProducts.splice(buyProductsIndex,1)
            }
            return { ...state, }
        default:
            return state
    }
}

const MyProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initState)
    const value: MyContextType = { state, dispatch }
    return <MyContext.Provider value={value}>
        {children}
    </MyContext.Provider>

}

export default MyProvider


