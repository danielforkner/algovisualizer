import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wait, swap } from './helpers';
import { updateActiveSorting } from './sortingSlice';
import './styles/insertionSort.css';

const InsertionSort = ({ speed, Chart }) => {
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
  const { completeColor, selectedColor, barColor, pointerColor } = useSelector(
    (state) => state.sorting.colors
  );

  // get canvas from DOM
  useEffect(() => {
    setC(document.getElementById('insertionChart'));
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
        resopnsive: false,
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

  async function sort() {
    setStartTime(Date.now());
    setWaitCount(() => 0);
    for (let i = 0; i < grid.length; i++) {
      setBackgroundcolors((backgroundColors) =>
        updateChartColors(backgroundColors, pointerColor, i)
      );
      await wait(speed);
      setWaitCount((waitCount) => (waitCount += 1));
      let j = i;
      while (j > 0 && grid[j] < grid[j - 1]) {
        if (j !== i) {
          let idx = j;
          setBackgroundcolors((backgroundColors) =>
            updateChartColors(backgroundColors, selectedColor, idx)
          );
          await wait(speed);
          setWaitCount((waitCount) => (waitCount += 1));
        }
        swap(j, j - 1, grid);
        setGrid([...grid]);
        j--;
      }
      setBackgroundcolors((backgroundColors) => {
        let replace = backgroundColors.indexOf(selectedColor);
        if (replace) {
          const newArray = [...backgroundColors];
          newArray[replace] = barColor;
          return newArray;
        }
      });
    }
    // finished sorting
    setEndTime(Date.now());
    dispatch(updateActiveSorting(-1));
    for (let i = 0; i < grid.length; i++) {
      await wait(40);
      setBackgroundcolors((backgroundColors) => {
        return ([...backgroundColors][i] = completeColor);
      });
    }
  }

  return (
    <div>
      <h1>Insertion Sort</h1>
      <canvas id="insertionChart"></canvas>
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

export default InsertionSort;
