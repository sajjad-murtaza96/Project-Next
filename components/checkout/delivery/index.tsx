import { useState } from "react";
import { DeliveryOption } from "./components/delivery-option";
import { DeliveryOptions, deliveryOptions } from "./delivery-config";

export const DeliveryService: React.FC<{}> = () => {
    const [selected, setSelected] = useState(DeliveryOptions.DELIVERY_STANDARD);
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-2xl">
            <h2 className="text-xl font-semibold mb-4">Choose Your Delivery Method</h2>
            <div className="grid gap-4">
                {deliveryOptions.map((option) => (
                    <DeliveryOption
                        key={option.id}
                        selected={selected}
                        setSelected={setSelected}
                        option={option}
                    />
                ))}
            </div>
        </div>
    );
}