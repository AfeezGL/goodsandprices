import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const initialState = {
  user: null,
  status: "idle",
  error: "",
};

const login = createAsyncThunk("auth/Login", async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user.uid;

  console.log(user);

  return user;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "busy";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "idle";
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "idle";
      });
  },
});

export const { setAuth } = authSlice.actions;
export { login };

export default authSlice.reducer;
