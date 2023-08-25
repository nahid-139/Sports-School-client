import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  const location = useLocation();
  const [price, setPrice] = useState("");
  const [itemId, setItemId] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const price = searchParams.get("price");
    const item = searchParams.get("item");
    setPrice(price) 
    setItemId(item); 
  }, [location.search]);
  const amount = parseFloat(price);
  
  return (
    <div>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link to="/dashboard/student-home">Home</Link>
          </li>
          <li>Payment</li>
        </ul>
      </div>
      <h1 className="my-10 text-2xl font-oswald text-primary font-bold uppercase border-b border-secondary pb-5">
        Make Payment
      </h1>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm price={amount} itemId={itemId}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
