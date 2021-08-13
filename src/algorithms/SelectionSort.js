import { swap } from '../functions/swap';
import store from '../state/store';
import { addAnimation } from '../state/animationSlice';
import {updateStatistics} from '../state/statisticsSlice';

export async function getSelectionSortAnimations() {
	const arrCopy = [...store.getState().numbers];
	const arrLength = arrCopy.length;
	
	for(let i = 0; i < arrLength; i++) {
		let min = i;
		for(let j = i + 1; j < arrLength; j++) {
			if(arrCopy[j] < arrCopy[min]) {
				min = j;
			}
		};
		
		await store.dispatch(addAnimation({ type: 'select', data: [i, min] }));
		if(min !== i) {
			swap(arrCopy, i, min);
			await store.dispatch(addAnimation({ type: 'swap', data: [i, min], arr: [...arrCopy] }));

			const num = store.getState().statistics.comparisons + arrLength-i+1;
			await store.dispatch(updateStatistics({ comparisons: num, acesses: 2*num+3 }));
		} else {
			const num = store.getState().statistics.comparisons + arrLength-i+1;
			await store.dispatch(updateStatistics({ comparisons: num, acesses: 2*num }));
		}
	}
}
