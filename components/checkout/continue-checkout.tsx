import { Button } from "@material-tailwind/react";
import { loadStripe } from "@stripe/stripe-js";

export const ContinueCheckout: React.FC<{
	activeStep: number;
	isLastStep: boolean;
	handleNext: () => void;
	handlePrev: () => void;
}> = ({ handleNext, handlePrev, activeStep, isLastStep }) => {
	const makePayment = async ()	=> {
		const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");
		console.log("Stripe loaded:", stripe);
		if (!stripe) {
			console.error("Stripe failed to load");
			return;
		}
		console.log("stripe...", stripe);
	}
	return (
		<>
			{/* Navigation Buttons */}
			<div className="mt-10 flex justify-between">
				{activeStep > 0 && (
					<Button className="bg-blue-500" onClick={handlePrev}>
						Prev
					</Button>
				)}
				{!isLastStep ? (
					<>
						<Button className="ml-auto bg-blue-500" onClick={handleNext}>
							Next
						</Button>
					</>
				) : (
					<Button className="ml-auto bg-green-500" onClick={() => makePayment()}>
						Submit
					</Button>
				)}
			</div>
		</>
	);
}