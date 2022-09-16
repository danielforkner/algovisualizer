import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { wait } from '../../app/helpers';
import './styles/arrays.css';

export default function TwoSum() {
  const [searching, setSearching] = useState(false);
  const [array, setArray] = useState([7, 15, 2, 9, 6, 80, 4, 10, 3]);
  const [target, setTarget] = useState(89);
  const [left, setLeft] = useState(-1);
  const [right, setRight] = useState(-1);
  const [answer, setAnswer] = useState('[]');
  const [map, setMap] = useState(new Map());
  const [currentSum, setCurrentSum] = useState(0);
  const [possibleMatch, setPossibleMatch] = useState(0);
  const [method, setMethod] = useState('Sort First');
  const [speed, setSpeed] = useState(1000);

  const handleRefresh = () => {
    setAnswer('[]');
    setCurrentSum(0);
    setLeft(-1);
    setRight(-1);
    setMap(new Map());
    setCurrentSum(0);
    setPossibleMatch(0);
  };

  const search = () => {
    setAnswer('[]');
    setCurrentSum(0);
    setLeft(0);
    setRight(array.length - 1);
    switch (method) {
      case 'Sort First':
        sortSearch();
        break;
      case 'No Sorting':
        noSearchSort();
        break;
      default:
        sortSearch();
    }
  };

  const sortSearch = async () => {
    const originalArray = [...array];
    let localLeft = 0;
    let localRight = array.length - 1;
    setArray([...array.sort((a, b) => a - b)]);
    await wait(speed);
    while (localLeft < localRight) {
      let sum = array[localLeft] + array[localRight];
      setCurrentSum(sum);
      if (sum === target) {
        setLeft(localLeft);
        setRight(localRight);
        setArray([...array]);
        await wait(speed);
        setArray([...originalArray]);
        localLeft = originalArray.indexOf(array[localLeft]);
        localRight = originalArray.indexOf(array[localRight]);
        setLeft(localLeft);
        setRight(localRight);
        setAnswer([localLeft, localRight]);
        await wait(speed);
        return;
      }
      if (sum > target) {
        setRight(localRight);
        localRight--;
        setArray([...array]);
        await wait(speed);
      } else if (sum < target) {
        setLeft(localLeft);
        localLeft++;
        setArray([...array]);
        await wait(speed);
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
      <h2>Two Sum</h2>
      <p>{`Target Sum: ${target}`}</p>
      <p>{`Search Method: ${method}`}</p>
      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option name="sort" value={'Sort First'}>
          Sort First
        </option>
        <option name="don't sort" value={'No Sorting'}>
          No Sorting
        </option>
      </select>
      <button onClick={search}>Search</button>
      <button onClick={handleRefresh}>Refresh</button>
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
