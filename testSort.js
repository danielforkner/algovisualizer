const quickSort = (array, start, end) => {
  if (start < end) {
    const pivot = sortPivot(array, start, end);
    quickSort(array, start, pivot - 1);
    quickSort(array, pivot + 1, end);
  }
  return array;
};

const sortPivot = (array, start, end) => {
  let pivot = array[end];
  let min = start - 1;
  let i;
  for (i = start; i <= end - 1; i++) {
    if (array[i] < pivot) {
      min++;
      //swap
      let temp = array[i];
      array[i] = array[min];
      array[min] = temp;
    }
  }
  //swap
  let temp = array[end];
  array[end] = array[min + 1];
  array[min + 1] = temp;

  return min + 1;
};

let array = [10, 80, 30, 90, 40, 50, 70];
// for (let i = 0; i < 10; i++) {
//   array.push(Math.floor(Math.random() * 100));
// }
console.log(quickSort(array, 0, array.length - 1));
