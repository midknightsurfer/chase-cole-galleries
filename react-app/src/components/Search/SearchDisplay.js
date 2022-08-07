import React from 'react'
import { useSelector } from 'react-redux';
import ProductCard from '../ProductView/ProductCard'

import './search.css'

const SearchDisplay = () => {
  const products = useSelector((state) => Object.values(state.search));
  
  return (
    <div>
      <h1 style={{textAlign: "center", margin: "15px"}}>Search Results</h1>
      <div className="products__card-container">
      {products.length ? products.map((product) => (
            <ProductCard key={product.id} product={product} />
          )): <div>No products found</div>}
      </div>
    </div>
  )
}

export default SearchDisplay