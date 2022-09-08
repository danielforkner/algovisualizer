import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { wait, swap } from './helpers';
import './styles/selectionSort.css';

const SelectionSort = ({ speed }) => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [waitCount, setWaitCount] = useState(0);
  const [grid, setGrid] = useState([]);
  const select = (idx) => document.getElementById(`selectionsort:${idx}`);
  const mainGrid = useSelector((state) => state.sorting.grid);
  const sorting = useSelector((state) => state.sorting.sorting);

  useEffect(() => {
    const buildGrid = async () => {
      let array = [];
      if (select(0)) select(0).className = 'cell'; // without this the first cell retains the classnames(?)
      for (let i = 0; i < mainGrid.length; i++) {
        array.push(mainGrid[i]);
        setGrid([...array]);
        await wait(40);
      }
    };
    setEndTime(0);
    buildGrid();
  }, [mainGrid]);

  useEffect(() => {
    if (sorting) sort();
  }, [sorting]);

  const sort = async () => {
    setStartTime(Date.now());
    setWaitCount(() => 0);
    for (let i = 0; i < grid.length; i++) {
      let min = i;
      select(i).classList.add('pointer-i');
      for (let j = i + 1; j < grid.length; j++) {
        select(j).classList.add('pointer-j');
        await wait(speed);
        setWaitCount((waitCount) => (waitCount += 1));
        if (grid[j] < grid[min]) {
          select(min).classList.remove('minimum');
          min = j;
          select(min).classList.add('minimum');
        }
        select(j).classList.remove('pointer-j');
      }
      select(i).classList.add('sorted');
      swap(i, min, grid);
      setGrid([...grid]);
      await wait(speed);
      setWaitCount((waitCount) => (waitCount += 1));
      select(min).classList.remove('minimum');
      select(i).classList.remove('pointer-i');
    }
    // finished sorting
    setEndTime(Date.now());
    for (let i = 0; i < grid.length; i++) {
      await wait(40);
      select(i).classList.add('complete');
    }
  };

  return (
    <div>
      <h1>Selection Sort</h1>
      <div className="grid-container">
        {grid.map((elem, idx) => {
          return (
            <div
              className="cell"
              id={`selectionsort:${idx}`}
              key={`selectionsort:${idx}`}
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

export default SelectionSort;
