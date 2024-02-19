import React, {useContext} from 'react';
import classes from './Header.module.css'
import {Link} from 'react-router-dom'
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import LowerHeader from './LowerHeader';
import { BiCart } from "react-icons/bi";
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from '../../Utility/Firebase';

const Header = () => {

  const [{basket,user},dispatch]=useContext(DataContext)
  // console.log(basket.length);
  const totalItem = basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          {/* logo  */}
          <div className={classes.logo__container}>
            <Link to="/">
              <img
                src="https://pngimg.com/d/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* search */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={38} />
          </div>
          {/* right side */}
          <div className={classes.order__container}>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/510px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"
                alt=""
              />

              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            {/* three components */}
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]} </p>
                    <span onClick={()=>auth.signOut () }>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello, Sign In</p>
                    <span>Accounts & Lists</span>
                  </>
                )}
              </div>
            </Link>
            {/* cart */}
            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            {/* icon */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span> {totalItem} </span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
} ;

export default Header