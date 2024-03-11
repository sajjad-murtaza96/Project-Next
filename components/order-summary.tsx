import { IOrderSummary } from "../utilities/product";
import Link from 'next/link';

const OrderSummary: React.FC<IOrderSummary> = ({ totalAmount, totalDiscount }) => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                    <span>Tax Estimate</span>
                    <span>$1.99</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Shipping Estimate</span>
                    <span>FREE</span>
                </div>
                <div className="flex justify-between mb-8">
                    <span>Discount</span>
                    <span>{`$${Math.round(totalDiscount).toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Order Total</span>
                    <span className="font-semibold">${Math.round(totalAmount + 1.99).toFixed(2)}</span>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                        or
                        <Link href={'/'} className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                        </Link>
                    </p>
                </div>
            </div>
        </>

    )
}

export default OrderSummary;