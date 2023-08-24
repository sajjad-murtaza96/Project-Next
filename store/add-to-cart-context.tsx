import React, { createContext, useState } from 'react';
import { IProductData } from '../dummy-data';

interface CartContextType {
    productCount: number;
    products: IProductData[];
    addProductToCart: (products: IProductData[], count: number) => void;
    removeProduct: (productId: number, productCount: number) => void;
}

interface ICartState {
    productCount: number;
    products: IProductData[];
}

export const addToCartContext = createContext<CartContextType>({
    productCount: 0,
    products: [],
    addProductToCart: () => { },
    removeProduct: () => { }
});

export const AddToCartProvider = ({ children }: any) => {
    const [cart, setCart] = useState<ICartState>({
        productCount: 0,
        products: []
    });

    const addProductToCart = (products: IProductData[], count: number) => {
        console.log("products state", products);
        setCart({
            productCount: count,
            products: products
        })
    }

    const removeProduct = (productId: number, productCount: number) => {
        const updatedCart = cart.products.filter((item) => item.id !== productId);
        setCart({
            productCount: productCount,
            products: updatedCart
        })
    }

    return <addToCartContext.Provider value={{ productCount: cart.productCount, products: cart.products, addProductToCart, removeProduct }}>
        {children}
    </addToCartContext.Provider>
}