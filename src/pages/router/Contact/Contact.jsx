import { useState } from 'react'
import React from 'react'
import Header from './../../partials/publicHeader/Header'
import './Contact.css'
import axios from 'axios'
import Loader from './../../partials/Loader'

const Contact = () => {
  const [isProcessing, setIsProcessing] = useState(false)
    const [contactValues, setContactValues] = useState({
        email : '',
        subject : '',
        content : ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactValues(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
    const handleSubmit = () => {
      setIsProcessing(true)
        axios.post('/setContact',{
          email : contactValues.email,
          subject : contactValues.subject,
          content : contactValues.content
        })
        .then((res) => {
          if(res.data.status === 1){
            console.log('Başarıyla gönderildi')
          }else{
            console.error('Bir hata oluştu')
            console.error(res.data.error)
          }
          setIsProcessing(false)
        }
        )
        .catch(err => console.error(err))
    }      
  return (
    <>
    {isProcessing ? (
      <>
      <Loader title={`Senin yorumunu özenle kendimize ayırıyoruz..`}/>
      </>
    ) : (
      <>
      <Header/>
      <div className="contact">
        <div className="title">Bize Ulaşın</div>
        <div className="contentFormArea">
            <input type='email' name='email' onChange={handleChange} placeholder='Email Gir'/>
            <input type='text' name='subject' onChange={handleChange} placeholder='Başlık Gir'/>
            <textarea name='content' onChange={handleChange} placeholder='Mesajını Gir'></textarea>
            
            <button onClick={handleSubmit}>Mesajı Gönder</button>
        </div>
      </div>
      </>
      
    )}
      
    </>
  )
}

export default Contact