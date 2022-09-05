import {useEffect, useState} from 'react'
import { wait} from './helpers'
import './bubbleSort.css'

const BubbleSort = ({mainGrid, speed, sorting}) => {
    const [grid, setGrid] = useState(mainGrid);
    const select = (idx) => document.getElementById(`bubblesort:${idx}`);
  
    useEffect(() => {
      setGrid([...mainGrid])
    }, [mainGrid])

    useEffect(() => {
      if (sorting) sort();
    }, [sorting])

    const swap = (i, array) => {
        let temp = array[i];
        array[i] = array[i+1];
        array[i+1] = temp;
    }

    async function sort() {
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
        {/* <button onClick={sort}>Sort!</button> */}
        {/* <button onClick={refresh}>Refresh</button> */}
      </div>
    );
  };

  export default BubbleSort