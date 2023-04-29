import React from 'react'
import { useState } from 'react';
import CryptoJS from 'crypto-js';
import Loader from './../../partials/Loader'


const RegisterComplete = () => {

  const [isRegistering,setIsRegistering] = useState(false)

  const decrypt = (cipherText,key) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  const data = JSON.parse(window.sessionStorage.getItem('encrypted_credential'));
  const secretKey = data.username.split('.')[1]
  
  const plainUsername = decrypt(data.username.split('.')[0],secretKey)
  const plainRealName = decrypt(data.realName,secretKey)
  const plainsignType = decrypt(data.signType,secretKey)

  const [values, setValues] = useState({
    password : '',
    school : '',
    userEducation : '',
    userPython : '',
    userProvince : '',
    pictureSrc : '',
    signType : plainsignType
  })

  const handleChange = (e) => setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const [file, setFile] = useState(null)

  const createTokenProfile = (username) => {
    setIsRegistering(true)
    window.sessionStorage.removeItem('encrypted_credential')
    const secretUserKey = CryptoJS.lib.WordArray.random(2048).toString(CryptoJS.enc.Hex);
    const secretUsername = CryptoJS.AES.encrypt(username.replace(" ", "_"), secretUserKey);
    const auth = CryptoJS.AES.encrypt(secretUsername.toString() + '.' + CryptoJS.AES.encrypt('access-provider-auth-connect', secretUserKey) + CryptoJS.lib.WordArray.random(1024).toString(CryptoJS.enc.Hex),secretUserKey);

    const token = {
      secretUsername: secretUsername.toString(),
      authConnect: auth.toString(),
      authProperty: secretUserKey.toString(),
      authStatus: 1
    }
    window.localStorage.setItem('token_profile',JSON.stringify(token))
    setIsRegistering(false)
    window.open(`/${username.replace(" ", "_").replace("I","İ").replace("ş","s").replace("Ş","S").toLowerCase()}`,'_self')
  }

  const skipComplete = (e) => {
    e.preventDefault()
    createTokenProfile(plainUsername)
  }

  const finishComplete = async(e) => {
    e.preventDefault()
    setIsRegistering(true)
    let formData = new FormData();
    if(values.signType === 'Email'){
      
      formData.append('file', file)
      formData.append('username',plainUsername)
      formData.append('signType',plainsignType)
      fetch('/completeRegister', {
          method: "POST",
          body: formData
      })
      .then((res) => res.json())
      .then((response) => {
        setIsRegistering(false)
        if(response.apiStatus === true && response.changedValues === true){
          createTokenProfile(plainUsername)
        }else{
          console.error('İşlem gerçekleştirilemiyor.')
        }
      })
      .catch((err) => console.error(err));

    }else{
      formData.append('values',JSON.stringify(values))
      formData.append('username',plainUsername)
      formData.append('signType',plainsignType)
      fetch('/completeRegister', {
          method: "POST",
          body: formData
      })
      .then((res) => res.json())
      .then((response) => {
        setIsRegistering(false)
        if(response.apiStatus === true && response.changedValues === true){
          createTokenProfile(plainUsername)
        }else{
          console.error('İşlem gerçekleştirilemiyor.')
        }
      })
      .catch((err) => console.error(err));
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }
  
  
  return (
    <>
    {isRegistering ? (
      <Loader title='Son işlemler yapılıyor..'/>
    ) 
    : 
    (
    <>
    { plainsignType === 'Email' ? (
      <div>
        <h1>Çok az kaldı.. <span className="greeting">{plainRealName}</span></h1>
        <form onSubmit={finishComplete}>
          <span>İstersen profil resmi ekleyebilirsin</span>
          <input type='file' onChange={handleFileChange}/>
          <button type='submit' >Profil Resmini Ekle</button>
        </form>
        <button type='submit' onClick={skipComplete}>Şimdilik Geç</button>
      </div>
    ) : (
      <div>
        <h1>Son düzenlemeler.. <span className="greeting">{plainRealName}</span></h1>
      <form>
        <span>Sınıf</span>
        <input type='text' name='userEducation' onChange={handleChange}/> 1
        
        <span>Okul</span>
        <input type='text' name='school' onChange={handleChange}/> 1

        <span>İl</span>
        <input type='text' name='userProvince' onChange={handleChange}/>1

        
        <span>Python</span>
        <input type='text' name='userPython' onChange={handleChange}/> 2

        
        <span>Şifre eklemek, sonrasında hesabın kaybolması durumunda yardımcı olur.</span> 3
        <input type='password' name='password' onChange={handleChange}/> 
        <button onClick={skipComplete}>Şimdilik Geç</button>

        <button type='submit' onClick={finishComplete}>Kaydet</button>
      </form>
        
        <h4>Sayfa <span className="activePage">1</span> / 3 </h4>
      </div>

    )}
    </>
    )}
    </>
    
  )
}

export default RegisterComplete