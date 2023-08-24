import { useContext } from "react";
// import ProductItem from "../components/product-item";
import { IProductData } from "../dummy-data";
import { addToCartContext } from "../store/add-to-cart-context";
import dynamic from 'next/dynamic';

const ProductItem = dynamic(() => import('../components/product-item'), {
    ssr: false,
    loading: () => <p>{'loading....'}</p>
})

const Cart: React.FC = () => {
    const { products } = useContext(addToCartContext);
    return (
        <div>
            {
                products.length > 0 ? (
                    <>
                        {
                            products.map((product: IProductData) => (
                                <ProductItem {...product} />
                            ))
                        }
                    </>
                ) : (
                    <>
                        {`Your shopping cart is empty`}
                    </>
                )
            }
        </div>
    )
}

// export const getServerSideProps = async (context: any) => {
//     console.log("context", context);
//     console.log("sajjad");
//     const cartDetails = await fetch('https://my-next-project-1819c-default-rtdb.firebaseio.com/cart.json').then((response) => response.json());
//     console.log("cart details", cartDetails);
//     return {
//         props: {
//             name: 'sajjad'
//         }
//     };
// }

export default Cart;