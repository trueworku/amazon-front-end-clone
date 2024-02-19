import React, {useContext, useState} from 'react';
import classes from './Payment.module.css';
import LayOut from '../../Componets/LayOut/LayOut';
import { DataContext } from '../../Componets/DataProvider/DataProvider';
import ProductCard from '../../Componets/product/ProductCard';
import { useStripe, useElements, CardElement} from "@stripe/react-stripe-js";
import CurrencyFormat from '../../Componets/CurrencyFormat/CurrencyFormat';
import {axiosInstance} from "../../Api/Axios";
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/Firebase';
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';

function Payment() {

  const [{user,basket}, dispatch] = useContext(DataContext);
  console.log(user);
  // it calculate the total item in cart
const totalItem = basket?.reduce((amount, item) => {
  return item.amount + amount;
}, 0);
// to calculate the total price
const total = basket.reduce((amount, item) => {
  return item.price * item.amount + amount;
}, 0);

// setting up card error  
const [cardError, setcardError] = useState(null);
const [processing,setProcessing] = useState(false)

const stripe = useStripe();
const elements = useElements();
const navigate = useNavigate();

const handleChange =(e)=>{
// console.log(e);
e?.error?.message? setcardError (e?.error?.message): setcardError("")
};

const handlePayment = async(e) => {
  e.preventDefault();


try {
  setProcessing(true)
  // step 1. backend functions ..contact to the client secret.
  const response = await axiosInstance({
    method: "POST",
    url: `/payment/create?total=${total * 100}`,
  });

  // console.log(response.data);
  const clientSecret = response.data?.clientSecret;
  // step 2. client side (react side confirmation)
  const {paymentIntent
} = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: elements.getElement(CardElement),
    },
  });
  // console.log(paymentIntent);

  // step 3. after the confirmation ...order firestore database save, clear basket.
  //
  await db
    .collection("users")
    .doc(user.uid)
    .collection("orders")
    .doc(paymentIntent.id)
    .set({
      basket: basket,
      amount: paymentIntent.amount,
      created: paymentIntent.created,
    });
// empty the basket

dispatch({type:Type.EMPTY_BASKET});

  setProcessing(false);
  navigate("/orders", {state:{msg:"you have placed new order"}});

} catch (error) {
  console.log(error);
  setProcessing(false)
}

}

  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment__header}>checkout ({totalItem}) items </div>

      {/* payment method */}
      <section className= {classes.payment} >
        {/* adress */}
        <div className= {classes.flex} >
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago,IL</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {
              basket?.map((item)=> <ProductCard product={item} flex= {true} />)
            }
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex} >
          <h3>Payment methods</h3>
          <div className= {classes.payment__card__container} >
<div className= {classes.payment__details} >
  <form onSubmit= {handlePayment} >
    {/* card error */}
    {cardError && <small style={{color:"red"}}> {cardError} </small>}
    {/* card element */}
<CardElement onChange={handleChange}/>
{/* price */}
<div className= {classes.payment__price} >
  <div>
    <span style={{display: "flex", gap: "10px" }}>
      <p> Total Order | </p> <CurrencyFormat amount={total}/>
    </span>
  </div>
  <button type='submit'>
    {
      processing? (
<div className= {classes.loading}>
  <ClipLoader color= "gray" size= {12} /> <p>please wait...</p>
</div>
      ):" Pay Now "
    }
    
    
    </button>
</div>
  </form>
</div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment