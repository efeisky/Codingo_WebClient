import React from 'react'
import Actions from './actions'
const ActionButton = ({realName,username}) => {
  return (
    <div className='Buttons'>
          <Actions hasText={1} buttonStyles={{
            bgDark: true,
            fgColor: '#ffffff',
            bgColor: '#3ACD7E',
            hColor: '#38B571',
            border: false
          }}
          buttonText="Anasayfa'ya Dön"
          iconSrc='/assest/img/buttonIcons/Home.svg'
          buttonID='homepage'
          action={`/`}
          />
          <Actions hasText={1} buttonStyles={{
            bgDark: true,
            fgColor: '#ffffff',
            bgColor: '#6C63FF',
            hColor: '#554BF4',
            border: false
          }}
          buttonText={`${realName} ile Konuş`}
          iconSrc='/assest/img/buttonIcons/Chat.svg'
          buttonID='chat'
          action={`/chat?username=${username}`}
          />
          <Actions hasText={1} buttonStyles={{
            bgDark: true,
            fgColor: '#ffffff',
            bgColor: '#EA4335',
            hColor: '#C92D20',
            border: false
          }}
          buttonText={`Profili Beğen`}
          iconSrc='/assest/img/buttonIcons/Heart.svg'
          buttonID='like'
          action={`/actions/likeProfile?username=${username}`}
          />
          <Actions hasText={1} buttonStyles={{
            bgDark: false,
            fgColor: '#EAAF03',
            hFgColor: '#FFFFFF',
            bgColor: 'rgba(234,175,3,.1)',
            hColor: '#EAAF03',
            border: '.5px dashed #EAAF03',
            hBorder: '.5px dashed #D29E04'
          }}
          buttonText={`Takip Et`}
          iconSrc='/assest/img/buttonIcons/Follow.svg'
          hIconSrc='/assest/img/buttonIcons/FollowHover.svg'
          buttonID='follow'
          action={`/actions/followProfile?username=${username}`}
          />
          <Actions hasText={1} buttonStyles={{
            bgDark: true,
            fgColor: '#FFFFFF',
            bgColor: '#232323',
            hColor: '#232323',
            border: false,
          }}
          buttonText={`Şikayet Et`}
          iconSrc='/assest/img/buttonIcons/Report.svg'
          buttonID='Report'
          action={`/actions/reportProfile?username=${username}`}
          />
    </div>
  )
}

export default ActionButton