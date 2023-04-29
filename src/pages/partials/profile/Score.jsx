import React from 'react'
import './Score.css'
const Score = (
    {imageSrc,scoreText}
) => {
  return (
    <div className='scoreItem'>
        <img src={imageSrc} className="scoreSVG" alt={scoreText}/>
        <div className="scoreText">{scoreText}</div>
    </div>
  )
}

export default Score