import { useState } from 'react';
import { wait } from './helpers';
import InsertionSort from './InsertionSort';
import BubbleSort from './BubbleSort';
import SelectionSort from './SelectionSort';
import MergeSort from './MergeSort';
import { useDispatch, useSelector } from 'react-redux';
import { refreshGrid, setSorting } from './sortingSlice';

const SortMain = () => {
  const grid = useSelector((state) => state.sorting.grid);
  const sorting = useSelector((state) => state.sorting.sorting);
  const dispatch = useDispatch();
  const [speed, setSpeed] = useState(500);

  const refresh = async () => {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(Math.floor(Math.random() * 100));
      await wait(40);
    }
    dispatch(refreshGrid(arr));
  };

  const handleSort = async () => {
    dispatch(setSorting(true));
  };

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
      <button onClick={handleSort}>Start Sorting</button>
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
      <InsertionSort mainGrid={grid} speed={speed} sorting={sorting} />
      <SelectionSort mainGrid={grid} speed={speed} sorting={sorting} />
      <BubbleSort mainGrid={grid} speed={speed} sorting={sorting} />
      <MergeSort mainGrid={grid} speed={speed} sorting={sorting} />
    </div>
  );
};

export default SortMain;
