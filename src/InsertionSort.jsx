import { useEffect, useState} from 'react'
import { wait, swap} from './helpers'
import './insertionSort.css'

const InsertionSort = ({mainGrid, speed, sorting}) => {
    const [grid, setGrid] = useState([]);
    const select = (idx) => document.getElementById(`insertionsort:${idx}`);

    useEffect(() => {
      setGrid([...mainGrid])
    }, [mainGrid])

    useEffect(() => {
      if (sorting) sort();
    }, [sorting])
  
    async function sort() {
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
        await wait(40);
        select(i).classList.add('complete');
        select(i).classList.add('sorted');
      }
    };
  
    return (
      <div>
        <h1>Insertion Sort</h1>
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
        {/* <button onClick={sort}>Sort!</button> */}
        {/* <button onClick={refresh}>Refresh</button> */}
      </div>
    );
  };

  export default InsertionSort