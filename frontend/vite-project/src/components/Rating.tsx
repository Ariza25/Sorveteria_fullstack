import { FaStar } from "react-icons/fa";
import { api } from "../services/axios";
import {useState, useEffect, useContext} from 'react';
import { Product, ProductContext } from "../context/ProductContext";

const Rating = () => {
    const [rating, setRating] = useState(0);
    const {selectedProduct} = useContext(ProductContext);
        
    useEffect(() => {
        if (selectedProduct === null) {
            return;
        }
        
        api.get('/v1/api/products').then((response) => {
            const product = response.data.products.find((product: Product) => product.id === selectedProduct.id);
            if (product && product.rating.length > 0) {
                setRating(product.rating[0].rating.starValue);
            }
        })
    }, [selectedProduct]);

    return (
        <div className="font-bold text-lg text-slate-700 mt-1">
            <div className="flex">
            {[...Array(5)].map((_, i) => <FaStar key={i} size={16} className={i < rating ? 'text-yellow-400' : 'text-gray-200'}/>)}
            </div>
        </div>
    );
};

export default Rating;