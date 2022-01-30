import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="card py-3 px-3">
      <div className="row">
        <div className="col-6 col-sm-7 col-md-8 col-lg-9 text-capitalize">
          {product.data.name}
        </div>
        <div className="col-4 col-sm-3 col-md-2 col-lg-2 ">
          {product.data.price.toLocaleString("en-US", {
            style: "currency",
            currency: "NGN",
          })}
        </div>
        <div className="col-2 col-sm-2 col-md-2 col-lg-1">
          <Link to={`/edit/${product.id}`}>
            <span className="badge bg-primary">edit</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
