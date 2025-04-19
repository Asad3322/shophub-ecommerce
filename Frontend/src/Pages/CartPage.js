import React from "react";
import { useLocation } from "react-router-dom";
import CartForm from "../Components/CartForm";

const CartFormPage = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) return <h2 className="text-center mt-5">No product selected</h2>;

  return <CartForm product={product} />;
};

export default CartFormPage;
