import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import PageSpinner from "../components/PageSpinner";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { clearAlert, editProduct, getGoods } from "../redux/goods/GoodsSlice";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [name, setName] = useState(null);
  const [price, setPrice] = useState("");
  const user = useSelector((state) => state.auth.user);
  const alert = useSelector((state) => state.goods.alert);
  const status = useSelector((state) => state.goods.status);

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
  }, [productId]);

  const increment = () => {
    setPrice((prevState) => (prevState += 10));
  };

  const decrement = () => {
    if (price <= 10) return;
    setPrice((prevState) => (prevState -= 10));
  };

  const submitForm = (e) => {
    e.preventDefault();

    dispatch(editProduct({ name, price, productId }));

    dispatch(getGoods());
  };

  if (name === null) return <PageSpinner />;

  return (
    <>
      {user === null ? (
        <div className="alert alert-danger fade show" role="alert">
          Please login{" "}
          <Link className="alert-link" to={"/login"}>
            here
          </Link>
        </div>
      ) : (
        <div className="container">
          <h1>Edit Product</h1>
          {alert && (
            <Alert alert={alert} clearAlert={() => dispatch(clearAlert())} />
          )}
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
              {status === "busy" ? <Spinner /> : "Submit"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditProduct;
