import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
import UserpageHeaders from '../../../partials/user/userpageHeaders';
import { getUserPages,decrypt } from '../getUserPages';
import Loader from '../../../partials/Loader';
const Setting = () => {
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
    
    useEffect(() => {
      getUserPages(plainUsername)
      .then(data => {
        setIsUploading(false)
        setHeaderData(data.hd)
      })
      .catch(err => console.error(err));
    }, [])

  return (
    
    <>
      {isAuth ? (
        <>
        {isUploading ? (
            <Loader title='Bilgilerin Getiriliyor..'/>
        ) : (
          <>
            <UserpageHeaders {...headerData}/>
          </>
        )}
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default Setting