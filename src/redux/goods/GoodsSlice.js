import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
  allGoods: [],
  status: "idle",
  error: "",
};

const getGoods = createAsyncThunk("goods/fetchGoods", async () => {
  const ref = collection(db, "goods");
  const snapshot = await getDocs(ref);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));

  return data;
});

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    addNew: (state, action) => {
      state.allGoods.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoods.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getGoods.fulfilled, (state, action) => {
        state.allGoods = action.payload;
        state.status = "idle";
      });
  },
});

export const { addNew } = goodsSlice.actions;

export { getGoods };

export default goodsSlice.reducer;
