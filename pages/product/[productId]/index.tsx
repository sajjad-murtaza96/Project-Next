import Link from 'next/link';
import { useRouter } from 'next/router';

export default function productDetails() {

    const router = useRouter();
    console.log(router.query);
    const { productId } = router.query;

    function goToReviews() {
        router.push(`/product/${productId}/reviews`);
    }

    return (
        <>
            <h2>product Details about product {productId}</h2>
            <button onClick={goToReviews}>show reviews</button><br/><br />
            <Link href={`/product`}>Back to Product List</Link><br />
        </>
    )
}