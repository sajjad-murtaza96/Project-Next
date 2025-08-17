import React from "react";
import { Checkout } from "../../components/checkout";
import { steps } from "../../components/checkout/stepper/stepper-config";

export default function CheckoutPage() {
  return (
    <div className="bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg p-6 md:p-10">
        <Checkout steps={steps} />
      </div>
    </div>
  );
}
