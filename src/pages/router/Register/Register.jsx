import React from 'react'
import { useState,useEffect } from 'react';
import axios from "axios"
import { useGoogleLogin } from '@react-oauth/google';
import CryptoJS from 'crypto-js'

import Loader from './../../partials/Loader'
import Header from './../../partials/publicHeader/Header'
const Register = () => {
    
    const [isRegistering, setIsRegistering] = useState(false)
    
    const cookieFunc = (username,signType = userValues.signType) => {
        const secretKey = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);
        const encryptedUsername = CryptoJS.AES.encrypt(username.replace(" ", "_"), secretKey)
        const encryptedrealName = CryptoJS.AES.encrypt(username, secretKey)
        const encryptedSignType = CryptoJS.AES.encrypt(signType, secretKey)

        const temporary = {
          username: encryptedUsername.toString() + '.' + secretKey,
          realName: encryptedrealName.toString(),
          signType: encryptedSignType.toString()
        }
        window.sessionStorage.setItem('encrypted_credential',JSON.stringify(temporary))
        uploadScreen(false)
        window.open('/register/complete','_self')
    }

    const [userValues, setUserValues] = useState({
      username : '',
      email : '',
      password : '',
      school : '',
      userEducation : '',
      userPython : '',
      userProvince : '',
      signType : 'Email'
    })
    const [googleValues, setGoogleValues] = useState({
      username:'',
      email:'',
      pictureSrc:'',
      signType : 'Google'
    })
    const handleChange = (e) => setUserValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    const [botCheck, setBotCheck] = useState(0)

  const uploadScreen = (status) => setIsRegistering(status)
  const errorStatus = (response) => {
    if(response.data.errorID === 2){
      console.log('Bu kullanıcı adı alınmış. Başka bir kullanıcı adı deneyiniz')
    }else{
      if(response.data.errorID === 3){
        console.log('Bu email adresi zaten hesap barındırıyor.')
      }else{
        console.log('Şuanda bu istek işleme alınamıyor. Lütfen daha sonra deneyiniz')
      }
    }
    uploadScreen(false)
  }
  
  const handleRegister = (e) => {
    e.preventDefault()
    uploadScreen(true)
    
    if(botCheck === 0){
      axios.get("/registerUser", {
        params:{
            ...userValues
        }
      }).then((response) => {
        if(response.data.status === 1){
          cookieFunc(`${userValues.username}`,userValues.signType)
        }else{
          errorStatus(response)
        }
      })
      .catch((err) => { console.error(err)})

      setBotCheck(5)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setBotCheck(botCheck => botCheck - 1);
    }, 1000);

    if (botCheck === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [botCheck]);
  
  useEffect(() => {
    if(googleValues.email !== ''){
    uploadScreen(true)
      axios.get("/registerUser", {
        params:{
            ...googleValues
        }
      }).then((response) => {
        if(response.data.status === 1){
          cookieFunc(`${googleValues.username}`,googleValues.signType)
        }else{
          errorStatus(response)
        }
      })
      .catch((err) => { console.error(err)})
    }
  }, [googleValues]);
  const  login  = useGoogleLogin({
    onSuccess: (response) => {
      
      if(response.access_token){
        fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`)
        .then((response) => response.json())
        .then((userData) => {
          setGoogleValues(prevState => ({
            ...prevState,
            username: userData.name,
            email: userData.email,
            pictureSrc: userData.picture
          }));
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
  return (
    <>
      {isRegistering ? (
        <Loader title='Kaydını işlemeye çalışıyoruz..'/>
      ) : (
        <div>
          <Header/>
          <form>
            <input type='text' name='username' className='username' onChange={handleChange}/>
            <input type='email'name='email' className='email'onChange={handleChange}/>
            <input type='text' name='password' className='password' onChange={handleChange}/>
            <input type='text' name='school' className='school' onChange={handleChange}/>
            <input type='text' name='userProvince' className='userProvince' onChange={handleChange}/>
            <input type='text' name='userEducation' className='userEducation' onChange={handleChange}/>
            <input type='text' name='userPython' className='userPython' onChange={handleChange}/>
            <button type='submit' onClick={handleRegister}>Kayıt Ol</button>
          </form>
          
          <div className="googleLogin">
            <button onClick={login}>
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      )}
    </>
    
  )
}

export default Register