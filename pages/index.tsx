import Link from 'next/link';
import Image from 'next/image';
import { IProduct } from '../utilities/product';

const HomePage = (props: { products: IProduct[] }) => {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {props.products.map((product) => (
              <Link href={`/${product.title}/${product.id}`} key={product.id} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <Image src={product.images[0]} alt='product-image' width={400} height={400} className="h-full w-full object-cover object-center group-hover:opacity-75" />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{`$${product.price}`}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const data: { count: number, products: IProduct[] } = await (await fetch('http://localhost:3000/api/home/fetchProducts')).json();
  return {
    props: {
      products: data.products
    },
  }
}

export default HomePage;