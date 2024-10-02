import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Social from "../../shared/Social";

const imageHosting = import.meta.env.VITE_IMAGEBB_KEY;
const imageHOstingApi = `https://api.imgbb.com/1/upload?&key=${imageHosting}`;
const Register = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { createUser, updateProfileUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, image } = data;
    console.log(data);

    // Prepare the image file for upload using FormData
    const formData = new FormData();
    formData.append("image", image[0]); // photo is an array, so get the first file

    try {
      // Upload image using axiosPublic
      const imgRes = await axiosPublic.post(imageHOstingApi, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imgData = imgRes.data;

      if (imgData.success) {
        const imgURL = imgData.data.display_url; // Get the uploaded image URL

        // Create a new user with email and password
        const res = await createUser(email, password);
        const user = res.user; // Get the user object
        console.log(user);

        // Update user profile with the uploaded photo URL and name
        await updateProfileUser(name, imgURL);

        const userInfo = { name, email, image: imgURL }; // Save the image URL in the database

        // Save the user in the database
        const dbRes = await axiosPublic.post("/users", userInfo);
        if (dbRes.data.insertedId) {
          toast.success("User saved to database");
          reset(); // Reset the form
          navigate("/"); // Redirect to home page
        }
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-semibold text-center text-gray-700">
            Create an Account
          </h2>
          <p className="text-center text-gray-500 mt-2">
            Sign up to get started
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-gray-600">Name</span>
              </label>
              <input
                type="text"
                name="name"
                {...register("name", { required: true })}
                placeholder="Enter your name"
                className="input input-bordered w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-gray-600">PhotoURL</span>
              </label>
              <input
                type="file"
                name="image"
                {...register("image", { required: true })}
                placeholder="photoURL"
                className="input input-bordered w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {errors.image && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-gray-600">Email</span>
              </label>
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="input input-bordered w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />{" "}
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text text-gray-600">Password</span>
              </label>
              <input
                type="password"
                name="password"
                {...register(
                  "password",
                  { required: true, minLength: 6, maxLength: 20 },
                  {
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                  }
                )}
                placeholder="Create a password"
                className="input input-bordered w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />{" "}
              {errors.password && (
                <span className="text-red-500">
                  Password must be at least 8 characters, include an uppercase
                  letter, lowercase letter, a number, and a special character
                </span>
              )}
            </div>

            <div className="form-control">
              <button
                type="submit"
                className="btn btn-primary w-full bg-pink-500 hover:bg-pink-600 text-white rounded-lg py-3"
              >
                Register
              </button>
            </div>
          </form>
        </div>

        <div className="px-6 py-4 bg-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-500 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
        <Social />
      </div>
    </div>
  );
};

export default Register;
