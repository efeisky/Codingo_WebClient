import React from 'react'
import { useEffect,useState } from 'react'
import CryptoJS from 'crypto-js'
import axios from 'axios'

function ResetPassword() {

  const [params, setParams] = useState({})

  const [values, setValues] = useState({
    password : '',
    repeatPassword : ''
  })
  
  const [userValues, setUserValues] = useState({
    email : '',
    expiredTime : '',
    ıp : ''
  })

  const handleChange = (e) => setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramsObj = Object.fromEntries(searchParams.entries());
    setParams({...paramsObj})
  }, [])
  
  const getUserDetails = (email,auth,{userIp,expiredTime}) => {
    const decrypt = (cipherText,key) => {
      const bytes = CryptoJS.AES.decrypt(cipherText, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    }

    const temporaryKey = auth.split('.')[0]

    const plainEmail = decrypt(email,temporaryKey)
    const plainIp = decrypt(userIp,temporaryKey)
    const plainExpired = decrypt(expiredTime,temporaryKey)
    setUserValues({
      email : plainEmail,
      expiredTime : plainExpired,
      ıp : plainIp
    })
  }

  useEffect(() => {
    if('userIp' in params && 'email' in params && 'authCond' in params && 'expired-time' in params){
      getUserDetails(params.email,params.authCond,{
        userIp : params['userIp'],
        expiredTime : params['expired-time']
      })
    }
    return;
  
  }, [params])
  
  const controlIpAdress = async () => {
    const { RTCPeerConnection, RTCSessionDescription } = window;
    const pc = new RTCPeerConnection({ iceServers: [] });
    const offer = await pc.createOffer();
    await pc.setLocalDescription(new RTCSessionDescription(offer));
  
    const regex = /\d+\.\d+\.\d+\.\d+/;
    const ipAddress = regex.exec(pc.localDescription.sdp)[0];
    
    return ipAddress;
  }

  const resetPassProcess = (requestPassword,expired) => {
    const dateStr = new Date().toLocaleString();
    if(dateStr < expired){
      axios.put('/resetPassword',{
        email : userValues.email,
        requestPassword : values.password
      })
      .then(res => {
        const status = res.data.status;
        if (status === 'Succesfully') {
          window.open('/login','_self');
        } else {
          console.error('Sistemde bir hata oluştu.');
        }
      })
      .catch((err) => console.error(err));      
    }else{
      alert('Zaman Aşımı Hatası')
      window.open('/','_self')
    }
  }

  const handleResetPass = async () => {
    if(values.password === values.repeatPassword){
      if(userValues.email === ''){
        console.log('Biraz bekleyiniz')
      }else{
        const checkIp = await controlIpAdress()
        if(checkIp === userValues.ıp){
          resetPassProcess(values.password,userValues.expiredTime)
        }else{
          alert('Sistem Hatası - Lütfen daha sonra tekrar deneyin')
          window.open('/','_self')
        }
      }
      
    }else{
      console.log('uyuşmayan şifreler')
    }
  }
  return (
    <div>
          <input type='password' name='password' onChange={handleChange}/> 
          <input type='password' name='repeatPassword' onChange={handleChange}/> 
          <button type="submit" onClick={handleResetPass}>Şifreyi Değiştir</button>
    </div>
  )
}

export default ResetPassword