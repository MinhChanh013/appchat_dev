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
import IconButton from '@mui/material/IconButton';

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
import { requestAddMessage } from "@/apis/message.api"
import { findPhone } from "@/apis/user.api"
import { uploadFile } from "@/apis/image.api"

import { useQuery } from "@tanstack/react-query"

// icon
import person3 from "@common/assets/images/person3.png"
import avatar from "@common/assets/images/avatar.jpg"
import "../../../assets/styles/layout/ChatMain.scss"

const ChatMain = ({ socket, dataRoom, dataFriend }) => {
  const [wait, setWait] = useState(true)

  const { isLoading: isLoadingFriend, isError, refetch: refetchFriend, data: dataProfileFriend } = useQuery(['getProfileFriend'], () => {
    return findPhone(dataFriend.phone)
  }, { enabled: false })

  const { isLoading, data } = useQuery(['getUser'], () => {
    return getProfile()
  })

  const [text, setText] = useState('')
  const [isopen, setIsOpen] = useState(true)
  const [messageList, setMessageList] = useState([]);

  //  socket
  const handleOnEnter = (text) => {
    if (text !== "") {
      const messageData = {
        avatar: person3,
        id_room: dataRoom._id,
        mess_content: text,
        name: data && `${data.data.first_name} ${data.data.last_name}`,
        list_member: dataRoom.list_member,
        time: new Date()
      }
      setText("")
      requestAddMessage(messageData).then(data => {
        socket.emit("send_message", { data: { data: data.data, id_room: dataRoom._id } })
      }
      )
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setWait(true)
      if (data.id_room === dataRoom._id) {
        setWait(false)
        setMessageList([data.data, ...messageList]);
      }
    });
  }, [socket, dataRoom._id, messageList]);

  useEffect(() => {
    setMessageList([])
    socket.emit("join_room", dataRoom._id);
    setWait(true)
  }, [socket, dataRoom._id])

  // upload file
  const handelUploadImage = (image) => {
    ;
    const formData = new FormData()
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i])
    }
    uploadFile(formData).then((course) => {
      let text_file = ""
      course.data.path.forEach((pathContex) => {
        text_file += `,${pathContex.imagePath}`
      })

      const messageData = {
        avatar: person3,
        id_room: dataRoom._id,
        mess_content: text_file,
        type_message: "image",
        name: data && `${data.data.first_name} ${data.data.last_name}`,
        list_member: dataRoom.list_member,
        time: new Date()
      }
      requestAddMessage(messageData).then(data => {
        socket.emit("send_message", { data: { data: data.data, id_room: dataRoom._id } })
      }
      )
    })
      .catch(err => console.log(err))
  }
  return (
    <div className='chatmain'>
      <div className="chatmain-container">
        <div className="chatmain-container__header">
          <div className="chatmain-header__infor">
            <MeProfile refetch={refetchFriend} data={!isLoadingFriend && !isError && dataProfileFriend.data}><CAvatar image="" /> </MeProfile>
            <div className="chatmain-infor__content">
              <div className="chatmain-content__name">
                <h3>{dataFriend && dataFriend.name}</h3>
                <CModalRename name={dataFriend && dataFriend.name}>
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
              {wait ? "" : messageList.map((course, index) => {
                if (index + 1 === messageList.length) {
                  return (
                    !isLoading && course.arthor.name === `${data.data.first_name} ${data.data.last_name}` ? <div key={index} className="chat-container__me">
                      <ItemChat type_message={course.type_message} avatar mess={course.mess_content}
                        time={new Date(course.time).getHours() + ':' + new Date(course.time).getMinutes()}
                        name="You" person />
                    </div>
                      :
                      <div key={index} className="chat-container__friend">
                        <ItemChat type_message={course.type_message} refetch={refetchFriend} data={!isLoadingFriend && !isError && dataProfileFriend.data} avatar mess={course.mess_content}
                          time={new Date(course.time).getHours() + ':' + new Date(course.time).getMinutes()}
                          name={course.arthor.name} />
                      </div>
                  )
                }
                else {
                  const willChat = messageList[index + 1]
                  const hourWill = new Date(willChat.time).getHours()
                  const minutesWill = new Date(willChat.time).getMinutes()
                  const hourPresent = new Date(course.time).getHours()
                  const minutesPresent = new Date(course.time).getMinutes()
                  if (course.arthor.name === willChat.arthor.name) {
                    // console.log(hourWill, minutesWill, hourPresent, minutesPresent);
                    if (hourWill === hourPresent && minutesPresent - minutesWill <= 1) {
                      return (
                        // Không hiện avatar
                        !isLoading && course.arthor.name === `${data.data.first_name} ${data.data.last_name}` ? <div key={index} className="chat-container__me">
                          <ItemChat className="mess__loop" mess={course.mess_content} person />
                        </div>
                          :
                          <div key={index} className="chat-container__friend">
                            <ItemChat className="mess__loop" mess={course.mess_content} />
                          </div>
                      )
                    }
                    else if (hourPresent - hourWill === 1 && minutesWill === 59 && minutesPresent === 0) {
                      return (
                        // Không hiện avatar
                        !isLoading && course.arthor.name === `${data.data.first_name} ${data.data.last_name}` ? <div key={index} className="chat-container__me">
                          <ItemChat className="mess__loop" mess={course.mess_content} person />
                        </div>
                          :
                          <div key={index} className="chat-container__friend">
                            <ItemChat className="mess__loop" mess={course.mess_content} />
                          </div>
                      )
                    }
                    else if (hourWill === 23 && minutesWill === 59 && minutesPresent === 0) {
                      return (
                        // Không hiện avatar
                        !isLoading && course.arthor.name === `${data.data.first_name} ${data.data.last_name}` ? <div key={index} className="chat-container__me">
                          <ItemChat className="mess__loop" mess={course.mess_content} person />
                        </div>
                          :
                          <div key={index} className="chat-container__friend">
                            <ItemChat className="mess__loop" mess={course.mess_content} />
                          </div>
                      )
                    }
                    else {
                      return (
                        !isLoading && course.arthor.name === `${data.data.first_name} ${data.data.last_name}` ? <div key={index} className="chat-container__me">
                          <ItemChat avatar mess={course.mess_content} time={new Date(course.time).getHours() + ':' + new Date(course.time).getMinutes()} name="You" person />
                        </div>
                          :
                          <div key={index} className="chat-container__friend">
                            <ItemChat avatar mess={course.mess_content} time={new Date(course.time).getHours() + ':' + new Date(course.time).getMinutes()} name={course.arthor.name} />
                          </div>
                      )
                    }
                  }
                  else {
                    return (
                      !isLoading && course.arthor.name === `${data.data.first_name} ${data.data.last_name}` ? <div key={index} className="chat-container__me">
                        <ItemChat avatar mess={course.mess_content} time={new Date(course.time).getHours() + ':' + new Date(course.time).getMinutes()} name="You" person />
                      </div>
                        :
                        <div key={index} className="chat-container__friend">
                          <ItemChat avatar mess={course.mess_content} time={new Date(course.time).getHours() + ':' + new Date(course.time).getMinutes()} name={course.arthor.name} />
                        </div>
                    )
                  }
                }
              }
              )}
              {dataRoom && dataRoom.list_message.map((course, index) => {
                const date = new Date(course.time)
                return (
                  !isLoading && course.arthor.name === `${data.data.first_name} ${data.data.last_name}` ? <div key={index} className="chat-container__me">
                    <ItemChat type_message={course.type_message} me data={data.data} avatar={person3} mess={course.mess_content}
                      time={date.getHours() + ':' + date.getMinutes()}
                      name="You" person />
                  </div>
                    :
                    <div key={index} className="chat-container__friend">
                      <ItemChat type_message={course.type_message} refetch={refetchFriend} data={!isLoadingFriend && !isError && dataProfileFriend.data} avatar={person3} mess={course.mess_content}
                        time={date.getHours() + ':' + date.getMinutes()}
                        name={!isLoading && course.arthor.name} />
                    </div>
                )
              })}
            </div>
            {/* </ScrollToBottom> */}
          </div>
          <div className="chatmain-main__type">
            <div className="chatmain-type__function">
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" multiple onChange={(e) => {
                  const file = e.target.files
                  handelUploadImage(file)

                }} />
                <IoImagesOutline />
              </IconButton>
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
      <ChatSetting refetch={refetchFriend} data={!isLoadingFriend && !isError && dataProfileFriend.data} dataFriend={dataFriend} dataRoom={dataRoom} isopen={isopen} />
    </div>
  )
}

export default ChatMain