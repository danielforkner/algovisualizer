import InsertionSort from "./InsertionSort";
import SelectionSort from "./SelectionSort";
import BubbleSort from './BubbleSort'
import { useEffect, useState } from "react";
import { wait } from "./helpers";

const App = () => {
  const [grid, setGrid] = useState([])
  const [speed, setSpeed] = useState(500);
  const [sorting, setSorting] = useState(false)

  const refresh = async () => {
      let arr = [];
      for (let i = 0; i < 10; i++) {
        setGrid([...arr]);
        arr.push(Math.floor(Math.random() * 100));
        await wait(40);
      }
    };
  
  useEffect(() => {
    refresh();
  }, [])

    const handleSort = async () => {
      setSorting(true);
      await wait(50)
      setSorting(false);
    }

  return (
    <div>
      <div className="controls-container">
          <input
            type="range"
            min="75"
            max="1000"
            style={{ direction: 'rtl' }}
            value={speed}
            className="speedSlider"
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        <div>{speed > 650 ? 'Slow' : speed > 400 ? 'Medium' : 'Fast'}</div>
      <button onClick={handleSort}>Sort All</button>
      <button onClick={refresh}>Refresh</button>
      <div className="grid-container">
          {grid.map((elem, idx) => {
            return (
              <div
                className="cell"
                id={`sortingGrid:${idx}`}
                key={`sortingGrid:${idx}`}
              >
                {elem}
              </div>
            );
          })}
        </div>
      <InsertionSort mainGrid={grid} speed={speed} sorting={sorting}/>
      <SelectionSort mainGrid={grid} speed={speed} sorting={sorting}/>
      <BubbleSort mainGrid={grid} speed={speed} sorting={sorting}/>
    </div>
  );
};

export default App;
