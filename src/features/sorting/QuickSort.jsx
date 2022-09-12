import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { swap, wait } from './helpers';
import { updateActiveSorting } from './sortingSlice';

export default function QuickSort({ Chart }) {
  // component state
  const [grid, setGrid] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [waitCount, setWaitCount] = useState(0);
  // store
  const mainGrid = useSelector((state) => state.sorting.grid);
  const sorting = useSelector((state) => state.sorting.sorting);
  const speed = useSelector((state) => state.sorting.speed);
  const dispatch = useDispatch();
  // chart
  const [c, setC] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [currentChart, setCurrentChart] = useState(null);
  const [backgroundColors, setBackgroundcolors] = useState([]);
  const {
    completeColor,
    barColor,
    pointerColor,
    pointerColor_i,
    pointerColor_j,
  } = useSelector((state) => state.sorting.colors);
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

  // get canvas from DOM
  useEffect(() => {
    setC(document.getElementById('quickChart'));
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

  // sort
  async function sort() {
    setStartTime(Date.now());
    setWaitCount(() => 0);
    await quickSort(grid, 0, grid.length - 1);
    // finished sorting
    setEndTime(Date.now());
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

  const quickSort = async (array, start, end) => {
    if (start < end) {
      const pivot = await sortPivot(array, start, end);
      await quickSort(array, start, pivot - 1);
      await quickSort(array, pivot + 1, end);
    }
    setGrid([...array]);
  };

  const sortPivot = async (array, start, end) => {
    let pivot = array[end];
    let min = start - 1;
    let i;
    setBackgroundcolors((backgroundColors) =>
      updateChartColors(backgroundColors, pointerColor, end)
    );
    await wait(speed);
    setWaitCount((waitCount) => (waitCount += 1));
    for (i = start; i <= end - 1; i++) {
      if (array[i] < pivot) {
        min++;
        swap(min, i, array);
        setGrid([...array]);
        await wait(speed);
        setWaitCount((waitCount) => (waitCount += 1));
      }
    }
    swap(end, min + 1, array);
    setGrid([...array]);
    await wait(speed);
    setWaitCount((waitCount) => (waitCount += 1));
    return min + 1;
  };

  return (
    <div>
      <h2>Quick Sort</h2>
      <canvas id="quickChart"></canvas>
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
}
