import React, { useContext } from 'react'
import { ActionType, MyContext, MyContextType } from '../context/StateProvider'

const Main = () => {
  const { state, dispatch } = useContext<MyContextType>(MyContext)


  return (
    <div>
      {state.product.map((item, index) => {
        const { name, incart, price, sku } = item
        return <div key={index}>
          {name}  --{incart ? 'bought' : 'not buy'}
          <button
          disabled={incart}
            onClick={() => {
              dispatch({ type: ActionType.ADD, payload:item})
            }}
          >add</button>
        </div>
      })}
    
      <hr></hr>
      <div>cart:</div>
      {state.buyProducts.map((item, index) => {
        const { name, incart } = item
        return <div key={index}>
          {name} is booked
          <button
            onClick={() => {
              dispatch({ type: ActionType.REMOVE, payload: item })
            }}
          >remove</button>
        </div>
      })}
    </div>
  )
}

export default Main