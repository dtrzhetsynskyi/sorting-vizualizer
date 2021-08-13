import store from '../state/store';
import { addAnimation } from '../state/animationSlice';
import {updateStatistics} from '../state/statisticsSlice';

async function merge(arr, aux, lo, mid, hi) {
  for(let k = lo; k <= hi; k++) {
    aux[k] = arr[k];
  }
  const statistics = store.getState().statistics;
  await store.dispatch(updateStatistics({ comparisons: statistics.comparisons, acesses: statistics.acesses + hi-lo }));

  let i = lo;
  let j = mid + 1;
  for(let k = lo; k <= hi; k++) {
    if(i > mid) {
      arr[k] = aux[j++];
      if(j <= hi) {
        await store.dispatch(addAnimation({ type: 'select', data: [j] }));
        const statistics = store.getState().statistics;
        await store.dispatch(updateStatistics({ comparisons: statistics.comparisons, acesses: statistics.acesses + 1 }));
      }
    } else if(j > hi) {
      arr[k] = aux[i++];
      await store.dispatch(addAnimation({ type: 'select', data: [i] }));
      const statistics = store.getState().statistics;
      await store.dispatch(updateStatistics({ comparisons: statistics.comparisons, acesses: statistics.acesses + 1 }));
    } else if(aux[j] < aux[i]) {
      arr[k] = aux[j++];
      if(j <= hi) {
        await store.dispatch(addAnimation({ type: 'select', data: [i, j] }));
      }
      const statistics = store.getState().statistics;
      await store.dispatch(updateStatistics({ comparisons: statistics.comparisons+1, acesses: statistics.acesses + 1 }));
    } else {
      arr[k] = aux[i++];
      await store.dispatch(addAnimation({ type: 'select', data: [i, j] }));
      const statistics = store.getState().statistics;
      await store.dispatch(updateStatistics({ comparisons: statistics.comparisons+1, acesses: statistics.acesses + 1 }));
    }
  }
  await store.dispatch(addAnimation({ type: 'update', arr: [...arr] }));
}

async function sort(arr, aux, lo, hi) {
  if(hi <= lo) {
    return;
  }
  let mid = Math.floor(lo + (hi - lo) / 2);
  await sort(arr, aux, lo, mid);
  await sort(arr, aux, mid+1, hi);
  if(arr[mid+1] > arr[mid]) {
    return;
  }
  await merge(arr, aux, lo, mid, hi);
};

export async function getMergeSortAnimations() {
  const arrCopy = [...store.getState().numbers];
	const arrLength = arrCopy.length;

  const aux = new Array(arrLength);
  await sort(arrCopy, aux, 0, arrLength - 1);
}