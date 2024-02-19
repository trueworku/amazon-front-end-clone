import React, { useState,useContext } from 'react'
import classes from './Auth.module.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../Utility/Firebase'; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import {ClipLoader} from 'react-spinners'
import {DataContext} from '../../Componets/DataProvider/DataProvider';
import {Type} from '../../Utility/action.type';

function Auth() {
  const [email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const [error,setError] = useState ("");
  const [loading, setLoading] = useState({
    signIn:false,
    signUp:false
  })

  const [{user},dispatch] = useContext(DataContext);
  const navigate = useNavigate ();
  const navStateData = useLocation ();
  console.log(navStateData);
  // console.log(user);

  // console.log(email,password );
  const authHandler = async(e)=>{
    e.preventDefault()
    console.log(e.target.name);
    if(e.target.name=='signin'){
      // firebase auth
      setLoading({...loading, signIn:true});
      signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user,
        });
       setLoading({...loading, signIn:false});
       navigate(navStateData?.state?.redirect || "/");
      }).catch((err)=>{
        // console.log(err);
        setError(err.message);
        setLoading({...setLoading, signIn:false})
      });
    } else{
      setLoading({...loading, signUp:true})
      createUserWithEmailAndPassword(auth, email, password).then((userInfo)=>{
       
         dispatch({
          type:Type.SET_USER,
          user:userInfo.user,
        });
        setLoading({...loading, signUp:false})
        navigate(navStateData?.state?.redirect || "/");
      })
      .catch((err)=>{
        // console.log(err);
         setError(err.message);
         setLoading({...loading, signUp:false})
      });

    }
  };
  //  console.log(password, email);
  return (
   
 <section className= {classes.login}>
  {/* logo */}
  <Link to= "/" >
  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'/> </Link>
  {/* form */}
  {/* form */}
  <div className= {classes.login__container} >
    <h1>Sign In</h1>
{
  navStateData?.state?.msg && (
    <small style={{
      padding: "5px",
      textAlign:"center",
      color: "red",
      fontWeight:"bold",
    }}>
      {navStateData?.state?.msg}
    </small>
  )}

    <form action=''>
      <div>
        <label htmlFor = "email">Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' id= "email" />
      </div>
<div>
        <label htmlFor = "password">Password</label>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' id= "password" />
      </div>
      <button type='submit' name='signin' onClick={authHandler} className= {classes.login__signInButton} >
        {
          loading.signIn ? ( <ClipLoader color='#000' size={15}/>
       ) : ("Sign In") } 
    
      </button>
    </form>
    {/* agreement */}
    <p>
      By Signing-in you agree to the AMAZON FAKE CLONE conditions of use and sale. Please see our privacy Notice, our cookies Notice and our interst-Based Ads Notice.
    </p>
    {/* create account btn */}
    <button type='submit' name='signup' onClick={authHandler} className= {classes.login__registerButton} >
      {
          loading.signUp ? ( <ClipLoader color='#000' size={15}/>
       ) : ("Create your Amazon Account") } 
    </button>
    {error && <small style={{paddingTop: "5px", color: "red"}}> {error} </small> }
  </div>
 </section>
 
  );
}

export default Auth