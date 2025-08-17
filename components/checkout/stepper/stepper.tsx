import { Stepper, Step, Typography } from "@material-tailwind/react";
import { IStep } from "./stepper-config";

export const CheckoutStepper: React.FC<{ steps: IStep[], activeStep: number }> = ({ steps, activeStep }) => {
	const getStepperTitleTextClass = (index: number) => {
		if (index === activeStep) {
			return "text-blue-500";
		}
		if (index < activeStep) {
			return "text-green-500";
		}
		return "text-gray-500";
	};
	return (
		<Stepper
			activeStep={activeStep}
			lineClassName="bg-gray-300"
			activeLineClassName="bg-green-600"
		>
			{
				steps.map((step, index) => (
					<Step
						activeClassName="bg-blue-500 text-white"
						completedClassName="bg-green-500 text-white border-green-500"
						key={step.title}
					>
						{index + 1}
						<div className="absolute -bottom-[3.5rem] w-max text-center">
							<Typography
								className={`font-small font-semibold ${getStepperTitleTextClass(index)}`}
							>
								{step.title}
							</Typography>
						</div>
					</Step>
				))
			}
		</Stepper>
	);
};
