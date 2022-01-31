import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const initialState = {
  user: null,
  status: "idle",
  alert: "",
};

const login = createAsyncThunk("auth/Login", async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user.uid || null;

  return user;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
    },
    clearAlert: (state) => {
      state.alert = "";
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
        state.alert = { type: "success", message: "Logged in successfully" };
      })
      .addCase(login.rejected, (state, action) => {
        state.alert = { type: "danger", message: action.error.message };
        state.status = "idle";
      });
  },
});

export const { setAuth, clearAlert } = authSlice.actions;
export { login };

export default authSlice.reducer;
