import { configureStore } from "@reduxjs/toolkit";
import goodsReducer from "./goods/GoodsSlice";
export const store = configureStore({
  reducer: {
    goods: goodsReducer,
  },
});
