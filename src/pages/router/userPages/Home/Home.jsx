import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
import { getUserPages,decrypt } from '../getUserPages';

import Loader from '../../../partials/Loader';
import UserpageHeaders from '../../../partials/user/userpageHeaders';
import ShowLesson from '../../../partials/user/mainpage/ShowLesson';

const Home = () => {
    const {usernameParam} = useParams()
    let isAuth=false;
    const [isUploading, setIsUploading] = useState(true)
    const [headerData, setHeaderData] = useState({
      photoUrl:'',
      userScore:'',
      eduLevel:'',
      username : ''
    })
    const [lessonData, setLessonData] = useState({
      mathNumber : 0,
      mathSubject : '',
      pythonNumber : 0,
      pythonSubject : ''
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
      getUserPages(plainUsername,'lessonRequest')
      .then(data => {
        setIsUploading(false)
        setHeaderData(data.hd)
        setLessonData(data.ld)
      })
      .catch(err => console.error(err));
    }, [])
    
  return (
    <>
      {isAuth ? (
        <>
        {
          isUploading ? (
            <Loader title='Hesaplamalar Yapılıyor..'/>
          ) : (
            <>
              <UserpageHeaders {...headerData}/>
              <ShowLesson lesson='math' activeLessonNo={lessonData.mathNumber} lessonSubject={lessonData.mathSubject}/>
              <ShowLesson lesson='python' activeLessonNo={lessonData.pythonNumber} lessonSubject={lessonData.pythonSubject}/>
              <div className="chartArea">
                <span>{}</span>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
              </div>
            </>
          )
        }
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default Home