import React,{useState,useEffect} from 'react'
import './Actions.css'
const Actions = ({hasText,buttonStyles:{
    bgDark,
    fgColor,
    hFgColor,
    bgColor,
    hColor,
    border,
    hBorder
  },
  buttonText,iconSrc,hIconSrc,buttonID,action
  
}) => {

  const [imageSrc, setImageSrc] = useState('')
  useEffect(() => {
    setImageSrc(iconSrc)
  }, [])
  
  const bgDarkEnter = () => {
    document.querySelector(`#${buttonID}`).style.backgroundColor = hColor
  };

  const bgDarkLeave = () => {
    document.querySelector(`#${buttonID}`).style.backgroundColor = bgColor
  };

  const bgLightEnter = () => {
    document.querySelector(`#${buttonID}`).style.backgroundColor = hColor
    document.querySelector(`#${buttonID}`).style.color = hFgColor
    document.querySelector(`#${buttonID}`).style.border = hBorder
    setImageSrc(hIconSrc)
  };

  const bgLightLeave = () => {
    document.querySelector(`#${buttonID}`).style.backgroundColor = bgColor
    document.querySelector(`#${buttonID}`).style.color = fgColor
    document.querySelector(`#${buttonID}`).style.border = border
    setImageSrc(iconSrc)
  };

  const handleClick = () => {
    window.open(action,'_self')
  }
  return (
    <>
      {bgDark ? (
        <div className='actionButton' style={{
          backgroundColor: bgColor,
          color: fgColor
        }} onMouseEnter={bgDarkEnter} onMouseLeave={bgDarkLeave} onClick={handleClick}
        id={buttonID}>
          {hasText ? (
            <>
              <div className="buttonIcon">
                <img src={iconSrc}/>
              </div>
              <div className="buttonText">{buttonText}</div>

            </>
          ) : (
            <>
              <div className="buttonIcon">
                <img src={iconSrc}/>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className='actionButton' style={{
          backgroundColor: bgColor,
          color: fgColor,
          border: border
        }} onMouseEnter={bgLightEnter} onMouseLeave={bgLightLeave} onClick={handleClick}
        id={buttonID}>
          {hasText ? (
            <>
              <div className="buttonIcon">
                <img src={imageSrc}/>
              </div>
              <div className="buttonText">{buttonText}</div>

            </>
          ) : (
            <>
              <div className="buttonIcon">
                <img src={imageSrc}/>
              </div>
            </>
          )}
        </div>
      )}
    </>
    
  )
}

export default Actions