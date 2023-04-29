import React from 'react'
import { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import './showLesson.css'
function ShowLesson({lesson,lessonSubject,activeLessonNo}) {
  const [lessonInfo, setLessonInfo] = useState({
    name : '',
    src : '',
    subject : '',
    activeNo : 0
  })
  useEffect(() => {
    let src = `/assest/img/userIcons/home_${lesson}.png`;
    let value;
    switch (lesson) {
      case 'math':
        value = 'Matematik';
        break;
      case 'python':
        value = 'Python';
        break;

      default:
        break;
    }
    setLessonInfo({
      name : value,
      src,
      subject : lessonSubject,
      activeNo : activeLessonNo
    })
  }, [])
  
  return (
    <div className='lessonMain'>
      <div className="infoArea">
        <div>
          <div id="shortInfo">Ders Adı</div>
          <div id="longInfo">{lessonInfo.name}</div>
        </div>
        <div>
          <div id="shortInfo">Mevcut Ders Konusu</div>
          <div id="longInfo">{lessonInfo.subject}</div>
        </div>
      </div>
      <div className="imgArea">
        <img src={lessonInfo.src} alt={lesson+' görseli'}/>
      </div>
      <div className="linkArea">
        <Link to={`./detailLesson?lessonName=${lesson}`}>
          <button>Ders Detayına Git</button>
        </Link>
        <Link to={`/lesson?lessonName=${lesson}&lessonNumber=${activeLessonNo}`}>
          <button>Derse Git</button>
        </Link>
        <Link to={`/practice?lessonName=${lesson}`}>
          <button>Pratik Yap</button>
        </Link>
      </div>
        
    </div>
  )
}

export default ShowLesson