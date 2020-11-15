import React,{useState} from 'react'

export default function (props) {
        const[counter,setCount] = useState(0)
        return (
            <>
                <button onClick={()=>setCount(counter+2)}>+2</button>
                <button onClick = {props.decrement}>
                    decrement
                </button>
                    <h1>{props.count}</h1>
                    <h2>{counter}</h2>
                <button onClick = {props.increment}>
                    increment
                </button>

                {/* z.revazishvili@live.com */}
            </>
        )

}