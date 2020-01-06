import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const onToken = token => {
    console.log(token);
    alert("Payment Succesfull");
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
