import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import "./CheckoutForm.css";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useSelectClass from "../../../../hooks/useSelectClass";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ itemId, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [items] = useSelectClass();
  const navigate = useNavigate();

  const classes = items?.find((item) => item?.item?._id === itemId);
  console.log("🚀 ~ file: CheckoutForm.jsx:21 ~ CheckoutForm ~ classes:", classes?._id)
  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      const payment = {
        selectedClassId: classes?._id,
        email: user?.email,
        name: user?.displayName,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        class_name: classes?.item?.class_name,
        classId: classes?.item?._id,
      };
      axiosSecure.post("/payments", payment).then((res) => {
        if (res?.data?.insertedId.length > 0) {
          Swal.fire({
            title: "Congratulations!",
            text: "Your payment is successfully done!",
            icon: "success",
            confirmButtonText: "Enjoy Class",
          });
          navigate('/dashboard/payment-history')
          
        }
      });
    }
  };

  return (
    <>
      <form className=" px-2 payment" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary btn-sm mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
      
    </>
  );
};

export default CheckoutForm;
