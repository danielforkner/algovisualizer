export const swap = (j, i, arr) => {
  let temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
};

export const wait = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
