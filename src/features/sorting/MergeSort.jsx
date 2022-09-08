import { useEffect, useState } from 'react';
import { wait } from './helpers';
import './styles/mergeSort.css';

const MergeSort = ({ mainGrid, speed, sorting }) => {
  const [grid, setGrid] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [waitCount, setWaitCount] = useState(0);
  // const len = grid.length;
  // const [stack, setStack] = useState([]);
  const select = (idx) => document.getElementById(`mergesort:${idx}`);

  useEffect(() => {
    setGrid([...mainGrid]);
  }, [mainGrid]);

  useEffect(() => {
    if (sorting) sort();
  }, [sorting]);

  async function mergeSort(array, start, end) {
    if (start < end) {
      let mid = Math.floor((start + end) / 2);

      // --------> for visualization purposes only
      // let leftLen = mid - start + 1;
      // let rightLen = end - mid;

      // let leftArr = [];
      // let rightArr = [];

      // for (let i = 0; i < leftLen; i++) {
      //   leftArr[i] = array[start + i];
      // }
      // for (let i = 0; i < rightLen; i++) {
      //   rightArr[i] = array[mid + 1 + i];
      // }
      // setStack((stack) => [...stack, leftArr, rightArr]);
      // await wait(speed);
      // <--------

      await mergeSort(array, start, mid);
      await mergeSort(array, mid + 1, end);
      await merge(array, start, mid, end);
    }
    return array;
  }

  async function merge(array, start, mid, end) {
    // const localStack = [];

    let leftLen = mid - start + 1;
    let rightLen = end - mid;

    let leftArr = [];
    let rightArr = [];

    for (let i = 0; i < leftLen; i++) {
      leftArr[i] = array[start + i];
    }
    for (let i = 0; i < rightLen; i++) {
      rightArr[i] = array[mid + 1 + i];
    }

    let leftIdx = 0;
    let rightIdx = 0;
    let pointer = start;

    while (leftIdx < leftLen && rightIdx < rightLen) {
      if (leftArr[leftIdx] <= rightArr[rightIdx]) {
        array[pointer] = leftArr[leftIdx++];
        select(pointer).classList.remove('left', 'right');
        select(pointer).classList.add(start % 2 === 0 ? 'left' : 'right');
      } else {
        array[pointer] = rightArr[rightIdx++];
        select(pointer).classList.remove('left', 'right');
        select(pointer).classList.add(start % 2 === 0 ? 'left' : 'right');
      }
      pointer++;
    }

    while (leftIdx < leftLen) {
      select(pointer).classList.remove('left', 'right');
      select(pointer).classList.add(start % 2 === 0 ? 'left' : 'right');
      array[pointer++] = leftArr[leftIdx++];
    }
    while (rightIdx < rightLen) {
      select(pointer).classList.add('left', 'right');
      select(pointer).classList.add(start % 2 === 0 ? 'left' : 'right');
      array[pointer++] = rightArr[rightIdx++];
    }
    setGrid([...array]);
    await wait(speed);
    setWaitCount((waitCount) => (waitCount += 1));

    // --------> for visualization purposes only
    // leftLen = mid - start + 1;
    // rightLen = end - mid;

    // leftArr = [];
    // rightArr = [];

    // for (let i = 0; i < leftLen; i++) {
    //   leftArr[i] = array[start + i];
    // }
    // for (let i = 0; i < rightLen; i++) {
    //   rightArr[i] = array[mid + 1 + i];
    // }
    // setStack((stack) => [...stack, [...leftArr, ...rightArr]]);
    // await wait(speed);
    // <--------
  }
  async function sort() {
    setStartTime(Date.now());
    setWaitCount(() => 0);
    await mergeSort([...grid], 0, grid.length - 1);
    setEndTime(Date.now());
    for (let i = 0; i < grid.length; i++) {
      let cell = select(i);
      cell.classList.remove('left', 'right');
      cell.classList.add('complete');
      cell.classList.add('sorted');
    }
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
      <div className="end-time">
        {endTime
          ? `Time to sort: ${(
              (endTime - startTime - speed * waitCount) /
              1000
            ).toFixed(3)}s`
          : null}
      </div>
      {/* {!stack.length ? null : (
        <>
          {stack.map((elem, idx) => {
            return (
              <div
                className="stack-container"
                key={`mergeStackContainer:${idx}`}
              >
                <div className="grid-container">
                  {elem.map((num, i) => {
                    return (
                      <div
                        className="cell"
                        key={`mergesortStack:[${idx},${i}]`}
                      >
                        {num}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </>
      )} */}
    </div>
  );
};

export default MergeSort;
