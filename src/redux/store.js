import { configureStore } from "@reduxjs/toolkit";
import goodsReducer from "./goods/GoodsSlice";
import authReducer from "./auth/AuthSlice";

export const store = configureStore({
  reducer: {
    goods: goodsReducer,
    auth: authReducer,
  },
});
