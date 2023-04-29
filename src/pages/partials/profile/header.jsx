import React from 'react'
import QRCodeSVG from "qrcode.react";
import './Header.css'

import './Codingo_Title.png'

const HeaderProfile = ({
    pictureNameAndSecure:{
    pictureSrc,
    pictureShape,
    pictureSize,
    realName,
    userName,
    secureStatus
    },
    qrCode:{
    isPhone,
    url,
    qrSize
    }
}) => {
    const QRImageSize = parseInt(qrSize / 4)
  return (
    <div className='headerArea'>
        <div className="pictureNameAndSecure">
            <div className="picture" >
                {pictureShape ? (
                    <img src={pictureSrc} alt='Profil Resmi' id='Circle' style={{width:pictureSize}}/>
                ) : (
                    <img src={pictureSrc} alt='Profil Resmi' id='Square' style={{width:pictureSize}}/>
                )}
                
            </div>
            <div className="sideArea">
                <div className="names">
                    <div id="realName">{realName}</div>
                    <div id="userName">@{userName}</div>
                </div>
                <div className="secureStatus">
                    {secureStatus ? (
                        <img src='/assest/img/shieldDone.svg'/>
                    ) : (
                        <img src='/assest/img/shieldFail.svg'/>
                    )}
                </div>
            </div>
        </div>
        {isPhone ? (
            <>
            </>
        ) : (
                <QRCodeSVG
                    value={url}
                    size={qrSize}
                    bgColor={"#FFFFFF"}
                    fgColor={"#29AA65"}
                    style={{borderRadius: '2.5%'}}
                    level={"Q"}
                    includeMargin={false}
                    imageSettings={{
                        src: 'http://localhost:3000/static/media/Codingo_Title.b57b20e9a1997526da5c.png',
                        x: undefined,
                        y: undefined,
                        height: QRImageSize,
                        width: QRImageSize,
                        excavate: true,
                    }}
                />
        )}
    </div>
  )
}

export default HeaderProfile