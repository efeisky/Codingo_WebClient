import React from 'react'
import './Biography.css'
const Biography = ({title,content}) => {
  return (
    <div className='biographyArea'>
        <div className="title">{title}</div>
        <div className="content">{content}</div>
    </div>
  )
}

export default Biography