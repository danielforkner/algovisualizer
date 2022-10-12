import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { wait } from '../../app/helpers';

export default function ThreeSum() {
  const [searching, setSearching] = useState(false);
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(15);
  const [target, setTarget] = useState(89);
  const [triples, setTriples] = useState([]);
  const [currentSum, setCurrentSum] = useState(0);
  const [iIdx, setIIdx] = useState(-1);
  const [jIdx, setJIdx] = useState(-1);
  const [kIdx, setKIdx] = useState(-1);
  const [method, setMethod] = useState('Brute Force');
  const [speed, setSpeed] = useState(100);

  useEffect(() => handleRefresh(), []);

  const search = () => {
    setTriples([]);
    setSearching(true);
    switch (method) {
      case 'Brute Force':
        bruteForceSearch();
        break;
      case 'Sort First':
        sortedSearch();
        break;
      default:
        sortedSearch();
    }
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
          setCurrentSum(array[i] + array[j] + array[k]);
          setKIdx(k);
          setArray([...array]);
          await wait(speed / 4);
          if (array[i] + array[j] + array[k] === target) {
            triplesArr.push([array[i], array[j], array[k]]);
            setTriples([...triplesArr]);
          }
        }
      }
    }
    setSearching(false);
    // return triples;
  };

  const sortedSearch = async () => {
    let triplesArr = [];
    let originalArray = [...array];
    let sorted = array.sort((a, b) => a - b);
    let arr = [];
    for (let i = 0; i < sorted.length; i++) {
      arr.push(sorted[i]);
      setArray([...arr]);
      await wait(30);
    }
    for (let i = 0; i < sorted.length - 2; i++) {
      let left = i + 1;
      let right = sorted.length - 1;
      setIIdx(i);
      setJIdx(left);
      setKIdx(right);
      setArray([...array]);
      await wait(speed);
      while (left < right) {
        let sum = sorted[i] + sorted[left] + sorted[right];
        setCurrentSum(sum);
        if (sum === target) {
          triplesArr.push([sorted[i], sorted[left], sorted[right]]);
          setTriples([...triplesArr]);
          setJIdx(left);
          setKIdx(right);
          setArray([...array]);
          await wait(speed / 2);
          left++;
          right--;
        } else if (sum < target) {
          left++;
          setJIdx(left);
          setArray([...array]);
          await wait(speed / 2);
        } else if (sum > target) {
          right--;
          setKIdx(right);
          setArray([...array]);
          await wait(speed / 2);
        }
      }
    }
    setKIdx(array.length - 1);
    setArray(originalArray);
    setSearching(false);
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
    setCurrentSum(0);
    setTriples([]);
  };

  return (
    <div>
      <p>
        <b>Objective: </b>Given an array of integers and a target sum, the
        algorithm should identify all the triplets in the array that sum to the
        target and return them.
      </p>
      <hr />
      <p>
        <b>Target Sum: </b>
        {target}
      </p>
      <p>
        <b>Search Method: </b>
        {method}
      </p>
      <select
        disabled={searching ? true : false}
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        <option name="sort" value={'Sort First'}>
          Sort First
        </option>
        <option name="Brute Force" value={'Brute Force'}>
          Brute Force
        </option>
      </select>
      <Button
        variant="outlined"
        disabled={searching ? true : false}
        onClick={search}
      >
        Search
      </Button>
      <Button
        variant="outlined"
        disabled={searching ? true : false}
        onClick={handleRefresh}
      >
        Refresh
      </Button>
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
        <b>Current sum: </b>
        {currentSum}
      </p>
      <div>
        <b>Triples Found: </b>[
        {triples.map((element, i) => {
          return (
            <p key={`ThreeSumTriples: ${i}`}>
              {`[${element[0]}, ${element[1]}, ${element[2]}]`},
            </p>
          );
        })}
        ]
      </div>
      <hr />
      <h4>Time and Space Complexity</h4>
      <p>
        The brute force method has O(n^3) time complexity. Sorting the array
        first reduces the time complexity to O(n^2). Both methods can be done in
        O(1) space, but sorting the array requires O(n) space if the array is
        immutable.
      </p>
    </div>
  );
}
