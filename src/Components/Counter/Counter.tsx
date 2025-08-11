import useCounter from "./useCounterHook"

const Counter = () => {
    const { count , increment } = useCounter({initialValue : 10})

    return <div className="card">
        <button onClick={increment}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
}

export default Counter