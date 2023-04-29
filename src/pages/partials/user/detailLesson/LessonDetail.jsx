import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import './LessonDetail.css'

const LessonDetail = ({lessonID,subject,lesClass,questionCount,lessonName,lesResult,lesDate}) => {
    const [lesson, setLesson] = useState({
        name : '',
        class : 0,
        count : 0,
        result : {
            isComplete : false,
            trueAnswerCount: 0,
            falseAnswerCount: 0,
            falseAnswers: '',
        },
        date : '',
        subject : ''
    })

    useEffect(() => {
        if(lessonName){
            let lessonNameValue = ''
            let isComplete;
            let formatted_date;
            let classStr;

            switch (lessonName) {
              case 'math':
                  lessonNameValue = 'Matematik'
                  classStr = lesClass + '. Sınıf'
                  break;
              case 'python':
                  lessonNameValue = 'Python'
                  switch (lesClass) {
                    case 1:
                        classStr = 'Kötü Seviye'
                        break;
                    case 2:
                        classStr = 'Orta Seviye'
                        break;
                    case 3:
                        classStr = 'İyi Seviye'
                        break;
                  
                    default:
                        break;
                  }
                  break;
                
              default:
                  break;
            }
            if(lesDate !== null){
                const date = new Date(lesDate);
                formatted_date = date.toLocaleDateString("tr-TR", {day: "numeric", month: "long", year: "numeric"});
            }else{
                formatted_date = ''
            }
            
            if(lesResult !== null){
                const values = JSON.parse(lesResult)
                setLesson({
                    name : lessonNameValue,
                    class : classStr,
                    count : questionCount,
                    result : {
                        isComplete: true,
                        trueAnswerCount: values.trueAnswerCount,
                        falseAnswerCount: values.falseAnswerCount,
                        falseAnswers: values.falseAnswers,
                    },
                    date : formatted_date,
                    subject : subject
                  })
            }else{
                setLesson({
                    name : lessonNameValue,
                    class : classStr,
                    count : questionCount,
                    result : {
                      isComplete : false
                    },
                    date : formatted_date,
                    subject : subject
                  })
            }
            
        }
      
    }, [])
    
  return (
    <>
        <div className="lesson">
            <div className="left">
                <div className="nameArea">
                    <div id="for">Ders Adı</div>
                    <div className="parameter">{lesson.name}</div>
                </div>
                <div className="subjectArea">
                    <div id="for">Ders Konusu</div>
                    <div className='parameter'>{lesson.subject}</div>
                </div>
                <div className="classArea">{lesson.class}</div>
            </div>
            
            <div className="right">
                <div className="questionCountArea">Bu derste <span>{lesson.count}</span> adet soru vardır.</div>
                {lesson.result.isComplete ? (
                    <>
                        <div id="percentTrue">
                            <img src='/assest/img/userIcons/detail_infoGreen.svg' alt='Bilgi Görseli'/>
                            <span>{(lesson.result.trueAnswerCount)/(lesson.count)*100}%</span> Doğruluk Oranı 
                        </div>
                        <div id='dateStr'>Yapılma Tarihi : {lesson.date}</div>
                    </>
                ) : (
                    <>
                        <div id='noWork'>
                            <img src='/assest/img/userIcons/detail_infoRed.svg' alt='Uyarı Görseli'/>
                            <span>Bu ders işlenmedi</span>
                        </div>
                        <Link to={`/lesson?lessonName=${lessonName}&lessonNumber=${lessonID}`}>Bu dersi yap</Link>
                    </>
                )}
            </div>
            
        </div>
    </>
  )
}
export default LessonDetail