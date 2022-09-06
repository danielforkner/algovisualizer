import { useEffect, useState } from 'react';
import { wait } from './helpers';

const MergeSort = ({ mainGrid, speed, sorting }) => {
  const [grid, setGrid] = useState([]);
  const [stack, setStack] = useState([]);
  const select = (idx) => document.getElementById(`mergesort:${idx}`);

  useEffect(() => {
    setGrid([...mainGrid]);
  }, [mainGrid]);

  useEffect(() => {
    if (sorting) sort();
  }, [sorting]);

  async function merge(left, right) {
    let arr = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        arr.push(left.shift());
      } else {
        arr.push(right.shift());
      }
    }
    return [...arr, ...left, ...right];
  }

  async function mergeSort(array) {
    const mid = Math.floor(array.length / 2);

    if (array.length === 1) {
      return array;
    }

    const left = array.splice(0, mid);
    const sorted = await merge(await mergeSort(left), await mergeSort(array));
    setGrid([...sorted]);
    await wait(speed);
    return sorted;
  }
  async function sort() {
    const sorted = await mergeSort(grid);
    setGrid([...sorted]);
  }

  return (
    <div>
      <h1>Merge Sort</h1>
      <div className="grid-container">
        {grid.map((elem, idx) => {
          return (
            <div
              className="cell"
              id={`mergesort:${idx}`}
              key={`mergesort:${idx}`}
            >
              {elem}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MergeSort;
