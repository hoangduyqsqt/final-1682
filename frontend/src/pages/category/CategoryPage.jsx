import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCards from '../shop/ProductCards'
import { getBaseUrl } from "../../utils/baseURL.js"

const CategoryPage = () => {
    const { categoryName } = useParams()
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${getBaseUrl()}/api/products`)
                const data = await response.json()
                const filtered = data.products.filter((product) => product.category === categoryName.toLowerCase())
                setFilteredProducts(filtered)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }

        fetchProducts()
    }, [categoryName])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>{categoryName}</h2>
                <p className='section__subheader'>Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!</p>
            </section>

            {/* products card */}
            <div className='section__container'>
                <ProductCards products={filteredProducts} />
            </div>
        </>
    )
}

export default CategoryPage