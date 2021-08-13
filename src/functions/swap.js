export function swap(arr, i, j) {
  const copy = arr[i];
  arr[i] = arr[j];
  arr[j] = copy;
};