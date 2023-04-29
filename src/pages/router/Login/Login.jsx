import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { useEffect,useState } from 'react';
import CryptoJS from 'crypto-js'

import Loader from './../../partials/Loader'
import Header from './../../partials/publicHeader/Header'
const Login = () => {

  const [loginValues, setLoginValues] = useState({
    email:'',
    password : '',
    signType : ''
  })
  const [isLoggining, setIsLoggining] = useState(false)

  const createLoginToken = ({username}) => {
    console.log(username)
      const secretUserKey = CryptoJS.lib.WordArray.random(2048).toString(CryptoJS.enc.Hex);
      const secretUsername = CryptoJS.AES.encrypt(username, secretUserKey);
      const auth = CryptoJS.AES.encrypt(secretUsername.toString() + '.' + CryptoJS.AES.encrypt('access-provider-auth-connect', secretUserKey) + CryptoJS.lib.WordArray.random(1024).toString(CryptoJS.enc.Hex),secretUserKey);

      const token = {
        secretUsername: secretUsername.toString(),
        authConnect: auth.toString(),
        authProperty: secretUserKey.toString(),
        authStatus: 1
      }
      window.localStorage.setItem('token_profile',JSON.stringify(token))
      setIsLoggining(false)
      window.open(`/${username}`,'_self')
  }

  const loginRequest = ({email,password = ''},signType) => {
    setIsLoggining(true)
    if(signType === 'Google'){
      axios.get('/loginUser',{
        params:{
          email,
          signType
        }
      })
      .then((res)=> {

        if(res.data.availabilityStatus === 1){
          createLoginToken({
            username: res.data.Content[0].username
          })
        }else{
          setIsLoggining(false)
          console.log('Hatalı giriş')
        }
      })
    }else{
      axios.get('/loginUser',{
        params:{
          password,
          email,
          signType
        }
      })
      .then((res)=> {
        if(res.data.availabilityStatus === 1){
          createLoginToken({
            username: res.data.Content[0].username
          })
        }else{
          setIsLoggining(false)
          console.log('Hatalı giriş')
        }
      })
    }
  }
  const handleChange = (e) => setLoginValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  
  const handleLogin = (e) => {
    e.preventDefault()
    loginRequest({
      email: loginValues.email,
      password: loginValues.password
    },'Email')
  }
  const  login  = useGoogleLogin({
    onSuccess: (response) => {
      
      if(response.access_token){
        fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`)
        .then((response) => response.json())
        .then((userData) => {
          
          setLoginValues({
            email: userData.email,
            username: '',
            signType: 'Google'
          })
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
    onFailure: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    if(loginValues.signType !== ''){
      loginRequest({
        email: loginValues.email,
        password: ''
      },loginValues.signType)
    }
  }, [loginValues]);
  
  return (
    <>
    {isLoggining ? (
        <Loader title='Giriş Yapılıyor..'/>
    ) : (
      <>
      <Header/>
        <form>
          <input type='email'name='email' className='email'onChange={handleChange}/>
          <input type='text' name='password' className='password' onChange={handleChange}/>
          <button type='submit' onClick={handleLogin}>Giriş Yap</button>
        </form>
        <a href='/forgetPassword' className="forgetPassword">Şifremi unuttum</a>
        <div className="googleLogin">
          <button onClick={login}>
            <span>Sign in with Google</span>
          </button>
        </div>
      </>
      
    )}
      
    </>
  )
}

export default Login