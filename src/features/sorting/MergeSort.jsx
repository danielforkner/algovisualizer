import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wait } from './helpers';
import { updateActiveSorting } from './sortingSlice';
import './styles/mergeSort.css';

const MergeSort = ({ speed, Chart }) => {
  // component state
  const [grid, setGrid] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [waitCount, setWaitCount] = useState(0);
  // store
  const mainGrid = useSelector((state) => state.sorting.grid);
  const sorting = useSelector((state) => state.sorting.sorting);
  const dispatch = useDispatch();
  // chart
  const [c, setC] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [currentChart, setCurrentChart] = useState(null);
  const [backgroundColors, setBackgroundcolors] = useState([]);
  const { completeColor, barColor, sortedColor } = useSelector(
    (state) => state.sorting.colors
  );

  // get canvas from DOM
  useEffect(() => {
    setC(document.getElementById('mergeChart'));
    if (c) {
      setCtx(c.getContext('2d'));
    }
  }, [c, ctx]);

  // refresh component state
  useEffect(() => {
    const buildGrid = async () => {
      setBackgroundcolors([]);
      let array = [];
      for (let i = 0; i < mainGrid.length; i++) {
        array.push(mainGrid[i]);
        setBackgroundcolors((backgroundColors) => [
          ...backgroundColors,
          barColor,
        ]);
        setGrid([...array]);
        await wait(10);
      }
    };
    setEndTime(0);
    buildGrid();
  }, [mainGrid]);

  useEffect(() => {
    if (sorting) sort();
  }, [sorting]);

  // create chart
  useEffect(() => {
    const data = {
      labels: [...grid.keys()],
      datasets: [
        {
          data: grid,
          backgroundColor: backgroundColors,
          labels: false,
        },
      ],
    };
    const config = {
      type: 'bar',
      data,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
    const buildChart = () => {
      if (currentChart) currentChart.destroy();
      const chart = new Chart(ctx, config);
      chart.options.animation = false; // disables all animations
      setCurrentChart(chart);
    };

    if (ctx && !currentChart) buildChart();
    if (currentChart) {
      currentChart.config.data = data;
      currentChart.update();
    }
  }, [grid, ctx, backgroundColors]);

  // sort
  async function mergeSort(array, start, end) {
    if (start < end) {
      let mid = Math.floor((start + end) / 2);

      await mergeSort(array, start, mid);
      await mergeSort(array, mid + 1, end);
      merge(array, start, mid, end);
      await wait(speed);
      setWaitCount((waitCount) => (waitCount += 1));
    }
    return array;
  }

  function merge(array, start, mid, end) {
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
      let idx = pointer;
      if (leftArr[leftIdx] <= rightArr[rightIdx]) {
        array[pointer] = leftArr[leftIdx++];
        setBackgroundcolors((backgroundColors) => {
          const newArray = [...backgroundColors];
          newArray[idx] = sortedColor;
          return newArray;
        });
      } else {
        array[pointer] = rightArr[rightIdx++];
        setBackgroundcolors((backgroundColors) => {
          const newArray = [...backgroundColors];
          newArray[idx] = sortedColor;
          return newArray;
        });
      }
      pointer++;
    }

    while (leftIdx < leftLen) {
      let idx = pointer;
      setBackgroundcolors((backgroundColors) => {
        const newArray = [...backgroundColors];
        newArray[idx] = sortedColor;
        return newArray;
      });
      array[pointer++] = leftArr[leftIdx++];
    }
    while (rightIdx < rightLen) {
      let idx = pointer;
      setBackgroundcolors((backgroundColors) => {
        const newArray = [...backgroundColors];
        newArray[idx] = sortedColor;
        return newArray;
      });
      array[pointer++] = rightArr[rightIdx++];
    }
    setGrid([...array]);
  }
  async function sort() {
    setStartTime(Date.now());
    setWaitCount(() => 0);
    await mergeSort([...grid], 0, grid.length - 1);
    setEndTime(Date.now());
    // finished sorting
    for (let i = 0; i < grid.length; i++) {
      await wait(15);
      setBackgroundcolors((backgroundColors) => {
        let array = [...backgroundColors];
        array[i] = completeColor;
        return array;
      });
    }
    dispatch(updateActiveSorting(-1));
  }

  return (
    <div>
      <h2>Merge Sort</h2>
      <canvas id="mergeChart"></canvas>
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

export default MergeSort;
