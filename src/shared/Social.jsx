import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Social = () => {
  const { googleLogin } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleGoogle = () => {
    googleLogin().then(async (res) => {
      console.log(res.user);
      const userInfo = {
        name: res.user.displayName,
        email: res.user.email,
      };
      await axiosPublic.post("/users", userInfo).then((res) => {
        if (res.data.insertedId) {
          toast.success("User saved to database");
          navigate("/"); // Redirect to the home page
        }
      });
    });
  };
  return (
    <div className="w-full flex justify-center mt-4">
      <button onClick={handleGoogle} className="btn w-2/3">
        Google
      </button>
    </div>
  );
};

export default Social;
