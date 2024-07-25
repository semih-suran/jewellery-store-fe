import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalCheckoutButton = ({ totalAmount }) => {
  return (
    <div>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalAmount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Transaction completed by " + details.payer.name.given_name);
          });
        }}
        onError={(err) => {
          console.error("PayPal Checkout onError", err);
          alert("An error occurred during the transaction. Please try again.");
        }}
      />
    </div>
  );
};

export default PayPalCheckoutButton;
