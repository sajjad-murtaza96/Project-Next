import React from "react";
import ShippingFormConfig from "./shipping-config";
import { Input } from "@material-tailwind/react";

export const ShippingForm: React.FC<{}> = () => {
    const { fields } = ShippingFormConfig;
    return (
        <div className="max-w-2xl mx-auto p-6l">
            <form className="space-y-5">
                {/* First Name + Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {
                        fields.slice(0, 2).map((field) => (
                            <div key={field.name}>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type={field.type}
                                    variant="outlined"
                                    label={field.label}
                                    size="lg"
                                    color="blue"
                                    required
                                />
                            </div>
                        ))
                    }
                </div>
                {/* Email */}
                {
                    fields.slice(2, 3).map((field) => (
                        <div key={field.name}>
                            <Input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                variant="outlined"
                                label={field.label}
                                size="lg"
                                color="blue"
                                required
                            />
                        </div>
                    ))
                }

                {/* Street Address */}
                <div>
                    {fields.slice(3, 4).map((field) => (
                        <div key={field.name}>
                            <Input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                variant="outlined"
                                label={field.label}
                                size="lg"
                                color="blue"
                                required
                            />
                        </div>
                    ))}
                </div>

                {/* Phone + Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {
                        fields.slice(4, 6).map((field) => (
                            <div key={field.name}>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type={field.type}
                                    variant="outlined"
                                    label={field.label}
                                    size="lg"
                                    color="blue"
                                    required={field.isRequired}
                                />
                            </div>
                        ))
                    }
                </div>

                {/* City + Postal Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {
                        fields.slice(6, 8).map((field) => (
                            <div key={field.name}>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type={field.type}
                                    variant="outlined"
                                    label={field.label}
                                    size="lg"
                                    color="blue"
                                />
                            </div>
                        ))
                    }

                </div>
            </form>
        </div>
    );
}
