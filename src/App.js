import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Home from "./pages/Home";
import { getGoods } from "./redux/goods/GoodsSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGoods());
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:productId" element={<EditProduct />} />
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
