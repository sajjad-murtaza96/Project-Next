import { NextApiRequest, NextApiResponse } from "next";
import { IProductData } from "../../../utilities/product";

const fetchProducts = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data: IProductData = await response.json();
        if (req.method === 'GET') {
            res.status(200).json({
                count: data.products.length,
                products: data.products
            });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}

export default fetchProducts;