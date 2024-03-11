export interface IProductData {
    products: IProduct[]
}

export interface IProduct {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
    quantity: number;
    discountedPrice: number;
}

export interface IOrderSummary {
    totalAmount: number;
    totalDiscount: number;
}