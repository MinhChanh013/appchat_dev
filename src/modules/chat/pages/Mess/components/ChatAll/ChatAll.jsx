import React from 'react'

// Component
import CAvatar from "@common/components/controls/CAvatar"
import CSlider from '@common/components/others/CSlider'
import CAutocomplete from '@common/components/controls/CAutocomplete'
import BackgroundIcon from '@common/components/others/BackgroundIcon'
import CardMess from './components/CardMess'
// images
import person1 from "@common/assets/images/person1.png"
import person2 from "@common/assets/images/person2.png"
import person3 from "@common/assets/images/person3.png"
import person4 from "@common/assets/images/person4.png"
// icon
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import TelegramIcon from '@mui/icons-material/Telegram';

import "../../assets/ChatAll.scss"

const ChatAll = () => {
  return (
    <div className='chatall'>
      <div className="chatall-container">
        <div className="chatall-container__contact">
          <CSlider data={[
            <CAvatar border image={person1} />,
            <CAvatar border image={person2} />,
            <CAvatar border image={person3} />,
            <CAvatar border image={person4} />,
            <CAvatar border image={person1} />,
            <CAvatar border image={person2} />,
            <CAvatar border image={person3} />,
            <CAvatar border image={person4} />,
          ]} />
        </div>
        <div className="chatall-container__mess">
          <div className="chatall-mess__header">
            <div className="chattall-header__title">
              <div className="chattall-title__info">
                <h3>Messages</h3> <span className='chatall-info__number'>48 <span>New</span></span>
              </div>
              <div className="chatall-title__function">
                <BackgroundIcon />
                <PersonAddAlt1Icon />
                <GroupAddIcon />
              </div>
            </div>
            <div className="chattall-header__search">
              <CAutocomplete placeholder="Search" data={[]} />
            </div>
          </div>
          <div className="chatall-mess__main">
            <div className="chatall-main__pin">
              <div className="chatall-pin__header"><GolfCourseIcon /><span>PIN CHATS</span></div>
              <div className="chatall-pin__main">
                <CardMess />
                <CardMess />
                <CardMess />
                <CardMess />
                <CardMess />
              </div>
            </div>
            <div className="chatall-main__all">
              <div className="chatall-pin__header"><TelegramIcon /><span>ALL MESSAGES</span></div>
              <div className="chatall-pin__main">
                <CardMess />
                <CardMess />
                <CardMess />
                <CardMess />
                <CardMess />
                <CardMess />
                <CardMess />
                <CardMess />
                <CardMess />
                <CardMess />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatAll