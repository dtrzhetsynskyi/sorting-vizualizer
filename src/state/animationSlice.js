import { createAsyncThunk } from "@reduxjs/toolkit";
import { sleep } from '../functions/sleep';
import { setNumbersArray } from "./numbersSlice";
import store from "./store";

export const addAnimation = createAsyncThunk(
  'animation', 
  async (payload) => {
    const { type, data, arr } = payload;
    let i, j;
    if(data) {
      [i, j] = data;
    }
    if(type === 'swap') {
      document.querySelector(`#bar-${i}`).style.backgroundColor = '#ff0000';
      document.querySelector(`#bar-${j}`).style.backgroundColor = '#ff0000';
    } else if(type === 'select') {
      document.querySelector(`#bar-${i}`).style.backgroundColor = '#0027ff';
      if(j) {
        document.querySelector(`#bar-${j}`).style.backgroundColor = '#0027ff';
      }
    }

    await sleep(10);
    if((type === 'swap' || type === 'update') && arr) {
      store.dispatch(setNumbersArray(arr));
    }
    if(data) {
      document.querySelector(`#bar-${i}`).style.backgroundColor = '#868585';
      if(j) {
        document.querySelector(`#bar-${j}`).style.backgroundColor = '#868585';
      }
    }
  }
);