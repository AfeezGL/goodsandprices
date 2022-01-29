import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

const initialState = {
  allGoods: [],
  status: "idle",
};

const getGoods = async () => {
  const ref = collection(db, "goods");
  const snapshot = await getDocs(ref);
  const data = snapshot.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));

  return data;
};

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
