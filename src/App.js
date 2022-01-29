import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import { getGoods } from "./redux/goods/GoodsSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGoods());
  }, []);

  return (
    <>
      <Header />
    </>
  );
}

export default App;
