import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
import UserpageHeaders from '../../../partials/user/userpageHeaders';
import { getUserPages,decrypt } from '../getUserPages';
import Loader from '../../../partials/Loader';
import axios from 'axios';
import GlobalOrder from '../../../partials/user/order/GlobalOrder';
import './order.css'

const Order = () => {

    const {usernameParam} = useParams()
    let isAuth=false;
    const [isUploading, setIsUploading] = useState(true)
    const [headerData, setHeaderData] = useState({
      photoUrl:'',
      userScore:'',
      eduLevel:'',
      username : ''
    })
    let secretKey,plainUsername;
    try {
      const localData = JSON.parse(window.localStorage.getItem('token_profile'));
      secretKey = localData.authProperty;
      plainUsername = decrypt(localData.secretUsername,secretKey)
      isAuth = true;
    } catch (err) {
      console.error(err)
      window.open(`/${usernameParam}/profile`,'_self')
    }

    const [globalResult, setGlobalResult] = useState([])
    const [localResult, setLocalResult] = useState([])

    const [selectedResult, setSelectedResult] = useState(1)

    useEffect(() => {
      getUserPages(plainUsername)
      .then(data => {
        setIsUploading(false)
        setHeaderData(data.hd)
      })
      .catch(err => console.error(err));
    }, [])
    
    useEffect(() => {
      if(selectedResult){
        axios.get('/getOrder',{
          params:{
            username : plainUsername,
            type:'local'
          }})
        .then(res => {
            if(res.data.status){
              setLocalResult([...res.data.result])
            }else{
              console.error('Bir hata oluştu..')
            }
          })
        .catch(err => console.error(err))
      }else{
        axios.get('/getOrder',{
          params:{
            username : plainUsername,
            type:'global'
          }})
        .then(res => {
            if(res.data.status){
              setGlobalResult([...res.data.result])
            }else{
              console.error('Bir hata oluştu..')
            }
          })
        .catch(err => console.error(err))
      }
      
    }, [selectedResult])
    
    const handleChange = () => {
      if(selectedResult){
        setSelectedResult(0)
      }else{
        setSelectedResult(1)
      }
    }
  return (
    <>
    {isAuth ? (
      <>
      {isUploading ? (
          <Loader title='Bilgilerin Getiriliyor..'/>
      ) : (
        <>
          <UserpageHeaders {...headerData}/>
          <div className="users">
          <button className="changeMode" type='submit' onClick={handleChange}>Sıralama Modunu Değiştir</button>
            {selectedResult ? (
              <>
                <h1>Okul Çapında Sıralamam</h1>
                {localResult.map((item,key)=>(
                  <GlobalOrder nowUsername={plainUsername} username={item.username} realname={item.realName} score={item.userScore} picture={item.pictureSrc} key={key}/>
                ))}
              </>
            ) : (
              <>
                <h1>Uygulama Çapında Sıralamam</h1>
                {globalResult.map((item,key)=>(
                  <GlobalOrder nowUsername={plainUsername} username={item.username} realname={item.realName} score={item.userScore} picture={item.pictureSrc} key={key}/>
                ))}
              </>
            )}
            
          </div>
          
        </>
      )}
      </>
    ) : (
      <></>
    )}
  </>
  )
}

export default Order