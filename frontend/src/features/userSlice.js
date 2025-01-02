import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: null, email: "", username: "" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
    },

    clearUser(state) {
      state.id = null;
      state.email = "";
      state.username = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
