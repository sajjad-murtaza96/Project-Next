import React, { createContext, useState } from 'react';
import { IProduct } from '../utilities/product';

interface CartContextType {
    productCount: number;
    products: IProduct[];
    addProductToCart: (products: IProduct[], count: number) => void;
    removeProduct: (productId: number, productCount: number) => void;
    updateTotalAmount: (subtotal: number) => void;
    totalAmount: number;
}

interface ICartState {
    productCount: number;
    products: IProduct[];
    totalAmount: number;
}

export const addToCartContext = createContext<CartContextType>({
    productCount: 0,
    products: [],
    addProductToCart: () => { },
    removeProduct: () => { },
    updateTotalAmount: () => { },
    totalAmount: 0
});

export const AddToCartProvider = ({ children }: any) => {
    const [cart, setCart] = useState<ICartState>({
        productCount: 0,
        products: [],
        totalAmount: 0
    });

    const addProductToCart = (products: IProduct[], count: number) => {
        setCart({
            ...cart,
            productCount: count,
            products: products
        })
    }

    const removeProduct = (productId: number, productCount: number) => {
        const updatedCart = cart.products.filter((item) => item.id !== productId);
        setCart({
            ...cart,
            productCount: productCount,
            products: updatedCart
        })
    }

    const updateTotalAmount = (subtotal: number) => {
        setCart({
            ...cart,
            totalAmount: cart.totalAmount + subtotal
        })
    }

    return <addToCartContext.Provider value={{ productCount: cart.productCount, products: cart.products, addProductToCart, removeProduct, updateTotalAmount, totalAmount: cart.totalAmount }}>
        {children}
    </addToCartContext.Provider>
}