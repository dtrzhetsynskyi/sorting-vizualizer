import { shuffle } from "../functions/shuffle";
import { swap } from "../functions/swap";

import store from '../state/store';
import { addAnimation } from '../state/animationSlice';
import {updateStatistics} from '../state/statisticsSlice';

async function partition(arr, lo, hi) {
  let i = lo;
  let j = hi+1;
  while(true) {
    while(arr[++i] < arr[lo]) {
      await store.dispatch(addAnimation({ type: 'select', data: [lo, i] }));
      const statistics = store.getState().statistics;
      await store.dispatch(updateStatistics({ comparisons: statistics.comparisons+1, acesses: statistics.acesses + 2 }));
      if(i === hi) {
        break;
      }
    }
    while(arr[lo] < arr[--j]) {
      await store.dispatch(addAnimation({ type: 'select', data: [lo, j] }));
      const statistics = store.getState().statistics;
      await store.dispatch(updateStatistics({ comparisons: statistics.comparisons+1, acesses: statistics.acesses + 2 }));
      if(j === lo) {
        break;
      }
    }
    
    if(i >= j) {
      break;
    }
    swap(arr, i, j);
    await store.dispatch(addAnimation({ type: 'swap', data: [i, j], arr: [...arr] }));
    const statistics = store.getState().statistics;
    await store.dispatch(updateStatistics({ comparisons: statistics.comparisons, acesses: statistics.acesses + 3 }));
  }
  swap(arr, lo, j);
  await store.dispatch(addAnimation({ type: 'swap', data: [lo, j], arr: [...arr] }));
  const statistics = store.getState().statistics;
  await store.dispatch(updateStatistics({ comparisons: statistics.comparisons, acesses: statistics.acesses + 3 }));
  return j;
}

async function sort(arr, lo, hi) {
  if(hi <= lo) {
    return;
  }
  let j = await partition(arr, lo, hi);
  await sort(arr, lo, j-1);
  await sort(arr, j+1, hi);
};

export async function getQuickSortAnimations() {
  const arrCopy = shuffle([...store.getState().numbers]);
  await sort(arrCopy, 0, arrCopy.length - 1);
}