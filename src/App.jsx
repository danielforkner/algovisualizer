import InsertionSort from "./InsertionSort";
import SelectionSort from "./SelectionSort";

const App = () => {
  return (
    <div>
      <button>Sort All</button>
      <button>Refresh All</button>
      <InsertionSort />
      <SelectionSort />
    </div>
  );
};

export default App;
