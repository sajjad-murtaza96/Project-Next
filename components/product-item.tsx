import { useContext } from "react";
import { IProduct } from "../utilities/product";
import { addToCartContext } from "../store/add-to-cart-context";
import Link from 'next/link';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/24/solid'

const ProductItem: React.FC<IProduct> = (product: IProduct) => {
    const { productCount, removeProduct } = useContext(addToCartContext);

    const handleRemoveProduct = () => {
        removeProduct(product.id, productCount - product.quantity)
    }

    return (
        <>
            <tr>
                <td className="py-4">
                    <Link className="flex items-center" href={`/${product.title}/${product.id}`}>
                        <Image className="h-16 w-16 mr-4" src={product.thumbnail} alt="Product image" width={400} height={400} />
                        <span className="font-semibold">{product.title}</span>
                    </Link>
                </td>
                <td className="py-4">{`$${Math.round(product.discountedPrice).toFixed(2)}`}</td>
                <td className="py-4">
                    <div className="flex items-center">
                        <span className="text-center w-8">{`$${product.quantity}`}</span>
                    </div>
                </td>
                <td className="py-4">{`$${Math.round(product.discountedPrice * product.quantity).toFixed(2)}`}</td>
                <td className="py-4"><TrashIcon onClick={handleRemoveProduct} className="h-6 w-6 text-red-500 cursor-pointer" /></td>
            </tr>
        </>

    )
}

export default ProductItem;