import { useEffect, useState } from 'react';
import { wait } from './helpers';
import './mergeSort.css';

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

  async function mergeSort(array, start, end) {
    if (start < end) {
      let mid = Math.floor((start + end) / 2);

      // --------> for visualization purposes only
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
      setStack((stack) => [...stack, leftArr, rightArr]);
      await wait(speed);
      // <--------

      await await mergeSort(array, start, mid);
      await mergeSort(array, mid + 1, end);
      await merge(array, start, mid, end);
    }
    return array;
  }

  async function merge(array, start, mid, end) {
    const localStack = [];

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
      } else {
        array[pointer] = rightArr[rightIdx++];
      }
      pointer++;
    }

    while (leftIdx < leftLen) array[pointer++] = leftArr[leftIdx++];
    while (rightIdx < rightLen) array[pointer++] = rightArr[rightIdx++];

    // --------> for visualization purposes only
    leftLen = mid - start + 1;
    rightLen = end - mid;

    leftArr = [];
    rightArr = [];

    for (let i = 0; i < leftLen; i++) {
      leftArr[i] = array[start + i];
    }
    for (let i = 0; i < rightLen; i++) {
      rightArr[i] = array[mid + 1 + i];
    }
    setStack((stack) => [...stack, [...leftArr, ...rightArr]]);
    await wait(speed);
    // <--------
  }
  async function sort() {
    await mergeSort([...grid], 0, grid.length - 1);
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
      <h2>Stack</h2>
      {!stack.length ? null : (
        <>
          {stack.map((elem, idx) => {
            return (
              <div
                className="grid-container"
                key={`mergeStackContainer:${idx}`}
              >
                {elem.map((num, i) => {
                  return (
                    <div className="cell" key={`mergesortStack:[${idx},${i}]`}>
                      {num}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default MergeSort;
