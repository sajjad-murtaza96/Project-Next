import { DeliveryService } from "../delivery";
import { Payment } from "../payment";
import { ShippingForm } from "../shipping/shipping-form";

// step interface
export interface IStep {
  title: string;
  content?: React.ReactNode;
}

// Step configuration
export const steps: IStep[] = [
  {
    title: "Shipping",
    content: <ShippingForm />,
  },
  {
    title: "Delivery",
    content: <DeliveryService />
  },
  {
    title: "Payment",
    content: <Payment />
  },
];