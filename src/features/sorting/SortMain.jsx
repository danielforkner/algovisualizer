import { useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { wait } from './helpers';
import InsertionSort from './InsertionSort';
import BubbleSort from './BubbleSort';
import SelectionSort from './SelectionSort';
import MergeSort from './MergeSort';
import { useDispatch, useSelector } from 'react-redux';
import { refreshGrid, setSorting, toggleSorting } from './sortingSlice';
import './styles/sortStyles.css';

const SortMain = () => {
  Chart.register(...registerables);
  const grid = useSelector((state) => state.sorting.grid);
  const sorting = useSelector((state) => state.sorting.sorting);
  const dispatch = useDispatch();
  const [speed, setSpeed] = useState(500);

  const refresh = () => {
    let arr = [];
    for (let i = 0; i < 50; i++) {
      arr.push(Math.floor(Math.random() * 100));
    }
    dispatch(refreshGrid(arr));
  };

  const handleSort = async () => {
    dispatch(setSorting(true));
    await wait(50);
    dispatch(toggleSorting());
  };

  return (
    <div>
      <div className="container">
        <div>Speed: </div>
        <input
          type="range"
          min="75"
          max="1000"
          style={{ direction: 'rtl' }}
          value={speed}
          className="speedSlider"
          onChange={(e) => setSpeed(e.target.value)}
        />
        <div>{speed > 650 ? 'Slow' : speed > 400 ? 'Medium' : 'Fast'}</div>
      </div>
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
      <div id="grid-display">
        <InsertionSort Chart={Chart} speed={speed} />
        <SelectionSort Chart={Chart} speed={speed} />
        <BubbleSort Chart={Chart} speed={speed} />
        <MergeSort Chart={Chart} speed={speed} />
      </div>
    </div>
  );
};

export default SortMain;
