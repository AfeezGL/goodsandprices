import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import { addProduct, clearAlert, getGoods } from "../redux/goods/GoodsSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const status = useSelector((state) => state.goods.status);
  const user = useSelector((state) => state.auth.user);
  const alert = useSelector((state) => state.goods.alert);

  const submitForm = (e) => {
    e.preventDefault();

    dispatch(addProduct({ name, price }));

    dispatch(getGoods());

    setName("");
    setPrice("");
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
            <button type="submit" className="btn btn-primary">
              {status === "busy" ? <Spinner /> : "Submit"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddProduct;
