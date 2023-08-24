import Link from 'next/link';
import { useRouter } from 'next/router';
import { productList } from '../../../utilities/products.json';

export default function productReviews() {

    const router = useRouter();
    console.log(router.query);
    const productId = Number(router.query.productId);

    const getProduct = productList.find((item) => item.productId === productId);

    return (
        <>
            <h2>reviews for product {productId}</h2>
            {
                getProduct?.reviews.map((item) => {
                    return (
                        <>
                            <Link href={`/product/${productId}/reviews`}>{item.review}</Link><br />
                        </>

                    )
                })
            }
            <br />
            <Link href={`/product/${productId}`}>Back to Product details</Link><br />
        </>
    )
}