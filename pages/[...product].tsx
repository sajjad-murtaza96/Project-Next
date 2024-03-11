import { IProduct } from '../utilities/product';
import { useContext, useMemo, useState } from 'react';
import { addToCartContext } from '../store/add-to-cart-context';
import React from 'react';
import Image from 'next/image';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Rating, Button } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { getOriginFromRequest } from '../utilities/fetchDomain';

interface IStaticProps {
    loadedProductDetails: IProduct;
}

const ProductDetailPage: React.FC<IStaticProps> = (props: IStaticProps) => {
    const router = useRouter();
    const { loadedProductDetails } = props;
    const { productCount, addProductToCart, products } = useContext(addToCartContext);
    const [quantity, setQuantity] = useState<number>(1);
    const discountedPrice = useMemo(() => {
        const discountedAmount = (loadedProductDetails.price / 100) * loadedProductDetails.discountPercentage;
        return +Math.round(loadedProductDetails.price - discountedAmount).toFixed(2);
    }, [loadedProductDetails.price, loadedProductDetails.discountPercentage]);

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
        const productDetail = { ...loadedProductDetails, quantity: quantity, discountedPrice: discountedPrice }
        const [isSameProduct] = products.map((item: IProduct) => {
            if (item.id === loadedProductDetails.id) {
                return {
                    ...item,
                    quantity: item.quantity + quantity,
                    discountedPrice: discountedPrice
                }
            }
            return { ...loadedProductDetails, quantity: item.quantity + quantity, discountedPrice: discountedPrice };
        });
        const indexToReplace = products.findIndex((item: IProduct) => item.id === loadedProductDetails.id);
        if (isSameProduct && indexToReplace !== -1) {
            products[indexToReplace] = isSameProduct;
        }
        else {
            products.push(productDetail);
        }
        addProductToCart(products, productCount + quantity);
        router.replace('/cart')
    }

    return (
        <>
            <div className="bg-white mb-20">
                <div className="pt-6">
                    {/* Image gallery */}
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            <Image
                                src={loadedProductDetails.images[0]}
                                alt={loadedProductDetails.images[0]}
                                width={400}
                                height={400}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <Image
                                    src={loadedProductDetails.images[1]}
                                    alt={loadedProductDetails.images[1]}
                                    width={400}
                                    height={400}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        </div>
                        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            <Image
                                src={loadedProductDetails.images[3]}
                                alt={loadedProductDetails.images[3]}
                                width={400}
                                height={400}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* loadedProductDetails info */}
                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{loadedProductDetails.title}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <p className="text-3xl tracking-tight text-gray-900">{`$${discountedPrice}`}
                                <span className="ml-2 text-base line-through">
                                    {`$${Math.round(loadedProductDetails.price).toFixed(2)}`}
                                </span>
                            </p>
                            <div className="mt-6">
                                <Rating className='mb-6' value={Math.round(loadedProductDetails.rating)} readonly nonce={undefined} onResize={undefined} onResizeCapture={undefined} placeholder={undefined} />
                                <form className="max-w-sm mx-auto">
                                    <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Your Quantity</label>
                                    <input onChange={(e) => { handleOnChangeQuantity(e); }} value={quantity} type="number" id='quantity' name='quantity' min='1' max='10' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select Your Quantity" required />
                                </form>
                            </div>
                            {/* { Add To Cart button } */}
                            <Button onClick={handleAddProductToCart} variant='text' disabled={quantity === 0} className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 active:bg-indigo-700 px-8 py-3 font-medium text-white text-base hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 capitalize" nonce={undefined} onResize={undefined} onResizeCapture={undefined} placeholder={undefined}>Add To Bag</Button>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{loadedProductDetails.description}</p>
                                </div>
                            </div>
                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{loadedProductDetails.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
    const { params, req } = context;
    const productId = params?.product?.at(-1)!;

    const data: { products: IProduct[] } = await (await fetch(`${getOriginFromRequest(req)}/api/home/fetchProducts`)).json();

    const product: IProduct | undefined = data.products.find((item) => item.id === +productId);

    if (!product) {
        return { notFound: true };
    }

    return {
        props: {
            loadedProductDetails: product
        }
    }
}

export default ProductDetailPage;