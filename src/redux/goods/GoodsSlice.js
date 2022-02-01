import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
  allGoods: [],
  status: "idle",
  alert: "",
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

const addProduct = createAsyncThunk(
  "goods/addProduct",
  async ({ name, price }) => {
    const collectionRef = collection(db, "goods");

    await addDoc(collectionRef, {
      name: name.toLocaleLowerCase(),
      price: Number(price),
    });

    return;
  }
);

const editProduct = createAsyncThunk(
  "goods/editProduct",
  async ({ name, price, productId }) => {
    const docRef = doc(collection(db, "goods"), productId);

    await setDoc(docRef, {
      name: name.toLocaleLowerCase(),
      price: Number(price),
    });

    return;
  }
);

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    clearAlert: (state) => {
      state.alert = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoods.pending, (state) => {
        state.status = "busy";
      })
      .addCase(getGoods.fulfilled, (state, action) => {
        state.allGoods = action.payload;
        state.status = "idle";
      })
      .addCase(addProduct.pending, (state) => {
        state.status = "busy";
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.status = "idle";
        state.alert = { type: "success", message: "Product added" };
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.alert = { type: "danger", message: action.error.message };
      })
      .addCase(editProduct.pending, (state) => {
        state.status = "busy";
      })
      .addCase(editProduct.fulfilled, (state) => {
        state.status = "idle";
        state.alert = {
          type: "success",
          message: "Product edited successfully",
        };
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.alert = { type: "danger", message: action.error.message };
      });
  },
});

export const { clearAlert } = goodsSlice.actions;

export { getGoods, addProduct, editProduct };

export default goodsSlice.reducer;
