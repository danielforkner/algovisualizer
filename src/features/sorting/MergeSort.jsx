import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { wait } from './helpers';
import './styles/mergeSort.css';

const MergeSort = ({ speed, Chart }) => {
  // component state
  const [grid, setGrid] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [waitCount, setWaitCount] = useState(0);
  // store
  const select = (idx) => document.getElementById(`mergesort:${idx}`);
  const mainGrid = useSelector((state) => state.sorting.grid);
  const sorting = useSelector((state) => state.sorting.sorting);
  // chart
  const [c, setC] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [currentChart, setCurrentChart] = useState(null);
  const [backgroundColors, setBackgroundcolors] = useState([]);
  const barColor = 'rgba(201, 203, 207, 1)';
  const sortedColor = 'rgba(140, 140, 125, 1)';
  const completeColor = 'rgba(140, 255, 125, 1)';

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
      if (select(0)) select(0).className = 'cell'; // without this the first cell retains the classnames(?)
      for (let i = 0; i < mainGrid.length; i++) {
        array.push(mainGrid[i]);
        setBackgroundcolors((backgroundColors) => [
          ...backgroundColors,
          barColor,
        ]);
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

  const updateChartColors = (array, color, idx) => {
    let replace = array.indexOf(color);
    const newArray = [...array];
    if (replace >= 0) newArray[replace] = barColor;
    newArray[idx] = color;
    return newArray;
  };

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
        // select(pointer).classList.remove('left', 'right');
        // select(pointer).classList.add(start % 2 === 0 ? 'left' : 'right');
      } else {
        array[pointer] = rightArr[rightIdx++];
        setBackgroundcolors((backgroundColors) => {
          const newArray = [...backgroundColors];
          newArray[idx] = sortedColor;
          return newArray;
        });
        // select(pointer).classList.remove('left', 'right');
        // select(pointer).classList.add(start % 2 === 0 ? 'left' : 'right');
      }
      pointer++;
    }

    while (leftIdx < leftLen) {
      let idx = pointer;
      // select(pointer).classList.remove('left', 'right');
      // select(pointer).classList.add(start % 2 === 0 ? 'left' : 'right');
      setBackgroundcolors((backgroundColors) => {
        const newArray = [...backgroundColors];
        newArray[idx] = sortedColor;
        return newArray;
      });
      array[pointer++] = leftArr[leftIdx++];
    }
    while (rightIdx < rightLen) {
      let idx = pointer;
      // select(pointer).classList.add('left', 'right');
      // select(pointer).classList.add(start % 2 === 0 ? 'left' : 'right');
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
      setBackgroundcolors((backgroundColors) => {
        return ([...backgroundColors][i] = completeColor);
      });
    }
  }

  return (
    <div>
      <h1>Merge Sort</h1>
      <canvas id="mergeChart"></canvas>
      {/* <div className="grid-container">
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
      </div> */}
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
