import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { wait } from '../../app/helpers';

export default function ThreeSum() {
  const [method, setMethod] = useState('Brute Force');
  const [searching, setSearching] = useState(false);
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(15);
  const [target, setTarget] = useState(89);
  const [triples, setTriples] = useState([]);
  const [iIdx, setIIdx] = useState(-1);
  const [jIdx, setJIdx] = useState(-1);
  const [kIdx, setKIdx] = useState(-1);
  const [speed, setSpeed] = useState(250);

  useEffect(() => handleRefresh(), []);

  const search = () => {
    setSearching(true);
    bruteForceSearch();
  };

  const bruteForceSearch = async () => {
    let triplesArr = [];
    for (let i = 0; i < array.length - 2; i++) {
      setIIdx(i);
      setArray([...array]);
      await wait(speed);
      for (let j = i + 1; j < array.length - 1; j++) {
        setJIdx(j);
        setArray([...array]);
        await wait(speed / 2);
        for (let k = j + 1; k < array.length; k++) {
          setKIdx(k);
          setArray([...array]);
          await wait(speed / 4);
          if (array[i] + array[j] + array[k] === target) {
            triplesArr.push([array[i], array[j], array[k]]);
            setTriples([...triplesArr]);
            console.log('FOUND ONE', triples);
          }
        }
      }
    }
    setSearching(false);
    return triples;
  };

  const handleRefresh = () => {
    // build array
    let arr = [];
    for (let i = 0; i < arraySize; i++) {
      let num = Math.floor(Math.random() * 100);
      arr.push(num);
    }
    // select random target
    let i = Math.floor(Math.random() * arraySize);
    let j = i;
    let k = i;
    while (j === i) {
      j = Math.floor(Math.random() * arraySize);
    }
    while (k === i || k === j) {
      k = Math.floor(Math.random() * arraySize);
    }
    // set states
    setArray(arr);
    setTarget(arr[i] + arr[j] + arr[k]);
    setIIdx(-1);
    setJIdx(-1);
    setKIdx(-1);
    setTriples([]);
  };

  return (
    <div>
      <h3>Three Sum</h3>
      <hr />
      <p>Target Sum: {target}</p>
      <p>Search Method: {method}</p>

      {!searching ? (
        <>
          <Button onClick={search}>Search</Button>
          <Button onClick={handleRefresh}>Refresh</Button>
        </>
      ) : null}
      <div className="grid-container">
        {array.map((cell, i) => {
          return (
            <div
              className={
                i === iIdx
                  ? 'iIdx cell'
                  : i === jIdx
                  ? 'jIdx cell'
                  : i === kIdx
                  ? 'kIdx cell'
                  : 'cell'
              }
              key={`twoSumCell: ${i}`}
            >
              {cell}
            </div>
          );
        })}
      </div>
      <p>
        Triples Found: [
        {triples.map((element) => {
          return <p>{`[${element[0]}, ${element[1]}, ${element[2]}]`},</p>;
        })}
        ]
      </p>
      <hr />
    </div>
  );
}
