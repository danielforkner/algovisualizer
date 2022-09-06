function merge(left, right) {
  console.log('left and right: ', left, right);
  let arr = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }
  console.log('Final: ', [...arr, ...left, ...right]);
  return [...arr, ...left, ...right];
}

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2);

  const left = array.slice(0, mid);
  const right = array.slice(mid);
  console.log('left: ', left);
  console.log('right: ', array);
  const sorted = merge(mergeSort(left), mergeSort(array));
  console.log('SORTED: ', sorted);
}

mergeSort([2, 7, 4, 1, 456, 21, 34, 62]);
