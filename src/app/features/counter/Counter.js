import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, reset, incrementByAmount } from './counterSlice'
import { useState } from 'react'

const Counter = () => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    const [incrementAmount, setIncreamentAmount] = useState(0)

    const addValue = Number(incrementAmount) || 0

    const resetAll = () => {
      setIncreamentAmount(0)
      dispatch(reset())
    }
  return (
    <section>
      <h1>COUNTER</h1>
        <p>{count}</p>
        <div>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
        <input 
          type='text'
          value={incrementAmount}
          onChange={(e) => setIncreamentAmount(e.target.value)}
        />

      <div>
       <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button> 
       <button onClick={() => dispatch(reset())}>Reset</button> 
      </div>

    </section>
  )
}

export default Counter