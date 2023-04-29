import React,{useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios';


import Loader from './../../../partials/Loader'
import HeaderProfile from '../../../partials/profile/header';
import Header from '../../../partials/publicHeader/Header';
import ActionButton from '../../../partials/profile/ActionButton';
import Biography from '../../../partials/profile/Biography';
import Score from '../../../partials/profile/Score';

const Profile = () => {
  const [profileValues, setProfileValues] = useState({
    realName : '',
    username : '',
    school : '',
    province : '',
    picture : '',
    score : '',
    eduLevel : '',
    pythonLevel : '',
    mathLessonNo : '',
    pythonLessonNo : '',
    biographyTitle : '',
    biographyContent : ''
  })
  const [isUploading, setIsUploading] = useState(true)
  const location = useLocation()
  const url = window.location.origin + decodeURIComponent(location.pathname)
  useEffect(() => {
    const urlLog = window.location.href;
    const regex = /\/([^\/]+)\/profile/;
    const match = urlLog.match(regex);
    const username = match[1]
    axios.get('/profileByUsername',{
      params: {
        username : decodeURIComponent(username)
      }
    })
    .then((res)=> {
      const data = res.data.formattedData;
      setIsUploading(false)
      if(res.data.processResult === 1){
        if(data === 'Unknown User'){
          console.log('Bu kişi bulunamadı')
        }else{
          setProfileValues(data)
          console.log(data)
        }
      }else{
        console.log('Bir hata oluştu. Lütfen sonra deneyiniz')
      }
    })
  }, [])
  
  return (
    <>
      {isUploading ? (
        <Loader title={'Profil Açılıyor..'}/>
      ) : (
        <>
        <Header/>
        <HeaderProfile 
          pictureNameAndSecure={{
            pictureSrc: profileValues.picture,
            pictureShape: false,
            pictureSize: 150,
            realName: profileValues.realName,
            userName: profileValues.username,
            secureStatus: true
          }}
          qrCode={{
            isPhone: false,
            url,
            qrSize: 150
          }}
        />
        <ActionButton {...profileValues}/>
        <Biography title={profileValues.biographyTitle} content={profileValues.biographyContent}/>
        <div className="scoreArea">
          <Score scoreText={`${profileValues.score} puan`} imageSrc={'/assest/img/ScoreIcons/Score.svg'}/>
          <Score scoreText={`184 beğeni`} imageSrc={'/assest/img/ScoreIcons/LikeCount.svg'}/>
          <Score scoreText={`Doğan Cüceloğlu Fen Lisesi Okulunda 10. Sırada`} imageSrc={'/assest/img/ScoreIcons/ChartYellow.svg'}/>
          <Score scoreText={`İstanbul İlinde 10. Sırada`} imageSrc={'/assest/img/ScoreIcons/ChartPurple.svg'}/>
          <Score scoreText={`Son 10 günde 120 puan`} imageSrc={'/assest/img/ScoreIcons/Activity.svg'}/>
        </div>
      </>
      )}

      
    </>
  )
}


export default Profile