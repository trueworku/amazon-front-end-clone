// import React from 'react';
// import './App.css';
// import Routing from './Router.jsx'
// import Header from './Componets/Header/Header';
// import CarouselEffect from './Componets/Carousel/CarouselEffect';
// import Category from './Componets/Category/Category';
// import Product from './Componets/product/Product';


// function App() {
//   return (
    
// {/* <div>
//   <Header/>
//   <CarouselEffect/>
//   <Category/>
//  <Product/>
// </div> */}


//   );
// }

// export default App;
import React, {useContext, useEffect} from 'react'
import Routing from './Router.jsx'
import { DataContext } from './Componets/DataProvider/DataProvider';
import {Type} from './Utility/action.type';
import {auth} from './Utility/Firebase.js';

function App() {
const [{user}, dispatch] = useContext(DataContext)

useEffect(()=>{
auth.onAuthStateChanged((authUser)=>{
  if(authUser){
    // console.log(authUser);
    dispatch({
      type:Type.SET_USER,
      user:authUser
    })
  }else{
     dispatch({
      type:Type.SET_USER,
      user:null,
    })
  }
} )
},[])
  return <Routing/>;
}

export default App;