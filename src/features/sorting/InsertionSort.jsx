import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { wait, swap } from './helpers';
import './styles/insertionSort.css';

const InsertionSort = ({ mainGrid, speed }) => {
  const [grid, setGrid] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [waitCount, setWaitCount] = useState(0);
  const sorting = useSelector((state) => state.sorting.sorting);
  const select = (idx) => document.getElementById(`insertionsort:${idx}`);

  useEffect(() => {
    setGrid([...mainGrid]);
  }, [mainGrid]);

  useEffect(() => {
    if (sorting) sort();
  }, [sorting]);

  async function sort() {
    setStartTime(Date.now());
    setWaitCount(() => 0);
    for (let i = 0; i < grid.length; i++) {
      select(i).classList.add('pointer-i');
      let j = i;
      while (j > 0 && grid[j] < grid[j - 1]) {
        select(j).classList.add('selected-j');
        await wait(speed);
        setWaitCount((waitCount) => (waitCount += 1));
        swap(j, j - 1, grid);
        setGrid([...grid]);
        select(j).classList.remove('selected-j');
        j--;
      }
      select(j).classList.add('selected-j');
      await wait(speed);
      setWaitCount((waitCount) => (waitCount += 1));
      select(j).classList.remove('selected-j');
      select(i).classList.remove('pointer-i');
    }
    // finished sorting
    setEndTime(Date.now());
    for (let i = 0; i < grid.length; i++) {
      await wait(40);
      select(i).classList.add('complete');
      select(i).classList.add('sorted');
    }
  }

  return (
    <div>
      <h1>Insertion Sort</h1>
      <div className="grid-container">
        {grid.map((elem, idx) => {
          return (
            <div
              className="cell"
              id={`insertionsort:${idx}`}
              key={`insertionsort:${idx}`}
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
      {/* <button onClick={sort}>Sort!</button> */}
      {/* <button onClick={refresh}>Refresh</button> */}
    </div>
  );
};

export default InsertionSort;
