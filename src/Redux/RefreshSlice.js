import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refresh: false,
};
const RefreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    setRefresh(state) {
      state.refresh = !state.refresh;
    },
  },
});
export default RefreshSlice.reducer;
export const { setRefresh } = RefreshSlice.actions;
