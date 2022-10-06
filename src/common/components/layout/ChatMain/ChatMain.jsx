import React, { useState, useEffect } from 'react'
// components
import CAvatar from "@common/components/controls/CAvatar"
import CIconButton from '@common/components/controls/CIconButton';
import InputEmoji from 'react-input-emoji'
import ChatSetting from './components/ChatSetting';
import ItemChat from './components/ItemChat';
// icon
import BrushIcon from '@mui/icons-material/Brush';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import SendIcon from '@mui/icons-material/Send';

import { IoImagesOutline, IoTimeOutline, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineIdcard } from "react-icons/ai";
import { BsTextareaT } from "react-icons/bs";

import person3 from "@common/assets/images/person3.png"
import avatar from "@common/assets/images/avatar.jpg"
import "../../../assets/styles/layout/ChatMain.scss"
const ChatMain = () => {
  useEffect(() => {
    // document.querySelector(".chat-show__container").scrollIntoView({ behavior: "smooth" })
  }, [])

  const [text, setText] = useState('')
  const [isopen, setIsOpen] = useState(true)

  function handleOnEnter(text) {
  }

  const data_Chat = [
    {
      avatar: person3,
      mess: "i saw create ui design and i want to share with you guys",
      time: "04:41",
      name: "Milad Ghanbari"
    },
    {
      avatar: avatar,
      mess: "Hello Everyone, GOOD NEWS!!!",
      time: "04:42",
      name: "You"
    },
    {
      avatar: person3,
      mess: "Hey guys! what youdoing i just finish duxica ui design project",
      time: "04:45",
      name: "Milad Ghanbari"
    },
    {
      avatar: person3,
      mess: "i saw create ui design and i want to share with you guys",
      time: "04:50",
      name: "Milad Ghanbari"
    },
    {
      avatar: person3,
      mess: "i saw create ui design and i want to share with you guys",
      time: "04:55",
      name: "Milad Ghanbari"
    },
    {
      avatar: avatar,
      mess: "Hello Everyone, GOOD NEWS!!!",
      time: "05:02",
      name: "You"
    },
    {
      avatar: person3,
      mess: "Hey guys! what youdoing i just finish duxica ui design project",
      time: "05:10",
      name: "Milad Ghanbari"
    },
    {
      avatar: person3,
      mess: "i saw create ui design and i want to share with you guys",
      time: "05:10",
      name: "Milad Ghanbari"
    },
    {
      avatar: person3,
      mess: "Hey guys! what youdoing i just finish duxica ui design project",
      time: "05:20",
      name: "Milad Ghanbari"
    },
  ]
  return (
    <div className='chatmain'>
      <div className="chatmain-container">
        <div className="chatmain-container__header">
          <div className="chatmain-header__infor">
            <CAvatar image="" />
            <div className="chatmain-infor__content">
              <div className="chatmain-content__name">
                <h3>Duxica Team</h3>
                <BrushIcon />
              </div>
              <div className="chatmain-content__status">
                <Brightness1Icon />
                <span>Truy cập 1 giờ trước</span>
              </div>
            </div>
          </div>
          <div className="chatmain-header__function">
            <CIconButton icon={<GroupAddOutlinedIcon />} />
            <CIconButton icon={<VideocamOutlinedIcon />} />
            <CIconButton className={`setting-chat ${isopen ? "active" : ""}`} icon={<GridViewIcon />} onclick={() => {
              setIsOpen(!isopen)
              console.log(isopen);
            }} />
          </div>
        </div>
        <div className="chatmain-container__main">
          <div className="chatmain-main__show">
            <div className="chat-show__container">

              {data_Chat.reverse().map((course, index) => (
                course.name === "You" ? <div className="chat-container__me">
                  <ItemChat avatar={course.avatar} mess={course.mess} time={course.time} name={course.name} person />
                </div>
                  :
                  <div className="chat-container__friend">
                    <ItemChat avatar={course.avatar} mess={course.mess} time={course.time} name={course.name} />
                  </div>
              ))}
            </div>
          </div>
          <div className="chatmain-main__type">
            <div className="chatmain-type__function">
              <CIconButton icon={<IoImagesOutline />} />
              <CIconButton icon={<IoTimeOutline />} />
              <CIconButton icon={<AiOutlineIdcard />} />
              <CIconButton icon={<BsTextareaT />} />
              <CIconButton icon={<IoSettingsOutline />} />

            </div>
            <div className='chatmain-type__main'>
              <CAvatar image={avatar} />
              <div className='chatmain-type__input'>
                <InputEmoji
                  value={text}
                  onChange={setText}
                  cleanOnEnter
                  onEnter={handleOnEnter}
                  placeholder="Type a message ... "
                />
                <CIconButton className="type-attach" icon={<AttachmentOutlinedIcon />} />
                <CIconButton className="type-send" icon={<SendIcon />} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatSetting isopen={isopen} />
    </div>
  )
}

export default ChatMain