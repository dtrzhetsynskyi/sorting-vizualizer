import { SETTINGS } from '../settings/settings';
import {getRandomNumFromInterval} from './getRandomNumFromInterval';
export function generateNumbersArray() {
  const newArray = [];
  for (let i = 0; i < SETTINGS.barsAmount; i++) {
    newArray.push(
      getRandomNumFromInterval(SETTINGS.minBarValue, SETTINGS.maxBarValue)
    );
  }
  return newArray;
}