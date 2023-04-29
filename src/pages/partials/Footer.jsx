import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import './Footer.css'
const Footer = () => {
  const [isOpened, setIsOpened] = useState(false)
  const handleOpen = () => {
    setIsOpened(true)
  }
  const handleClose = () => {
    setIsOpened(false)
  }
  return (
    <>
      {isOpened ? (
        <div className='FooterArea' onMouseLeave={handleClose} >
          <div className="rowLinks">
            <div className="column">
              <Link to={'/'}>Anasayfa</Link>
              <Link to={'/login'}>Giriş Yap</Link>
              <Link to={'/register'}>Kayıt Ol</Link>
            </div>
            <div className="column">
              <Link to={'/about'}>Hakkımızda</Link>
              <Link to={'/ourPoliticy'}>Politikalarımız</Link>
              <Link to={'/sitemap'}>Site Haritası</Link>
            </div>
            <div className="column">
              <Link to={'/searchProfile'}>
                <div className="linkButton">Profil Ara</div>
              </Link>
              <Link to={'/contact'}>
                <div className="linkButton">Bize Ulaşın</div>
              </Link>
            </div>
          </div>
          <div className="Codingo">Codingo © Tüm Hakları Saklıdır</div>
        </div>
    ) : (
      <div className="FooterAreaClosed" onMouseEnter={handleOpen} >
          <div className="Codingo">Codingo © Tüm Hakları Saklıdır</div>
          <img src='/assest/img/generalIcons/arrowUp.svg' alt='Footer Aç İconu' width={36}/>
      </div>
    )}
    </>
    
    
  )
}

export default Footer