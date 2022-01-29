import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PageSpinner from "../components/PageSpinner";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { getGoods } from "../redux/goods/GoodsSlice";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [name, setName] = useState(null);
  const [price, setPrice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchDoc = async () => {
      const productRef = doc(db, "goods", productId);
      const getProduct = await getDoc(productRef);
      if (mounted) {
        setName(getProduct.data().name);
        setPrice(getProduct.data().price);
      }
    };

    fetchDoc();

    return () => {
      mounted = false;
    };
  }, []);

  const increment = () => {
    setPrice((prevState) => (prevState += 10));
  };

  const decrement = () => {
    if (price <= 10) return;
    setPrice((prevState) => (prevState -= 10));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    setBusy(true);

    const docRef = doc(collection(db, "goods"), productId);

    await setDoc(docRef, {
      name,
      price,
    });

    dispatch(getGoods());

    setBusy(false);
  };

  if (name === null) return <PageSpinner />;

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
        <div className="row px-2 mb-3">
          <button
            type="button"
            className="btn btn-danger col-6"
            onClick={decrement}
          >
            -10
          </button>

          <button
            type="button"
            className="btn btn-success col-6"
            onClick={increment}
          >
            +10
          </button>
        </div>
        <button type="submit" className="btn btn-primary">
          {busy ? <Spinner /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
