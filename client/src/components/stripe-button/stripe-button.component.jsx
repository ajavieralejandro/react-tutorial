import React from "react";
import axios from 'axios';
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const onToken = token => {
    axios({
      url : 'payment',
      method : 'post',
      data : {
        amount : priceForStrip,
        token
      }
    }).then(respone=>{
      alert("Payment Successfull");
    })
    .catch(error=>{
      console.log("Payment error : ",error);
      alert("Issue with your pament... try again");
    })
  };

  const priceForStrip = price * 100;
  const publishableKey = "pk_test_MpwYy6V0V2CMIVffzyk4XM2D00d3EmdUxH";
  return (
    <StripeCheckout
      label="Pay now"
      name="CRWN clothing ltd."
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your Total is $${price}`}
      amount={priceForStrip}
      panelLabel="Pay now"
      token={onToken}
      stripeKey={publishableKey}
    ></StripeCheckout>
  );
};

export default StripeCheckoutButton;
