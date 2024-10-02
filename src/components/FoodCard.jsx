import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "./useCart";

const FoodCard = ({ item }) => {
  const { image, name, price, recipe, _id } = item;
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();
  const aciosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const handleaddtpcard = async () => {
    if (user && user.email) {
      const cartItem = {
        menuId: _id,
        email: user?.email,
        name,
        image,
        price,
      };
      await aciosSecure.post(`/carts`, cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Good job!",
            text: `${name} Added to the cart!`,
            icon: "success",
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not login",
        text: "Please login for add to the cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want to login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div>
      <div className="card card-compact bg-base-100  border">
        <figure>
          <img src={image} alt={name} />
        </figure>
        <p className="top-2 bg-black text-white py-1 px-2 rounded-2xl absolute right-7">
          $ {price}
        </p>
        <div className="card-body flex-1">
          <h2 className="card-title">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-end">
            <button onClick={handleaddtpcard} className="btn btn-primary">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
