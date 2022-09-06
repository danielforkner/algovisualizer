async function mergeSort(array, start, end) {
  if (start < end) {
    let mid = Math.floor((start + end) / 2);

    await mergeSort(array, start, mid);
    await mergeSort(array, mid + 1, end);

    await merge(array, start, mid, end);
  }
  return array;
}

async function merge(array, start, mid, end) {
  const localStack = [];

  let leftLen = mid - start + 1;
  let rightLen = end - mid;

  let leftArr = [];
  let rightArr = [];

  for (let i = 0; i < leftLen; i++) {
    leftArr[i] = array[start + i];
  }
  for (let i = 0; i < rightLen; i++) {
    rightArr[i] = array[mid + 1 + i];
  }

  let leftIdx = 0;
  let rightIdx = 0;
  let pointer = start;

  while (leftIdx < leftLen && rightIdx < rightLen) {
    if (leftArr[leftIdx] <= rightArr[rightIdx]) {
      array[pointer] = leftArr[leftIdx++];
    } else {
      array[pointer] = rightArr[rightIdx++];
    }
    pointer++;
  }

  while (leftIdx < leftLen) array[pointer++] = leftArr[leftIdx++];
  while (rightIdx < rightLen) array[pointer++] = rightArr[rightIdx++];
}
