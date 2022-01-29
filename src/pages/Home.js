import React from "react";
import { useSelector } from "react-redux";
import PageSpinner from "../components/PageSpinner";
import Product from "../components/Product";

const Home = () => {
  const goods = useSelector((state) => state.goods.allGoods);
  const status = useSelector((state) => state.goods.status);

  if (status === "loading") return <PageSpinner />;

  return (
    <div className="container">
      {goods.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Home;
