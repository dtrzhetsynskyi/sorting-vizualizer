import { combineReducers } from '@reduxjs/toolkit';
import numbersReducer from './numbersSlice';
import statisticsReducer from './statisticsSlice';
export default combineReducers({
  numbers: numbersReducer,
  statistics: statisticsReducer
});