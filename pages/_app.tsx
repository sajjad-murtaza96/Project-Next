// import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/layout';
import { AddToCartProvider } from '../store/add-to-cart-context';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AddToCartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AddToCartProvider>
  )
}
