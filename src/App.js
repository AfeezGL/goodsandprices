import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import { auth } from "./firebase";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Home from "./pages/Home";
import { setAuth } from "./redux/auth/AuthSlice";
import { getGoods } from "./redux/goods/GoodsSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGoods());
    onAuthStateChanged(auth, (user) => {
      dispatch(setAuth(user));
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:productId" element={<EditProduct />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
