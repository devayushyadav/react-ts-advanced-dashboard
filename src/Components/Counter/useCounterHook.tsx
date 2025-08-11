import { useState } from "react"

type Props = {
    initialValue : number
}

const useCounter = ({initialValue = 0} : Props) =>{
    const [count,setCount] = useState<number>(initialValue) 

    const increment = () => setCount(prevValue => prevValue + 1 )

    return { count , increment }
}

export default useCounter