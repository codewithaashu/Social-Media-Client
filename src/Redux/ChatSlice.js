import { createSlice } from "@reduxjs/toolkit";

const initialState = { chat: null, onlineUser: null, chats: null };
const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },
  },
});
export default ChatSlice.reducer;
export const { setChat, setOnlineUser, setChats } = ChatSlice.actions;
