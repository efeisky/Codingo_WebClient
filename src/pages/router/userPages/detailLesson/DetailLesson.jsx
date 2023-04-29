import React,{useState,useEffect} from 'react'
import { useLocation } from "react-router-dom"
import Loader from '../../../partials/Loader';
import LessonDetail from '../../../partials/user/detailLesson/LessonDetail';
import axios from 'axios';
import { getUserPages,decrypt } from '../getUserPages';
import { useParams } from 'react-router-dom'
import UserpageHeaders from '../../../partials/user/userpageHeaders';

const DetailLesson = () => {
    const [params, setParams] = useState(null);
    const [lessonInfo, setLessonInfo] = useState(null);
    const [isUploading, setIsUploading] = useState(true)
    const location = useLocation();
    const {usernameParam} = useParams()
    const [lessonName, setLessonName] = useState('')

    let isAuth=false;
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
        setHeaderData(data.hd)
      })
      .catch(err => console.error(err));
    }, [])

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const value = queryParams.get('lessonName')
        setParams(value)
    }, [])
     
    const getLessonDetailsByLessonName = (lessonName) => {
        axios.get('/getLessonDetailsByLessonName',{
            params: {
                lessonName
            }
        })
        .then((res) => {
            setLessonInfo(res.data.lessonDatas)
            setIsUploading(false)
        })
    }

    useEffect(() => {
        if(params !== null){
            getLessonDetailsByLessonName(params)
            if(params === 'math'){
                setLessonName('Matematik Dersleri')
            }else{
                setLessonName('Python Dersleri')
            }
        }
    }, [params])

    
  return (
    <>
    {isAuth ? (
        <>
            
            {isUploading ? (
                <Loader title='Ders Detayı Alınıyor..'/>
            ) : (
                <>
                    <UserpageHeaders {...headerData}/>
                    <h1 id='lessonNameHeader'>{lessonName}</h1>
                    <div className="lessonArea">
                        {lessonInfo.map((item, index) => (
                            <LessonDetail lessonID={item.id} subject={item.Subject} lesClass={item.Class} questionCount={item.QuestionCount} lessonName={params} lesResult={item.lessonResult} lesDate={item.lessonDate} key={index}/>
                        ))}
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

export default DetailLesson