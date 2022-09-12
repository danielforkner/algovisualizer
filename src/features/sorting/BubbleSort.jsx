import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wait } from './helpers';
import { updateActiveSorting } from './sortingSlice';
import './styles/bubbleSort.css';

const BubbleSort = ({ speed, Chart }) => {
  // component state
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [waitCount, setWaitCount] = useState(0);
  const [grid, setGrid] = useState([]);
  // store
  const sorting = useSelector((state) => state.sorting.sorting);
  const mainGrid = useSelector((state) => state.sorting.grid);
  const dispatch = useDispatch();
  // chart
  const [c, setC] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [currentChart, setCurrentChart] = useState(null);
  const [backgroundColors, setBackgroundcolors] = useState([]);
  const { completeColor, barColor, pointerColor } = useSelector(
    (state) => state.sorting.colors
  );

  // get canvas from DOM
  useEffect(() => {
    setC(document.getElementById('bubbleChart'));
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

  useEffect(() => {
    if (sorting) sort();
  }, [sorting]);

  const swap = (i, array) => {
    let temp = array[i];
    array[i] = array[i + 1];
    array[i + 1] = temp;
  };

  const updateChartColors = (array, color, idx) => {
    let replace = array.indexOf(color);
    const newArray = [...array];
    if (replace >= 0) newArray[replace] = barColor;
    newArray[idx] = color;
    return newArray;
  };

  async function sort() {
    setStartTime(Date.now());
    setWaitCount(() => 0);
    let unsorted = true;
    let counter = 0;
    while (unsorted) {
      unsorted = false;
      for (let i = 0; i < grid.length - 1 - counter; i++) {
        setBackgroundcolors((backgroundColors) =>
          updateChartColors(backgroundColors, pointerColor, i)
        );
        await wait(speed);
        setWaitCount((waitCount) => (waitCount += 1));
        if (grid[i] > grid[i + 1]) {
          unsorted = true;
          swap(i, grid);
          setGrid([...grid]);
        }
      }
      counter++;
    }
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

  return (
    <div>
      <h2>Bubble Sort</h2>
      <canvas id="bubbleChart"></canvas>
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
