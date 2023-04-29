import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const GlobalOrder = ({nowUsername,realname,username,score,picture}) => {

    const [bgColor, setBgColor] = useState('#FFFFFF')
    useEffect(() => {
      if(nowUsername === username){
        setBgColor('rgba(58, 205, 126,10%)')
      }else{
        setBgColor('#FFFFFF')
      }
    }, [])
    
  return (
    <div className='user' style={{backgroundColor: bgColor}}>
        <div className="left">
            <img src={picture} alt='Profil Fotoğrafı'/>
            <div className="nameArea">
                <div className="realname">{realname}</div>
                <Link to={`/${username}/profile`} className="username">@{username}</Link>
            </div>
        </div>
        
        <div className="score">{score} puan</div>
    </div>
    
  )
}

export default GlobalOrder