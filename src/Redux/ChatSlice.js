import { createSlice } from "@reduxjs/toolkit";

const initialState = { chat: null, onlineUser: null };
const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload;
    },
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },
  },
});
export default ChatSlice.reducer;
export const { setChat, setOnlineUser } = ChatSlice.actions;
