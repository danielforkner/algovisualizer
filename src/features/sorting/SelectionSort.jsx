import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wait, swap } from './helpers';
import { updateActiveSorting } from './sortingSlice';
import './styles/selectionSort.css';

const SelectionSort = ({ speed, Chart }) => {
  // component state
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [waitCount, setWaitCount] = useState(0);
  const [grid, setGrid] = useState([]);
  // store
  const mainGrid = useSelector((state) => state.sorting.grid);
  const sorting = useSelector((state) => state.sorting.sorting);
  const dispatch = useDispatch();
  // chart
  const [c, setC] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [currentChart, setCurrentChart] = useState(null);
  const [backgroundColors, setBackgroundcolors] = useState([]);

  const {
    completeColor,
    barColor,
    minimumColor,
    pointerColor_i,
    pointerColor_j,
  } = useSelector((state) => state.sorting.colors);

  // get canvas from DOM
  useEffect(() => {
    setC(document.getElementById('selectionChart'));
    if (c) {
      setCtx(c.getContext('2d'));
    }
  }, [c, ctx]);

  // start
  useEffect(() => {
    if (sorting) sort();
  }, [sorting]);

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

  const updateChartColors = (array, color, idx) => {
    let replace = array.indexOf(color);
    const newArray = [...array];
    if (replace >= 0) newArray[replace] = barColor;
    newArray[idx] = color;
    return newArray;
  };

  const sort = async () => {
    setStartTime(Date.now());
    setWaitCount(() => 0);
    for (let i = 0; i < grid.length; i++) {
      let min = i;
      setBackgroundcolors((backgroundColors) =>
        updateChartColors(backgroundColors, pointerColor_i, i)
      );
      await wait(speed);
      setWaitCount((waitCount) => (waitCount += 1));
      for (let j = i + 1; j < grid.length; j++) {
        setBackgroundcolors((backgroundColors) =>
          updateChartColors(backgroundColors, pointerColor_j, j)
        );
        await wait(speed);
        setWaitCount((waitCount) => (waitCount += 1));
        if (grid[j] < grid[min]) {
          min = j;
          setBackgroundcolors((backgroundColors) =>
            updateChartColors(backgroundColors, minimumColor, j)
          );
        }
      }
      swap(i, min, grid);
      setGrid([...grid]);
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
  };

  return (
    <div>
      <h2>Selection Sort</h2>
      <canvas id="selectionChart"></canvas>
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

export default SelectionSort;
