import React from 'react'
import { useState } from 'react'
import { QrReader } from 'react-qr-reader';
import './qrScanner.css'

const QRScanner = () => {
  const [scanResultFile, setScanResultFile] = useState('')
  const [startQrReader, setStartQrReader] = useState(false)

  const handleClick = () => {
    setStartQrReader(true)
  }

  return (
    <div className='qrArea'>
      {startQrReader ? (
          <div className="qr">
            <QrReader
              onResult={(result, error) => {
                if (result) {
                  window.open(result.text,'_self')
                }
              }}
              
            />
          </div>
        
      ) : (
        <div onClick={handleClick} className='qrButtonDiv'>
          <img src='/assest/img/GeneralIcons/QRScan.svg' alt='qrImage'/>
          <p>QR Kodu Okut</p>
        </div>

      )}
    </div>
  )
}

export default QRScanner
