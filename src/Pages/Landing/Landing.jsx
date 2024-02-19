import React from 'react'
import Category from '../../Componets/Category/Category'
import LayOut from '../../Componets/LayOut/LayOut'
import Carousel from '../../Componets/Carousel/CarouselEffect'
import Product from '../../Componets/product/Product' 



function Landing() {
  return (
    <LayOut>
        <Carousel/>
        <Category/>
       <Product/>
    </LayOut>
  )
}

export default Landing