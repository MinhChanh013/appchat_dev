import React from 'react'

// Component
import CAvatar from "@common/components/controls/CAvatar"
import CSlider from '@common/components/others/CSlider'
import CAutocomplete from '@common/components/controls/CAutocomplete'
// images
import person1 from "@common/assets/images/person1.png"
import person2 from "@common/assets/images/person2.png"
import person3 from "@common/assets/images/person3.png"
import person4 from "@common/assets/images/person4.png"
// icon
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import "../assets/ChatAll.scss"

const ChatAll = () => {
  return (
    <div className='chatall'>
      <div className="chatall-container">
        <div className="chatall-container__contact">
          <CSlider data={[<CAvatar image={person1} />,
          <CAvatar image={person2} />,
          <CAvatar image={person3} />,
          <CAvatar image={person4} />,
          <CAvatar image={person1} />,
          <CAvatar image={person2} />,
          <CAvatar image={person3} />,
          <CAvatar image={person4} />,
          ]} />
        </div>
        <div className="chatall-container__mess">
          <div className="chatall-mess__header">
            <div className="chattall-header__title">
              <div className="chattall-title__info">
                <h3>Messages</h3> <span>48 New</span>
              </div>
              <div className="chatall-title__function">
                <PersonAddAlt1Icon />
                <GroupAddIcon />
              </div>
            </div>
            <div className="chattall-header__search">
              <CAutocomplete label="Search" data={[]} />
            </div>
          </div>
          <div className="chatall-mess__main">
            <div className="chatall-main__pin">

            </div>
            <div className="chatall-main__all">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatAll