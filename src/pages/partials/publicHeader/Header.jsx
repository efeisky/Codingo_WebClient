import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import { decrypt } from '../../router/userPages/getUserPages'
import './Header.css'

const Header = () => {
  const [isRegistered, setIsRegistered] = useState(false)
  const [username, setUsername] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('token_profile'))
    if(data){
      const secretKey = data.authProperty;
      const plainUsername = decrypt(data.secretUsername,secretKey)
      setUsername(plainUsername)
      setIsRegistered(true)

    }else{
      setIsRegistered(false)
    }
  }, [])
  const handleQuit = () => {
    window.localStorage.removeItem('token_profile')
    window.open('/','_self')
  }
  return (
    <div className='Header'>
      <Link to={'/'} className="logoAndNamePart">
        <img src={`/favicon.ico`} alt="Şirket Logosu" className="logo" />
        <p>Codingo</p>
      </Link>
      <div className="actionPart">
        {isRegistered ? (
          <>
            <div className="nameMenu" onMouseEnter={()=>{setIsHovered(true)}} onMouseLeave={()=>{setIsHovered(false)}}>
              <div id="name">{username}</div>
              <img src='/assest/img/GeneralIcons/ArrowDown.svg' alt='altOk'/>
              <div className="menu" style={{display: isHovered ? 'flex' : 'none'}}>
                <Link to={`/${username}`}>Anasayfa</Link>
                <Link to={`/${username}/setting`}>Ayarlar</Link>
                <Link to={`/${username}/nots`}>Notlarım</Link>
                <Link to={`/${username}/order`}>Sıralamam</Link>
                <button onClick={handleQuit}>Çıkış Yap</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to={`/login`} id='noAuth'>Giriş Yap</Link>
            <Link to={`/register`} id='registerA'>Kayıt Ol</Link>
          </>
        )}
        
      </div>
    </div>
  )
}

export default Header