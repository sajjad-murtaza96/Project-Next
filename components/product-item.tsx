import { useContext } from "react";
import { IProductData } from "../dummy-data";
import { addToCartContext } from "../store/add-to-cart-context";
import Link from 'next/link';

const ProductItem: React.FC<IProductData> = (product: IProductData) => {
    const { productCount, removeProduct } = useContext(addToCartContext);

    const handleRemoveProduct = () => {
        removeProduct(product.id, productCount - product.quantity)
    }

    return (
        <div key={product.id} style={{ margin: '20px 0' }}>
            <Link href={`/${product.title}/${product.id}`}>
                <h1>{product.title}</h1>
            </Link>
            <img src={product.thumbnail} />
            <div>
                {`Quantity: ${product.quantity}`}
            </div>
            <div>
                {`SubTotal: ${product.price * product.quantity}`}
            </div>
            <div>
                <button onClick={handleRemoveProduct} style={{ cursor: 'pointer' }}>{`Remove`}</button>
            </div>
        </div>
    )
}

export default ProductItem;