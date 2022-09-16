import { useState } from 'react';
import { wait } from '../../app/helpers';
import './styles/arrays.css';

export default function TwoSum() {
  const [searching, setSearching] = useState(false);
  const [array, setArray] = useState([7, 15, 2, 9, 6, 80, 4, 10, 3]);
  const [left, setLeft] = useState(-1);
  const [right, setRight] = useState(-1);
  const [answer, setAnswer] = useState('[]');
  const [currentSum, setCurrentSum] = useState('0');
  const search = async () => {
    setLeft(0);
    setRight(array.length - 1);
    setArray([...array]);
    await wait(500);
    while (left < right) {}
  };
  return (
    <div>
      <h2>Two Sum</h2>
      <p>Target Sum: 89</p>
      <button onClick={search}>Search!</button>
      <div className="grid-container">
        <div className="cell">[</div>
        {array.map((cell, i) => {
          if (i === left) {
            return <div className="cell left">{cell}</div>;
          }
          if (i === right) {
            return <div className="cell right">{cell}</div>;
          }
          return <div className="cell">{cell}</div>;
        })}
        <div className="cell">]</div>
      </div>
      <p>{`Current Sum: ${currentSum}`}</p>
      <p>{`Answer: ${answer}`}</p>
    </div>
  );
}
