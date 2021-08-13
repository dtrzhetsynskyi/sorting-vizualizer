import { swap } from '../functions/swap';
import store from '../state/store';
import { addAnimation } from '../state/animationSlice';
import {updateStatistics} from '../state/statisticsSlice';

export async function getShellSortAnimations(arr = []) {
  const arrCopy = [...store.getState().numbers];
  const arrLength = arrCopy.length;

  let h = 1;
  while (h < arrLength / 3) {
    h = 3 * h + 1; // shell's sequence
  }

  while (h >= 1) {
    for (let i = h; i < arrLength; i++) {
      for (let j = i; j >= h; j -= h) {
        await store.dispatch(addAnimation({ type: 'select', data: [j, j - h] }));
        if (arrCopy[j] < arrCopy[j - h]) {
          swap(arrCopy, j, j - h);
          await store.dispatch(addAnimation({
            type: 'swap',
            data: [j, j - h],
            arr: [...arrCopy],
          }));
          const statistics = store.getState().statistics;
          await store.dispatch(updateStatistics({ comparisons: statistics.comparisons+1, acesses: statistics.acesses + 5 }));
        } else {
          const statistics = store.getState().statistics;
          await store.dispatch(updateStatistics({ comparisons: statistics.comparisons+1, acesses: statistics.acesses + 2 }));
          break; // !!!!
        }
      }
    }
    h = Math.floor(h / 3);
  }
}
