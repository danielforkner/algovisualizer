import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { wait } from './helpers';
import './styles/bubbleSort.css';

const BubbleSort = ({ speed }) => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [waitCount, setWaitCount] = useState(0);
  const sorting = useSelector((state) => state.sorting.sorting);
  const mainGrid = useSelector((state) => state.sorting.grid);
  const [grid, setGrid] = useState([]);
  const select = (idx) => document.getElementById(`bubblesort:${idx}`);

  useEffect(() => {
    setGrid([...mainGrid]);
  }, [mainGrid]);

  useEffect(() => {
    if (sorting) sort();
  }, [sorting]);

  const swap = (i, array) => {
    let temp = array[i];
    array[i] = array[i + 1];
    array[i + 1] = temp;
  };

  async function sort() {
    setStartTime(Date.now());
    setWaitCount(() => 0);
    let unsorted = true;
    let counter = 0;
    while (unsorted) {
      unsorted = false;
      for (let i = 0; i < grid.length - 1 - counter; i++) {
        select(i).classList.add('pointer');
        await wait(speed);
        setWaitCount((waitCount) => (waitCount += 1));
        select(i - 1)?.classList.remove('swap1');
        if (grid[i] > grid[i + 1]) {
          unsorted = true;
          select(i).classList.add('swap1');
          swap(i, grid);
          setGrid([...grid]);
        }
        select(i).classList.remove('pointer');
      }
      select(grid.length - 1 - counter).classList.add('sorted');
      select(grid.length - 2 - counter)?.classList.remove('swap1');
      counter++;
    }
    setEndTime(Date.now());
    // finished sorting
    for (let i = 0; i < grid.length; i++) {
      await wait(40);
      select(i).classList.add('complete');
      select(i).classList.add('sorted');
    }
  }

  return (
    <div>
      <h1>Bubble Sort</h1>
      <div className="grid-container">
        {grid.map((elem, idx) => {
          return (
            <div
              className="cell"
              id={`bubblesort:${idx}`}
              key={`bubblesort:${idx}`}
            >
              {elem}
            </div>
          );
        })}
      </div>
      <div className="end-time">
        {endTime
          ? `Time to sort: ${(
              (endTime - startTime - speed * waitCount) /
              1000
            ).toFixed(3)}s`
          : null}
      </div>
    </div>
  );
};

export default BubbleSort;
