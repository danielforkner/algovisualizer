import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { wait } from '../../app/helpers';
import './styles/arrays.css';

export default function TwoSum() {
  const [searching, setSearching] = useState(false);
  const [array, setArray] = useState([7, 15, 2, 9, 6, 80, 4, 10, 3]);
  const [arraySize, setArraySize] = useState(15);
  const [target, setTarget] = useState(89);
  const [left, setLeft] = useState(-1);
  const [right, setRight] = useState(-1);
  const [answer, setAnswer] = useState('[]');
  const [map, setMap] = useState(new Map());
  const [currentSum, setCurrentSum] = useState(0);
  const [possibleMatch, setPossibleMatch] = useState(0);
  const [method, setMethod] = useState('Sort First');
  const [speed, setSpeed] = useState(900);

  React.useEffect(() => handleRefresh(), []);

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
    while (j === i) {
      j = Math.floor(Math.random() * arraySize);
    }
    setTarget(arr[i] + arr[j]);
    setArray(arr);
    setAnswer('[]');
    setCurrentSum(0);
    setLeft(-1);
    setRight(-1);
    setMap(new Map());
    setCurrentSum(0);
    setPossibleMatch(0);
  };

  const search = async () => {
    setSearching(true);
    setAnswer('[]');
    setCurrentSum(0);
    setLeft(0);
    setRight(array.length - 1);
    switch (method) {
      case 'Sort First':
        await sortSearch();
        break;
      case 'No Sorting':
        await noSearchSort();
        break;
      default:
        await sortSearch();
    }
  };

  const sortSearch = async () => {
    const originalArray = [...array];
    let localLeft = 0;
    let localRight = array.length - 1;
    let sorted = [...array.sort((a, b) => a - b)];
    let arr = [];
    for (let i = 0; i < sorted.length; i++) {
      arr.push(sorted[i]);
      setArray([...arr]);
      await wait(30);
    }
    while (localLeft < localRight) {
      let sum = array[localLeft] + array[localRight];
      setCurrentSum(sum);
      await wait(speed);
      if (sum === target) {
        setArray([...originalArray]);
        localLeft = originalArray.indexOf(array[localLeft]);
        localRight = originalArray.indexOf(array[localRight]);
        setLeft(localLeft);
        setRight(localRight);
        setAnswer([localLeft, localRight]);
        setSearching(false);
        await wait(speed);
        return;
      }
      if (sum > target) {
        localRight--;
        setRight(localRight);
        setArray([...array]);
      } else if (sum < target) {
        localLeft++;
        setLeft(localLeft);
        setArray([...array]);
      }
    }
  };

  const noSearchSort = async () => {
    setRight(-1);
    const map = new Map();
    setMap(map);
    for (let i = 0; i < array.length; i++) {
      setLeft(i);
      setArray([...array]);
      let possibleMatch = target - array[i];
      setPossibleMatch(`${target} - ${array[i]} = ${target - array[i]}`);
      if (map.has(possibleMatch)) {
        setAnswer([i, map.get(possibleMatch)]);
        setRight(map.get(possibleMatch));
        setSearching(false);
        await wait(speed);
        return;
      } else {
        map.set(array[i], i);
        setMap(map);
        await wait(speed);
      }
    }
  };
  return (
    <div>
      <h3>Two Sum</h3>
      <hr />
      <p>{`Target Sum: ${target}`}</p>
      <p>{`Search Method: ${method}`}</p>
      {!searching ? (
        <>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option name="sort" value={'Sort First'}>
              Sort First
            </option>
            <option name="don't sort" value={'No Sorting'}>
              No Sorting
            </option>
          </select>
          <Button onClick={search}>Search</Button>
          <Button onClick={handleRefresh}>Refresh</Button>{' '}
        </>
      ) : null}
      <div className="grid-container">
        {/* <div className="cell">[</div> */}
        {array.map((cell, i) => {
          return (
            <div
              className={
                i === left ? 'left cell' : i === right ? 'right cell' : 'cell'
              }
              key={`twoSumCell: ${i}`}
            >
              {cell}
            </div>
          );
        })}
        {/* <div className="cell">]</div> */}
      </div>
      {method === 'Sort First' ? (
        <p>{`Current Sum: ${currentSum}`}</p>
      ) : method === 'No Sorting' ? (
        <>
          <p>{`Possible Match: ${possibleMatch}`}</p>
          <p>{`Hash Table: {`}</p>
          {[...map.keys()].map((key, i) => {
            return (
              <p key={`TwoSumHashTable: ${i}`}>{`${key}: ${map.get(key)}`}</p>
            );
          })}
          <p>{`}`}</p>
        </>
      ) : null}
      <p>{`Index of nums that sum to target: [${answer[0]}, ${answer[1]}]`}</p>
      <hr />
      <h4>What are the pros and cons of sorting the array first?</h4>
      <p>
        Sorting the array first has a O(nlog(n)) time complexity, but only O(1)
        space complexity because the array can be sorted in place. Choosing not
        to sort the array results in a more efficient O(n) algorithm, however
        there is an additional O(n) space complexity due to the need for a
        hashtable.
      </p>
    </div>
  );
}
