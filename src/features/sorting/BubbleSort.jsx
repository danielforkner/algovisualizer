import { current } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { wait } from './helpers';
import './styles/bubbleSort.css';

const BubbleSort = ({ speed, Chart }) => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [waitCount, setWaitCount] = useState(0);
  const sorting = useSelector((state) => state.sorting.sorting);
  const mainGrid = useSelector((state) => state.sorting.grid);
  const [grid, setGrid] = useState([]);
  const [c, setC] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [currentChart, setCurrentChart] = useState(null);
  const [backgroundColors, setBackgroundcolors] = useState([]);
  const barColor = 'rgba(201, 203, 207, 1)';
  const pointerColor = 'rgba(140, 255, 125, 1)';
  const select = (idx) => document.getElementById(`bubblesort:${idx}`);

  useEffect(() => {
    setC(document.getElementById('bubbleChart'));
    if (c) {
      setCtx(c.getContext('2d'));
    }
  }, [c, ctx]);

  useEffect(() => {
    const buildGrid = async () => {
      setBackgroundcolors((backgroundColors) => []);
      let array = [];
      // if (select(0)) select(0).className = 'cell'; // without this the first cell retains the classnames(?)
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
    console.log('current chart: ', currentChart);
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
      console.log(backgroundColors);
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

  async function sort() {
    setStartTime(Date.now());
    setWaitCount(() => 0);
    let unsorted = true;
    let counter = 0;
    while (unsorted) {
      unsorted = false;
      for (let i = 0; i < grid.length - 1 - counter; i++) {
        // select(i).classList.add('pointer');
        setBackgroundcolors((backgroundColors) => {
          let newArray = [...backgroundColors];
          let replace = newArray.indexOf(pointerColor);
          newArray[replace] = barColor;
          newArray[i] = pointerColor;
          return newArray;
        });
        await wait(speed);
        setWaitCount((waitCount) => (waitCount += 1));
        // select(i - 1)?.classList.remove('swap1');
        if (grid[i] > grid[i + 1]) {
          unsorted = true;
          // select(i).classList.add('swap1');
          swap(i, grid);
          setGrid([...grid]);
        }
        // select(i).classList.remove('pointer');
      }
      // select(grid.length - 1 - counter).classList.add('sorted');
      // select(grid.length - 2 - counter)?.classList.remove('swap1');
      counter++;
    }
    // finished sorting
    setEndTime(Date.now());
    // for (let i = 0; i < grid.length; i++) {
    // await wait(40);
    // select(i).classList.add('complete');
    // select(i).classList.add('sorted');
    // }
  }

  return (
    <div>
      <h1>Bubble Sort</h1>
      <canvas id="bubbleChart"></canvas>
      <div className="grid-container">
        {/* {grid.map((elem, idx) => {
          return (
            <div
              className="cell"
              id={`bubblesort:${idx}`}
              key={`bubblesort:${idx}`}
            >
              {elem}
            </div>
          );
        })} */}
      </div>
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
