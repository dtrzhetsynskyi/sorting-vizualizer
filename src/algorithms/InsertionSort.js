import {swap} from '../functions/swap';
import { addAnimation } from '../state/animationSlice';
import store from '../state/store';
import {updateStatistics} from '../state/statisticsSlice';

export async function getInsertionSortAnimations() {
  const arrCopy = [...store.getState().numbers];
  let arrLength = arrCopy.length;
	
	for(let i = 0; i < arrLength; i++) {
    for(let j = i; j > 0; j--) {
      await store.dispatch(addAnimation({ type: 'select', data: [j, j-1] }));
      if(arrCopy[j] < arrCopy[j-1]) {
        swap(arrCopy, j, j-1);
        await store.dispatch(addAnimation({ type: 'swap', data: [j, j-1], arr: [...arrCopy] }));

        const statistics = store.getState().statistics;
        await store.dispatch(updateStatistics({ comparisons: statistics.comparisons+1, acesses: statistics.acesses + 5 }));
      } else {
        const statistics = store.getState().statistics;
        await store.dispatch(updateStatistics({ comparisons: statistics.comparisons+1, acesses: statistics.acesses + 2 }));
        break;
      }
    }
  }
};