import Link from 'next/link';
import { useContext } from 'react';
import { addToCartContext } from '../../store/add-to-cart-context';
import classes from './main-header.module.css';
import { ShoppingBagIcon, BuildingStorefrontIcon } from '@heroicons/react/24/solid'

const MainHeader = () => {
  const { productCount } = useContext(addToCartContext);
  return (
    <header className="bg-white w-full shadow-md border-b-2">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href='/' className='className="-m-1.5 p-1.5"'>
            <BuildingStorefrontIcon className="h-16 w-16 text-indigo-500 cursor-pointer" />
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href='/cart' className="text-sm font-semibold leading-6 text-gray-900">
            <div className={classes.cart}>
              <span className={classes.count}>{productCount}</span>
              <ShoppingBagIcon className="h-8 w-8 text-blue-500 cursor-pointer" />
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default MainHeader;
