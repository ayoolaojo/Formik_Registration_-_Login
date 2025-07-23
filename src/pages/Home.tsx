import { useCounterStore } from "../../store/counterStore";
function Home() {
  const state = useCounterStore();
  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={state.increase}>Incrase</button>
      <button onClick={state.decrease}>decrease</button>
      <button onClick={() => state.increaseByNumber(5)}>Increase By 5 </button>
    </div>
  );
}

export default Home;
