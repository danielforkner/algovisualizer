import {useState} from 'react'
import { wait} from './helpers'
import './bubbleSort.css'

const BubbleSort = () => {
    const [grid, setGrid] = useState([]);
    const [speed, setSpeed] = useState(500);
    const select = (idx) => document.getElementById(`bubblesort:${idx}`);
  
    const refresh = async () => {
      if (select(0)) select(0).className = 'cell'; // I don't know why grid[0] still has 'sorted' on the class after refresh
      let arr = [];
      for (let i = 0; i < 10; i++) {
        arr.push(Math.floor(Math.random() * 100));
        setGrid([...arr]);
        await wait(40);
      }
    };
  
    if (!grid.length) {
      refresh();
    }
  
    const swap = (i, array) => {
        let temp = array[i];
        array[i] = array[i+1];
        array[i+1] = temp;
    }

    const sort = async () => {
        let unsorted = true;
        let counter = 0;
        while (unsorted) {
            unsorted = false;
            for (let i = 0; i < grid.length - 1 - counter; i++) {
                select(i).classList.add('pointer');
                await wait(speed);
                if (grid[i] > grid[i+1]) {
                    unsorted = true;
                    swap(i, grid)
                    setGrid([...grid])
                }
                select(i).classList.remove('pointer')
            }
            select(grid.length - 1 - counter).classList.add('sorted')
            counter++
        }
        for (let i = 0; i < grid.length; i++) {
            await wait(40);
            select(i).classList.add('complete');
            select(i).classList.add('sorted');
          }
    };
  
    return (
      <div>
        <h1>Bubble Sort</h1>
        <div className="controls-container">
          <input
            type="range"
            min="150"
            max="1000"
            style={{ direction: 'rtl' }}
            value={speed}
            className="speedSlider"
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        <div className="grid-container">
          {grid.map((elem, idx) => {
            return (
              <div
                className="cell"
                id={`bubblesort:${idx}`}
                key={`bubblesort:${idx}`}
              >
                {elem}
              </div>
            );
          })}
        </div>
        <button onClick={sort}>Sort!</button>
        <button onClick={refresh}>Refresh</button>
      </div>
    );
  };

  export default BubbleSort