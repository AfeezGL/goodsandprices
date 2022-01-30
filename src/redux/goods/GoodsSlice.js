import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
  allGoods: [],
  status: "idle",
  error: "",
};

const getGoods = createAsyncThunk("goods/fetchGoods", async () => {
  const ref = collection(db, "goods");
  const queryRef = query(ref, orderBy("name", "asc"));
  const snapshot = await getDocs(queryRef);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));

  return data;
});

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {},
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

export { getGoods };

export default goodsSlice.reducer;
