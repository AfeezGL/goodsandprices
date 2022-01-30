import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { getGoods } from "../redux/goods/GoodsSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [busy, setBusy] = useState(false);

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
    <div className="container">
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
  );
};

export default AddProduct;
