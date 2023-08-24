import Link from 'next/link'
import { productList } from '../../utilities/products.json';

export default function product() {
    return (
        <>
            {
                productList.map((item) => {
                    return (
                        <ul><li><Link key={item.productId} href={`/product/${item.productId}`}>{item.productName}</Link></li></ul>
                    )
                })
            }
        </>
    )
}