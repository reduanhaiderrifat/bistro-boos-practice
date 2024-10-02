import React from "react";
import SectionTitle from "./SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"; // Import Elements
import CheckOutForm from "./CheckOutFrom";
// Make sure this is correctly implemented

const stripePromise = loadStripe(
  `pk_test_51PKuvJRxC3y7vh1wHmzmMRVMC7PF7nTLtc4ipJe94EHLBWsAvTbzqVJ1Hv1D4Dw5q0OpehPo2ey2gUX7TYNh4Neb00tpK4LRv5`
);

const Payment = () => {
  return (
    <div>
      <SectionTitle subHeading={"Payment"} heading={"Please pay to eat"} />
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm />{" "}
          {/* Make sure your CheckOutForm is properly implemented */}
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
