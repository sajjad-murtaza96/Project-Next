import { useContext, useMemo } from "react";
import { IProduct } from "../../utilities/product";
import { addToCartContext } from "../../store/add-to-cart-context";
import dynamic from 'next/dynamic';
import Link from "next/link";
import OrderSummary from "../../components/order-summary";
import EmptyCart from "../../components/empty-cart";

const ProductItem = dynamic(() => import('../../components/product-item'), {
    ssr: false,
    loading: () => <p>{'loading....'}</p>
})

const Cart: React.FC = () => {
    const { products } = useContext(addToCartContext);

    const totalAmount = useMemo(() => {
        return products.reduce((total, product) => {
            return total + (product.discountedPrice * product.quantity)
        }, 0);
    }, [products])

    const totalDiscount = useMemo(() => {
        return products.reduce((total, product) => {
            return total + ((product.price - product.discountedPrice) * product.quantity)
        }, 0)
    }, [products])

    return (
        <div className="bg-gray-100 h-screen py-8">
            {
                products.length > 0 ? (
                    <div className="container mx-auto px-4">
                        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-3/4">
                                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                    <table className="w-full">
                                        <thead>
                                            <tr>
                                                <th className="text-left font-semibold">Product</th>
                                                <th className="text-left font-semibold">Price</th>
                                                <th className="text-left font-semibold">Quantity</th>
                                                <th className="text-left font-semibold">SubTotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products.map((product: IProduct, index) => (
                                                    <ProductItem key={index} {...product} />
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="md:w-1/4">
                                <OrderSummary totalAmount={totalAmount} totalDiscount={totalDiscount} />
                            </div>
                        </div>
                    </div>
                ) : <EmptyCart />
            }
        </div>
    )
}

export default Cart;