import { createSlice } from "@reduxjs/toolkit";
const statistics = createSlice({
  name: 'statistics',
  initialState: { comparisons: 0, acesses: 0 },
  reducers: {
    updateStatistics(state, action) {
      return action.payload;
    }
  }
});
export const { updateStatistics } = statistics.actions;
export default statistics.reducer;