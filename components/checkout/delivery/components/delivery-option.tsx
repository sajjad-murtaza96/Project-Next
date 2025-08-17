import { IDeliveryOptions, DeliveryOptions } from "../delivery-config";

export const DeliveryOption: React.FC<{
    selected: DeliveryOptions;
    setSelected: (option: DeliveryOptions) => void;
    option: IDeliveryOptions;
}> = ({
    selected,
    setSelected,
    option
}) => {
        const Icon = option.icon;
        const isActive = selected === option.id;
        return (
            <div
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition 
                ${isActive ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-400"}
              `}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
                        <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-medium">{option.title}</h3>
                        <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                </div>
                <span className="font-semibold text-gray-800">{option.price}</span>
            </div>
        );
    }
