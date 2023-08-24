import Link from 'next/link';
import { getAllProducts, IProductData } from '../dummy-data';
import { useRouter } from 'next/router'

export default function HomePage(props: any) {
  const router = useRouter();

  return (
    <>
      {props.products.map((product: IProductData) => (
        <div key={product.id}>
          <Link href={`/${product.title}/${product.id}`} key={product.id}>{product.title}</Link>
        </div>
      ))}
    </>
  )
}


export async function getStaticProps() {
  const data: { products: IProductData[] } = await getAllProducts();
  return {
    props: {
      products: data.products
    }
  }
}