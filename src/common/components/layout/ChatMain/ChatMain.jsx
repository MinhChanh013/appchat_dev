import React, { useState, useEffect } from 'react'
// components
import CAvatar from "@common/components/controls/CAvatar"
import CIconButton from '@common/components/controls/CIconButton';
import InputEmoji from 'react-input-emoji'
import ChatSetting from './components/ChatSetting';
import ItemChat from './components/ItemChat';
import MeProfile from '../Profile/MeProfile/MeProfile';
import CModalRename from '../../controls/CModalRename';
import CModalAddTeam from '../../controls/CModalAddTeam';

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

// api
import { getProfile } from "@/apis/auth.api"
import { useQuery } from "@tanstack/react-query"

import person3 from "@common/assets/images/person3.png"
import avatar from "@common/assets/images/avatar.jpg"
import "../../../assets/styles/layout/ChatMain.scss"
import ScrollToBottom from 'react-scroll-to-bottom';
const ChatMain = ({ socket, room, dataRoom, dataFriend }) => {

  const { isLoading, data } = useQuery(['getUser'], () => {
    return getProfile()
  })

  const [text, setText] = useState('')
  const [isopen, setIsOpen] = useState(true)
  const [messageList, setMessageList] = useState([]);

  //  socket
  const handleOnEnter = async (text) => {
    if (text !== "") {
      const messageData = {
        avatar: person3,
        name: data && `${data.data.first_name} ${data.data.last_name}`,
        phone: data.data.phone,
        room: room,
        mess: text,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [messageData, ...list]);
      // setMessageList((list) => [...list, messageData]);
      setText("")
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.room === room) {
        setMessageList((list) => [data, ...list]);
        // setMessageList((list) => [...list, data]);
      }
    });
  }, [socket, room]);

  useEffect(() => {
    socket.emit("join_room", room);
  }, [room, socket])


  return (
    <div className='chatmain'>
      <div className="chatmain-container">
        <div className="chatmain-container__header">
          <div className="chatmain-header__infor">
            <MeProfile ><CAvatar image="" /> </MeProfile>

            <div className="chatmain-infor__content">
              <div className="chatmain-content__name">
                <h3>{dataFriend && dataFriend.name}</h3>
                <CModalRename>
                  <BrushIcon />
                </CModalRename>
              </div>
              <div className="chatmain-content__status">
                <Brightness1Icon />
                <span>Truy cập 1 giờ trước</span>
              </div>
            </div>
          </div>
          <div className="chatmain-header__function">
            <CModalAddTeam child={<CIconButton icon={<GroupAddOutlinedIcon />} />} />
            <CIconButton icon={<VideocamOutlinedIcon />} />
            <CIconButton className={`setting-chat ${isopen ? "active" : ""}`} icon={<GridViewIcon />} onclick={() => {
              setIsOpen(!isopen)
            }} />
          </div>
        </div>
        <div className="chatmain-container__main">
          <div className="chatmain-main__show">
            {/* <ScrollToBottom> */}
              <div className="chat-show__container">
                {messageList.map((course, index) => {
                  if (index + 1 === messageList.length) {
                    console.log(course.phone !== data.data.phone);
                    return (
                      !isLoading && course.phone === data.data.phone ? <div key={index} className="chat-container__me">
                        <ItemChat avatar={course.avatar} mess={course.mess} time={course.time} name="You" person />
                      </div>
                        :
                        <div key={index} className="chat-container__friend">
                          <ItemChat avatar={course.avatar} mess={course.mess} time={course.time} name={course.name} />
                        </div>
                    )
                  }
                  else {
                    const willChat = messageList[index + 1]
                    const timeWill = willChat.time.split(":")
                    const timePresent = course.time.split(":")
                    const hourWill = parseInt(timeWill[0])
                    const minutesWill = parseInt(timeWill[1])
                    const hourPresent = parseInt(timePresent[0])
                    const minutesPresent = parseInt(timePresent[1])
                    if (course.name === willChat.name) {
                      // console.log(hourWill, minutesWill, hourPresent, minutesPresent);
                      if (hourWill === hourPresent && minutesPresent - minutesWill <= 1) {
                        return (
                          // Không hiện avatar
                          !isLoading && course.phone === data.data.phone ? <div key={index} className="chat-container__me">
                            <ItemChat className="mess__loop" mess={course.mess} person />
                          </div>
                            :
                            <div key={index} className="chat-container__friend">
                              <ItemChat className="mess__loop" mess={course.mess} />
                            </div>
                        )
                      }
                      else if (hourPresent - hourWill === 1 && minutesWill === 59 && minutesPresent === 0) {
                        return (
                          // Không hiện avatar
                          !isLoading && course.phone === data.data.phone ? <div key={index} className="chat-container__me">
                            <ItemChat className="mess__loop" mess={course.mess} person />
                          </div>
                            :
                            <div key={index} className="chat-container__friend">
                              <ItemChat className="mess__loop" mess={course.mess} />
                            </div>
                        )
                      }
                      else if (hourWill === 23 && minutesWill === 59 && minutesPresent === 0) {
                        return (
                          // Không hiện avatar
                          !isLoading && course.phone === data.data.phone ? <div key={index} className="chat-container__me">
                            <ItemChat className="mess__loop" mess={course.mess} person />
                          </div>
                            :
                            <div key={index} className="chat-container__friend">
                              <ItemChat className="mess__loop" mess={course.mess} />
                            </div>
                        )
                      }
                      else {
                        return (
                          !isLoading && course.phone === data.data.phone ? <div key={index} className="chat-container__me">
                            <ItemChat avatar={course.avatar} mess={course.mess} time={course.time} name="You" person />
                          </div>
                            :
                            <div key={index} className="chat-container__friend">
                              <ItemChat avatar={course.avatar} mess={course.mess} time={course.time} name={course.name} />
                            </div>
                        )
                      }
                    }
                    else {
                      return (
                        !isLoading && course.phone === data.data.phone ? <div key={index} className="chat-container__me">
                          <ItemChat avatar={course.avatar} mess={course.mess} time={course.time} name="You" person />
                        </div>
                          :
                          <div key={index} className="chat-container__friend">
                            <ItemChat avatar={course.avatar} mess={course.mess} time={course.time} name={course.name} />
                          </div>
                      )
                    }
                  }
                }
                )}
              </div>
            {/* </ScrollToBottom> */}
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
              <MeProfile me><CAvatar image={avatar} /> </MeProfile>
              <div className='chatmain-type__input'>
                <InputEmoji
                  value={text}
                  onChange={setText}
                  cleanOnEnter
                  onEnter={handleOnEnter}
                  placeholder="Type a message ... "
                />
                <CIconButton className="type-attach" icon={<AttachmentOutlinedIcon />} />
                <CIconButton onclick={() => {
                  handleOnEnter(text)
                }} className="type-send" icon={<SendIcon />} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatSetting dataFriend={dataFriend} dataRoom={dataRoom} isopen={isopen} />
    </div>
  )
}

export default ChatMain