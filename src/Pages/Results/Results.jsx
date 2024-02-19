import React, { useEffect, useState } from 'react'
import classes from './Results.module.css'
import LayOut from '../../Componets/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints'
import ProductCard from '../../Componets/product/ProductCard'
import Loader from '../../Componets/Loader/Loader'

function Results() {
  const [results, setResults] =useState([]);
   const [isLoading,setIsLoading] = useState()
  const {categoryName} =useParams()
  useEffect(()=> {
  axios.get(`${productUrl}/products/category/${categoryName}`).then((res)=>{
    setResults(res.data)
    // console.log(res)
  }).catch((err)=> {
    console.log(err)
    setIsLoading(false)
  } ) ;
},[] )
  // console.log(categoryName)
  return (
    <LayOut>
        <section>
          <h1 style={{padding:"30px"}}>Results</h1>
          <p style={{padding:"30px"}}>Category/ {categoryName} </p> <hr/>

          {isLoading ? (<Loader/>):(
<div className= {classes.products_container} >
            {results?.map((product)=> (
<ProductCard 
key={product.id}
product={product}
renderDesc={false}
renderAdd={true}
/>
            )) }
          </div>
          )}
          </section>
    </LayOut>
  );
};

export default Results