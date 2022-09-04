import { useState } from "react";
import { wait, swap } from './helpers'
import './selectionSort.css'

const SelectionSort = () => {
    const [grid, setGrid] = useState([])
    const [speed, setSpeed] = useState(500)
    const select = (idx) => document.getElementById(`selectionsort:${idx}`);

    const sort = async () => {
        for (let i = 0; i < grid.length; i++) {
            let min = i;
            select(i).classList.add('pointer-i')
            for (let j = i + 1; j < grid.length; j++) {
                select(j).classList.add('pointer-j')
                await wait(speed)
                if (grid[j] < grid[min]) {
                    select(min).classList.remove('minimum')
                    min = j
                    select(min).classList.add('minimum')
                };
                select(j).classList.remove('pointer-j')
            }
            swap(i, min, grid)
            setGrid([...grid])
            await wait(speed)
            select(min).classList.remove('minimum')
            select(i).classList.remove('pointer-i')
        }
        for (let i = 0; i < grid.length; i++) {
            await wait(40);
            select(i).classList.add('sorted');
          }
    }

    const refresh = async () => {
        select(0)?.classList.remove('sorted'); // I don't know why grid[0] still has 'sorted' on the class after refresh
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

    return (
        <div>
          <h1>Selection Sort</h1>
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
                  id={`selectionsort:${idx}`}
                  key={`selectionsort:${idx}`}
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
}

export default SelectionSort