import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
  isPostAdded: false,
};
const PostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPost(state, action) {
      state.post = action.payload;
    },
    postAdded(state, action) {
      state.isPostAdded = action.payload;
    },
  },
});
export const { setPost, postAdded } = PostSlice.actions;
export default PostSlice.reducer;
