import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "./useCart";
import { AuthContext } from "../provider/AuthProvider";

const CheckOutForm = () => {
  const stripe = useStripe();
  const { user } = useContext(AuthContext);
  const elements = useElements();
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cart] = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  // Create a payment intent when the component mounts
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", {
          price: totalPrice,
        })
        .then((res) => {
          if (res.data.clientSecret) {
            setClientSecret(res.data.clientSecret);
          }
        })
        .catch((err) => {
          setError("Failed to create payment intent. Please try again.");
        });
    }
  }, [totalPrice, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    setLoading(true);
    setError(null); // Reset error state

    try {
      // Create a payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: card,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        // Handle payment method (send it to your backend for processing)
        console.log("Payment Method:", paymentMethod);
        setSuccess(true); // Set success state for UI feedback
        // You can make a call to your backend API here to process the payment
        toast.success("Your payment was successful!");
      }
    } catch (error) {
      setError("Payment failed. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anunymous",
            name: user?.displayName || "anunymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirmError");
    } else {
      console.log("paymentIntent", paymentIntent);
      if (paymentIntent) {
        const paymentDetails = {
          email: user?.email,
          name: user?.displayName,
          paymentIntent: paymentIntent.id,
          date: new Date(),
          cartIds: cart?.map((item) => item._id),
          status: "send Pending",
        };
        const res = await axiosSecure.post("/payments", paymentDetails);
        console.log(res);
      }
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        lineHeight: "24px",
        padding: "10px",
        border: "1px solid #ced4da", // Border color
        borderRadius: "4px", // Rounded corners
        backgroundColor: "#f8f9fa", // Background color
      },
      invalid: {
        color: "#fa755a", // Error text color
        iconColor: "#fa755a", // Error icon color
      },
    },
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="card-element">
            Credit or Debit Card
          </label>
          <CardElement
            options={cardElementOptions}
            className="my-4 border border-gray-300 rounded-lg p-2"
          />
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && (
          <div className="text-green-500 mb-2">Payment successful!</div>
        )}
        <button
          className={`w-full py-2 text-white font-semibold rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } transition duration-200`}
          type="submit"
          disabled={!stripe || !clientSecret || loading}
        >
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default CheckOutForm;
