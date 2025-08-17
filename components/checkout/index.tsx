import React from "react";
import { IStep } from "./stepper/stepper-config";
import { CheckoutStepper } from "./stepper/stepper";
import { ContinueCheckout } from "./continue-checkout";

export const Checkout: React.FC<{ steps: IStep[] }> = ({ steps }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => setActiveStep((cur) => cur + 1);
  const handlePrev = () => setActiveStep((cur) => cur - 1);

  return (
    <div className="min-h-screen w-full py-4 px-8">
      <CheckoutStepper steps={steps} activeStep={activeStep} />
      <div className="mt-32 space-y-6">
        {steps[activeStep].content}
      </div>

      <ContinueCheckout
        activeStep={activeStep}
        isLastStep={isLastStep}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>
  );
};