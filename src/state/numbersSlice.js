import { createSlice } from "@reduxjs/toolkit";
import {generateNumbersArray} from '../functions/generateNumbersArray';
const numbers = createSlice({
  name: 'numbers',
  initialState: generateNumbersArray(),
  reducers: {
    setNumbersArray(state, action) {
      return [...action.payload];
    },
    generateRandomNumbersArray(state, action) {
      return generateNumbersArray();
    }
  }
});
export const {setNumbersArray, generateRandomNumbersArray} = numbers.actions;
export default numbers.reducer;