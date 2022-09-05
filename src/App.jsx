import InsertionSort from "./InsertionSort";
import SelectionSort from "./SelectionSort";
import BubbleSort from './BubbleSort'

const App = () => {
  return (
    <div>
      <button>Sort All</button>
      <button>Refresh All</button>
      <InsertionSort />
      <SelectionSort />
      <BubbleSort />
    </div>
  );
};

export default App;
