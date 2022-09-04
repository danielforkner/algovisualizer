import {useState} from 'react'
import { wait, swap} from './helpers'

const InsertionSort = () => {
    const [grid, setGrid] = useState([]);
    const [speed, setSpeed] = useState(500);
    const select = (idx) => document.getElementById(`insertionsort:${idx}`);
  
    const refresh = async () => {
      select(0)?.classList.remove('sorted'); // I don't know why grid[0] still has 'sorted' on the class after refresh
      let arr = [];
      for (let i = 0; i < 10; i++) {
        arr.push(Math.floor(Math.random() * 100));
        setGrid([...arr]);
        await wait(25);
      }
    };
  
    if (!grid.length) {
      refresh();
    }
  
    const sort = async () => {
      for (let i = 0; i < grid.length; i++) {
        select(i).classList.add('pointer-i');
        let j = i;
        while (j > 0 && grid[j] < grid[j - 1]) {
          select(j).classList.add('selected-j');
          await wait(speed);
          swap(j, j - 1, grid);
          setGrid([...grid]);
          select(j).classList.remove('selected-j');
          j--;
        }
        select(j).classList.add('selected-j');
        await wait(speed);
        select(j).classList.remove('selected-j');
        select(i).classList.remove('pointer-i');
      }
      for (let i = 0; i < grid.length; i++) {
        await wait(100);
        select(i).classList.add('sorted');
      }
    };
  
    return (
      <div>
        <h1>Insertion Sort</h1>
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
                id={`insertionsort:${idx}`}
                key={`insertionsort:${idx}`}
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

  export default InsertionSort