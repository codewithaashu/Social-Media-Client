import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};
const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
    },
  },
});
export const { toggleTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
