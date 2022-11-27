import React from 'react'

// Component
import CAvatar from "@common/components/controls/CAvatar"
import CSlider from '@common/components/others/CSlider'
import CAutocomplete from '@common/components/controls/CAutocomplete'
import BackgroundIcon from '@common/components/others/BackgroundIcon'
import CardMess from './components/CardMess'
import ModalAddPhone from '@/common/components/controls/ModalAddPhone'
import ChatMain from '@common/components/layout/ChatMain/ChatMain'
import CModalAddTeam from '@/common/components/controls/CModalAddTeam'
// images
import person1 from "@common/assets/images/person1.png"
import person2 from "@common/assets/images/person2.png"
import person3 from "@common/assets/images/person3.png"
import person4 from "@common/assets/images/person4.png"
import vdBackChat from "@common/assets/images/back_chat.mp4"

// icon
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import TelegramIcon from '@mui/icons-material/Telegram';

// api 
import { getAllChat, getIdChat } from "@/apis/chat.api"
import { useQuery, useMutation } from "@tanstack/react-query"
// import { findPhone } from "@/apis/user.api"

import "../../assets/ChatAll.scss"

// socket
import { toast } from 'react-toastify'
import { useState } from 'react'

const ChatAll = ({ socket, myUser, friendActive }) => {
  const [wait, setWait] = useState(true)
  const [activeCardMess, setActiveCardMess] = useState("")
  const [nameRoomChange, setNameRoomChange] = useState("")
  const [idRoomChange, setIdRoomChange] = useState("")
  const [arrNameRoomChange, setArrNameRoomChange] = useState([])
  const [dataFriend, setDataFriend] = useState("")
  const [roomActive, setRoomActive] = useState("")

  const { isLoading, isError, error, data, refetch } = useQuery(['getAllChat'], () => {
    return getAllChat()
  })

  const muTationGetChat = useMutation((value) => {
    return getIdChat(value)
  })

  if (!isLoading && isError) {
    toast.error(error.message)
  }

  React.useEffect(() => {
    socket.emit("join_room", myUser && myUser.data.phone);
    !isLoading && data.data.data.forEach(course => {
      socket.emit("join_room", course._id);
    });

  }, [isLoading, data, myUser, socket])

  React.useEffect(() => {
    socket.on("receive_ChatGroup", (data) => {
      data.id_room.forEach((room) => {
        if (room.phone === myUser.data.phone) {
          setWait(true)
          refetch()
          muTationGetChat.mutate(roomActive)
        }
      })
    });
    socket.on("receive_ChangeName", (data) => {
      data.data.data.list_member.forEach((room) => {
        if (myUser && room.phone === myUser.data.phone) {
          setNameRoomChange(data.data.data.name_room)
          setIdRoomChange(data.data.data._id)
          setArrNameRoomChange([{ name: data.data.data.name_room, _id: data.data.data._id }, ...arrNameRoomChange])
        }
      })
    });
  }, [myUser, refetch, roomActive, muTationGetChat, socket, arrNameRoomChange])

  React.useEffect(() => {
    socket.on("receive_removeRoom", (data) => {
      refetch()
      setActiveCardMess("")
    });

    socket.on("receive_removeMember", (data) => {
      if (myUser.data.phone === data.phone_remove) {
        refetch()
        setActiveCardMess("")
      }
    });

    socket.on("receive_outRoom", (data) => {
      if (myUser.data.phone === data.phone) {
        refetch()
        setActiveCardMess("")
      }
    });
  })

  React.useEffect(() => {
    socket.on("receive_addMember", (data) => {
      refetch()
    })
  })
  return (
    <>
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
                  <ModalAddPhone socket={socket} myUser={myUser} Children={<PersonAddAlt1Icon />} />
                  <CModalAddTeam socket={socket} refetch={refetch} child={<GroupAddIcon />} />
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
                  {/* <CardMess /> */}
                </div>
              </div>
              <div className="chatall-main__all">
                <div className="chatall-pin__header"><TelegramIcon /><span>ALL MESSAGES</span></div>
                <div className="chatall-pin__main">
                  {!isLoading &&
                    data.data.data.map((course, index) => {
                      return (
                        wait && <CardMess onClick={() => {
                          activeCardMess !== index && muTationGetChat.mutate(course._id)
                          setRoomActive(course._id)
                          setActiveCardMess(index)
                          course.name_room === "isFriend" ?
                            course.list_member.forEach((course) => {
                              myUser && myUser.data.phone !== course.phone && setDataFriend(course)
                            }) : setDataFriend({ nickname: course.name_room })

                        }}
                          arrNameRoomNew={arrNameRoomChange.filter(courseArr => courseArr._id === course._id)}
                          muTationGetChat={muTationGetChat} idRoomChange={idRoomChange}
                          nameRoomChange={nameRoomChange} room={course._id} socket={socket}
                          key={index} index={index} activeCardMess={activeCardMess}
                          dataChat={course} myUser={myUser} />
                      )
                    }
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!muTationGetChat.isLoading && !muTationGetChat.isError && muTationGetChat.data && wait && activeCardMess !== "" ?
        <ChatMain friendActive={friendActive} idRoomChange={idRoomChange} nameRoomChange={nameRoomChange} myUser={myUser}
          socket={socket} dataRoom={muTationGetChat.data.data} dataFriend={dataFriend} /> : <div className='bgchat_container'>
          <video className='' autoPlay loop muted>
            <source src={vdBackChat} type='video/mp4' />
          </video>
        </div>}
    </>

  )
}

export default ChatAll