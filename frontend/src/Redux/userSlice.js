import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setusername: (state, action) => {
      state.username = action.payload;
    },
    setisLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setusername, setisLoggedIn } = userSlice.actions;
export default userSlice.reducer;