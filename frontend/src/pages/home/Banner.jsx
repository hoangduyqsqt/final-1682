import React from 'react'
import { Link } from 'react-router-dom'

import bannerImg from "../../assets/header.png"

const Banner = () => {
  return (
    <div className='section__container header__container'>
        <div className='header__content z-30'>
            <h4 className='uppercase'>UP TO 10% Discount on</h4>
            <h1>Girl Fashion</h1>
            <p>Discover the latest trends and express your unique style with our Women Fashion Website. Explore a curated collection of Clothing, accessories, and footwear that caters to every taste and occasion.</p>
            <button className='btn'><Link to='/shop'>EXPLORE NOW</Link></button>
        </div>
        <div className='header__image'>
            <img src={bannerImg} alt="banner image" />
        </div>
    </div>
  )
}

export default Banner