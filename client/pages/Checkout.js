import React, { userState } from "react";
import StripeCheckout from 'react-stripe-checkout';

const Checkout = () => {
    // state varaibles for user, cart and products?


    return (
      
      <StripeCheckout
        stripeKey="pk_test_51H5aWNICjx0urQmcWAcQ6qpLA0PI0ZAjRNuu22bh9TvAE5fBkANPeNinYg79BrIzriDOtE1GVx9z9d6OsjfFPf8f00preNurLy"
        token={makePayment}
        name="AFC Skate"
        amount={cart.totalPrice}
        shippingAddress={user.address}
        billingAddress={user.address}
      >
        <Button className="paymentButton" variant="contained">
          Pay With Card
        </Button>
      </StripeCheckout>

    );
  };


export default Checkout;