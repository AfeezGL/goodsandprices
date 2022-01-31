import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { getGoods } from "../redux/goods/GoodsSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [busy, setBusy] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const submitForm = async (e) => {
    e.preventDefault();

    setBusy(true);

    const collectionRef = collection(db, "goods");

    await addDoc(collectionRef, {
      name: name.toLocaleLowerCase(),
      price: Number(price),
    });

    dispatch(getGoods());

    setBusy(false);
  };

  return (
    <>
      {!user === null ? (
        <div className="alert alert-danger fade show" role="alert">
          Please login{" "}
          <Link className="alert-link" to={"/login"}>
            here
          </Link>
        </div>
      ) : (
        <div className="container">
          <h1>Add Product</h1>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                Product
              </label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control col-4"
                id="productPrice"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {busy ? <Spinner /> : "Submit"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddProduct;
