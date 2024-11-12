import React, { useEffect, useState } from 'react'
import ProductCards from './ProductCards'
import {getBaseUrl} from "../../utils/baseURL.js";


const TrendingProducts = () => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(8);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${getBaseUrl()}/api/products`);
                const data = await response.json();
                console.log(data.products)
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const loadMoreProducts = () => {
        setVisibleProducts(prevCount => prevCount + 4);
    };

    return (
        <section className='section__container product__container'>
            <h2 className='section__header'>Trending Products</h2>
            <p className='section__subheader mb-12'>
                Discover the Hottest Picks: Elevate Your Style with Our Curated Collection of Trending Women's Fashion Products.
            </p>

            {/* products card */}
            <div className='mt-12'>
                <ProductCards products={products.slice(0, visibleProducts)} />
            </div>

            {/* load more products btn */}
            <div className='product__btn'>
                {visibleProducts < products.length && (
                    <button className='btn' onClick={loadMoreProducts}>Load More</button>
                )}
            </div>
        </section>
    );
};

export default TrendingProducts;