import { getAllProducts, IProductData } from '../dummy-data';
import { useContext, useState } from 'react';
import { addToCartContext } from '../store/add-to-cart-context';
import React from 'react';
import Link from 'next/link';

interface StaticProps {
    loadedProductDetails: IProductData;
}

const eventDetailPage = (props: StaticProps) => {
    const { loadedProductDetails } = props;
    const { productCount, addProductToCart, products } = useContext(addToCartContext);
    const [quantity, setQuantity] = useState<number>(0);

    if (!loadedProductDetails) {
        return <p>Loading......</p>
    }

    const handleOnChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        let currentValue = event.target.valueAsNumber;
        const max = +event.target.max;
        const min = +event.target.min;

        if (Number.isNaN(currentValue)) {
            setQuantity(0);
            return;
        }
        currentValue = Math.min(max, Math.max(min, currentValue));
        setQuantity(currentValue);
    }

    const handleAddProductToCart = async () => {
        const productDetail = { ...loadedProductDetails, quantity: quantity }
        const [isSameProduct] = products.map((item: IProductData) => {
            if (item.id === loadedProductDetails.id) {
                return {
                    ...item,
                    quantity: item.quantity + quantity
                }
            }
            return { ...loadedProductDetails, quantity: item.quantity + quantity };
        });
        const indexToReplace = products.findIndex((item: IProductData) => item.id === loadedProductDetails.id);
        if (isSameProduct && indexToReplace !== -1) {
            products[indexToReplace] = isSameProduct;
        }
        else {
            products.push(productDetail);
        }
        addProductToCart(products, productCount + quantity);
    }

    return (
        <>
            <div>
                <h2>{loadedProductDetails.title}</h2>
                <img src={loadedProductDetails.thumbnail} />
                <p>{loadedProductDetails.description}</p>
            </div>
            <div>
                <input onChange={(e) => { handleOnChangeQuantity(e); }} value={quantity} type="number" id='quantity' name='quantity' min='1' max='10' />
            </div>
            <button>
                <Link onClick={handleAddProductToCart} style={{ cursor: 'pointer' }} href={`/cart`}>{`Add To Cart`}</Link>
            </button>
        </>
    )
}

export const getStaticProps = async (context: any) => {
    const { params } = context;

    const productId = params.productId;

    const data: { products: IProductData[] } = await getAllProducts();

    const product: IProductData | undefined = data.products.find((item) => item.id === +productId);

    if (!product) {
        return { notFound: true };
    }

    return {
        props: {
            loadedProductDetails: product
        }
    }
}

export const getStaticPaths = async () => {
    const data: { products: IProductData[] } = await getAllProducts();
    const pathWithParams = data.products.map((item) => {
        return { params: { productId: String(item.id) } }
    });

    return {
        paths: pathWithParams,
        fallback: true
    }
}

export default eventDetailPage;