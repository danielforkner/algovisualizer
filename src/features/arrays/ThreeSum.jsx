import { useState } from 'react';
import Button from '@mui/material/Button';

export default function ThreeSum() {
  const [method, setMethod] = useState('Brute Force');
  const [searching, setSearching] = useState(false);
  const [array, setArray] = useState([7, 15, 2, 9, 6, 80, 4, 10, 3]);
  const [arraySize, setArraySize] = useState(15);
  const [target, setTarget] = useState(89);

  const search = () => {};

  const handleRefresh = () => {
    // build array
    let arr = [];
    for (let i = 0; i < arraySize; i++) {
      let num = Math.floor(Math.random() * 100);
      arr.push(num);
    }
    setArray(arr);
  };

  return (
    <div>
      <h3>Three Sum</h3>
      <hr />
      <p>Target Sum: {target}</p>
      <p>Search Method: {method}</p>
      <Button onClick={search}>Search</Button>
      {!searching ? <Button onClick={handleRefresh}>Refresh</Button> : null}
      <div className="grid-container">
        {array.map((cell, i) => {
          return (
            <div className="cell" key={`twoSumCell: ${i}`}>
              {cell}
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}
