import axios from 'axios';
import React from 'react'
import { useState,useEffect } from 'react';
import OtpInput from 'react-otp-input';
import CryptoJS from 'crypto-js'

function ForgetPassword() {
  const [email, setEmail] = useState('')
  const [remainingTime, setRemainingTime] = useState({
    minute : 0,
    second : 0
  })
  const [isWriting, setIsWriting] = useState(true)
  const [otp, setOtp] = useState('');
  const [myOtp, setMyOtp] = useState('')
  const createOTPNumber = async () => {
    let selectedOtp = Math.floor(100000 + Math.random() * 900000)
    setMyOtp(selectedOtp.toString())
    return selectedOtp.toString();
  }
  const sendCode = async () => {
    var countDownTime = 5 * 60;
    const myOTP = await createOTPNumber();
    axios.post('/forgetPass',{
      email,
      myOTP
    })
    .then((res)=> {
      setIsWriting(false)
    })
    .catch(err => console.error(err))
    const remainedTime = setInterval(() => {
      var minutes = Math.floor(countDownTime / 60);
      var seconds = countDownTime % 60;

      setRemainingTime({
        minute: minutes,
        second: seconds
      })

      if (countDownTime <= 0) {
          clearInterval(remainedTime);
          setMyOtp('')
          window.open('/forgetPassword','_self')
      }
      countDownTime--;
    }, 1000);
    
  }
  const getIPAddress = async () => {
    const { RTCPeerConnection, RTCSessionDescription } = window;
    const pc = new RTCPeerConnection({ iceServers: [] });
    const offer = await pc.createOffer();
    await pc.setLocalDescription(new RTCSessionDescription(offer));
  
    const regex = /\d+\.\d+\.\d+\.\d+/;
    const ipAddress = regex.exec(pc.localDescription.sdp)[0];
    
    return ipAddress;
  }
  
  const setParams = async({email}) => {
    const params = new URLSearchParams()
    const secretKey = CryptoJS.lib.WordArray.random(1024).toString(CryptoJS.enc.Hex)
    const dateString = new Date().toLocaleString()
    let minuteExpire = (parseInt(dateString.split(' ')[1].split(':')[1].split(':')[0]) + 10);
    let secondExpire = (parseInt(dateString.slice(-2)));
    let hourExpire = (parseInt(dateString.split(' ')[1].split(':')[0]));
    if(minuteExpire >= 60){
      hourExpire = Math.floor(minuteExpire / 60) + hourExpire
      minuteExpire = minuteExpire % 60
    }
    if(minuteExpire.toString().length === 1){
      minuteExpire = `0${minuteExpire}`
    }
    if(hourExpire.toString().length === 1){
      hourExpire = `0${hourExpire}`
    }
    
    let date = dateString.split(' ')[0]
    const fullDate = `${date} ${hourExpire}:${minuteExpire}:${secondExpire}`
    const ip = await getIPAddress()
    
    params.append('email',CryptoJS.AES.encrypt(email, secretKey))
    params.append('authCond',secretKey + '.' + CryptoJS.SHA512('authConnected').toString(CryptoJS.enc.Hex))
    params.append('userIp',CryptoJS.AES.encrypt(ip, secretKey))
    params.append('expired-time',CryptoJS.AES.encrypt(fullDate, secretKey))
    window.open(`/forgetPassword/resetPass?${params.toString()}`,'_self')
  }
  useEffect(() => {
    if(otp.length === 6){
      if(otp === myOtp){
        setParams({email})
      }else{
        console.log('yanlış')
      }
    }
  }, [otp])
  
  return (
    <>
      {
        isWriting ? (
          <>
            <input type='email' className='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" onClick={sendCode}>Onay kodu gönder</button>
            
          </>
        ) : (
          <>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
            />
            <span>{remainingTime.minute + '.' + remainingTime.second}</span>
          </>
            
        )
      }
        
    </>
  )
}

export default ForgetPassword