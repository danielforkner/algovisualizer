import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { wait, swap } from './helpers';
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
  // chart
  const [c, setC] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [currentChart, setCurrentChart] = useState(null);
  const [backgroundColors, setBackgroundcolors] = useState([]);
  const barColor = 'rgba(201, 203, 207, 1)';
  const pointerColor_i = 'rgba(140, 255, 125, 1)';
  const pointerColor_j = 'rgba(140, 200, 125, 1)';
  const minimumColor = 'rgba(100, 0, 0, 1)';
  const completeColor = 'rgba(140, 255, 125, 1)';

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
        // select(j).classList.add('pointer-j');
        await wait(speed);
        setWaitCount((waitCount) => (waitCount += 1));
        if (grid[j] < grid[min]) {
          // select(min).classList.remove('minimum');
          min = j;
          setBackgroundcolors((backgroundColors) =>
            updateChartColors(backgroundColors, minimumColor, j)
          );
          // select(min).classList.add('minimum');
        }
        // select(j).classList.remove('pointer-j');
      }
      // select(i).classList.add('sorted');
      swap(i, min, grid);
      setGrid([...grid]);
      // await wait(speed);
      // setWaitCount((waitCount) => (waitCount += 1));
      // select(min).classList.remove('minimum');
      // select(i).classList.remove('pointer-i');
    }
    // finished sorting
    setEndTime(Date.now());
    for (let i = 0; i < grid.length; i++) {
      await wait(40);
      setBackgroundcolors((backgroundColors) => {
        return ([...backgroundColors][i] = completeColor);
      });
    }
  };

  return (
    <div>
      <h1>Selection Sort</h1>
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
