import React from "react";
import StripeCheckout from 'react-stripe-checkout';

const Checkout = () => {
    
    return (
      
        <StripeCheckout
        token={this.onToken}
        stripeKey="my_PUBLISHABLE_stripekey"
      />

    );
  };


export default Checkout;