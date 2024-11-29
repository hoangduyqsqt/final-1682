import React, { useState, useEffect } from 'react'
import ProductCards from '../shop/ProductCards'
import { getBaseUrl } from "../../utils/baseURL.js"

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${getBaseUrl()}/api/products`)
                const data = await response.json()
                setProducts(data.products)
                setFilteredProducts(data.products)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }

        fetchProducts()
    }, [])

    const handleSearch = () => {
        const query = searchQuery.toLowerCase()
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        )
        setFilteredProducts(filtered)
    }

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Search Product</h2>
                <p className='section__subheader'>Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!</p>
            </section>

            <section className='section__container'>
                <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4'>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='search-bar w-full max-w-4xl p-2 border rounded'
                        placeholder='Search for products...'
                    />
                    <button
                        onClick={handleSearch}
                        className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded'
                    >
                        Search
                    </button>
                </div>

                <ProductCards products={filteredProducts} />
            </section>
        </>
    )
}

export default Search