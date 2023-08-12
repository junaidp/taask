import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  activeIndex: 0,
};

const jobsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeActiveIndex: (state, action) => {
      state.activeIndex = action.payload;
    },
  },
});

export const { changeActiveIndex } = jobsSlice.actions;

export default jobsSlice.reducer;
