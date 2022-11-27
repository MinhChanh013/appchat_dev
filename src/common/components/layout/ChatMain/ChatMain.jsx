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
import date from 'date-and-time';

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
import { BsTextareaT, BsPerson } from "react-icons/bs";

// image
import sad from "@common/assets/images/angry.png"
import smile from "@common/assets/images/gestures.png"
import love from "@common/assets/images/smile.png"
import heart from "@common/assets/images/love.png"
import like from "@common/assets/images/like.png"
import wow from "@common/assets/images/wow.png"

// api
import { getProfile } from "@/apis/auth.api"
import { requestAddMessage, requestAddMessListFile, requestDeleteMessTo, requestRevokeMessTo, requestAddEmoji } from "@/apis/message.api"
import { findPhone } from "@/apis/user.api"
import { uploadFile } from "@/apis/image.api"
import { useQuery } from "@tanstack/react-query"

import "../../../assets/styles/layout/ChatMain.scss"

const ChatMain = ({ friendActive, idRoomChange, nameRoomChange, myUser, socket, dataRoom, dataFriend }) => {

  const { isLoading: isLoadingFriend, isError, refetch: refetchFriend, data: dataProfileFriend } = useQuery(['getProfileFriend'], () => {
    return findPhone(dataFriend.phone)
  })
  const { isLoading, data } = useQuery(['getUser'], () => {
    return getProfile()
  })
  const [lenghtMess, setLenghtMess] = useState(0)
  const [text, setText] = useState('')
  const [isopen, setIsOpen] = useState(true)
  const [messageList, setMessageList] = useState([]);
  const [statusActive, setStatusActive] = useState("")
  const [accountType, setAccountType] = useState("")
  const [dataListMember, setDataListMember] = useState([])
  const [isRenderListMember, setIsRenderListMember] = useState(true)


  useEffect(() => {
    socket.on("receive_message", (data) => {
      // setWait(true)
      if (data.id_room === dataRoom._id) {
        // setWait(false)
        setMessageList([data.data, ...messageList]);
      }
    });
  }, [socket, dataRoom._id, messageList]);

  useEffect(() => {
    setMessageList(dataRoom.list_message)
    socket.emit("join_room", dataRoom._id);
    // setWait(true)
  }, [socket, dataRoom._id, dataRoom])

  useEffect(() => {
    socket.on("receive_listFileMess", (data) => {
      // setWait(true)
      if (data.id_room === dataRoom._id) {
        // setWait(false)
        const newMessList = data.data.reverse().concat(messageList)
        setMessageList(newMessList);
      }
    });
  }, [socket, dataRoom._id, messageList]);

  useEffect(() => {
    socket.on("receive_recallMess", (data) => {
      if (data.id_room === dataRoom._id) {
        if (messageList[data.index]) {
          messageList[data.index].mess_content = ""
          setMessageList([...messageList])
        }
      }
    });
  }, [dataRoom._id, socket, messageList])

  useEffect(() => {
    socket.on("receive_TypingMess", (data) => {
      if (data.id_room === dataRoom._id) {
        if (data.data.status === true) {
          setAccountType(data.data.name)
        }
        else {
          setAccountType("")
        }
      }
    });
  }, [socket, messageList, dataRoom._id])

  useEffect(() => {
    let timeActive = !isLoadingFriend && dataProfileFriend.data &&
      new Date(dataProfileFriend.data.active)
    if (timeActive && date.subtract(new Date(), timeActive).toSeconds() < 60) {
      setStatusActive(` Truy cập cách đây ${Math.round(timeActive && date.subtract(new Date(), timeActive).toSeconds())} giây trước`)
    }
    else if (timeActive && date.subtract(new Date(), timeActive).toMinutes() < 60) {
      setStatusActive(` Truy cập cách đây ${Math.round(timeActive && date.subtract(new Date(), timeActive).toMinutes())} phút trước`)
    }
    else if (timeActive && date.subtract(new Date(), timeActive).toHours() < 24) {
      setStatusActive(` Truy cập cách đây ${Math.round(timeActive && date.subtract(new Date(), timeActive).toHours())} giờ trước`)
    }
    else setStatusActive(` Truy cập cách đây ${Math.round(timeActive && date.subtract(new Date(), timeActive).toDays())} ngày trước`)
  }, [isLoadingFriend, dataProfileFriend])

  useEffect(() => {
    socket.on("receive_DeleteHistory", (data) => {
      if (myUser && data.myPhone === myUser.data.phone) {
        setMessageList([])
      }
    })
  })

  useEffect(() => {
    socket.on("receive_emoji", (data) => {
      if (myUser && data.id_room._id === dataRoom._id && data.arthor !== myUser.data.phone) {
        messageList.length !== 0 && handelAddEmoji(data.emoji, data.index, "", true)
      }
    })
  }, [socket, dataRoom._id, messageList.length])

  useEffect(() => {
    isRenderListMember && dataRoom && setDataListMember(dataRoom.list_member)
    setIsRenderListMember(false)
  }, [dataListMember, isRenderListMember, dataRoom])

  useEffect(() => {
    socket.on("receive_removeMember", (data) => {
      if (data.id_room === dataRoom._id) {
        let newDataListMember = dataListMember.filter((course) => {
          return course.phone !== data.phone_remove
        })
        setDataListMember(newDataListMember)
      }
    })
  })

  useEffect(() => {
    socket.on("receive_outRoom", (data) => {
      if (data.id_room === dataRoom._id) {
        let newDataListMember = dataListMember.filter((course) => {
          return course.phone !== data.phone
        })
        setDataListMember(newDataListMember)
      }
    });
  })

  useEffect(() => {
    socket.on("receive_changeRole", (data) => {
      if (data.id_room === dataRoom._id) {
        let newDataListMember = []
        dataListMember.forEach((course) => {
          if (course.phone === data.phone_Chane) {
            course.role = ""
            newDataListMember.push(course)
          }
          else
            if (course.phone === data.phone_receive) {
              course.role = "Admin"
              newDataListMember.push(course)
            }
            else { newDataListMember.push(course) }
        })
        setDataListMember(newDataListMember)
      }
    })
  })

  useEffect(() => {
    socket.on("receive_addMember", (roomId, list_Newmember) => {
      if (roomId === dataRoom._id) {
        setDataListMember(dataListMember.concat(list_Newmember))
      }
    })
  })

  //  socket
  const handleOnEnter = (text) => {
    if (text !== "") {
      const messageData = {
        avatar: myUser.data.avatar,
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
  // upload image & file
  const handelUploadImage = (image) => {
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
        avatar: myUser.data.avatar,
        id_room: dataRoom._id,
        mess_content: text_file,
        type_message: { type: "image" },
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
  const handelUploadFiles = (file) => {

    const formData = new FormData()
    for (let i = 0; i < file.length; i++) {
      formData.append("files", file[i])
    }
    let listFile = []

    uploadFile(formData).then((course) => {
      course.data.path.forEach((file, index) => {
        const messageData = {
          avatar: myUser.data.avatar,
          id_room: dataRoom._id,
          mess_content: file.imagePath,
          type_message: file.type_message,
          name: data && `${data.data.first_name} ${data.data.last_name}`,
          list_member: dataRoom.list_member,
          time: new Date()
        }
        listFile.push(messageData)
      })

      requestAddMessListFile(listFile).then(course => {
        socket.emit("send_ListFile", { data: { data: course.data, id_room: dataRoom._id } })
      })
        .catch(err => console.log(err))

    })
  }
  // logic remove and recall messge
  const handelDeleteMessTo = (index) => {
    requestDeleteMessTo({ index: index, id_room: dataRoom._id })
    messageList[index].is_removes.push({ "phone": myUser.data.phone })
    setMessageList([...messageList])
  }
  const handelRevokeMess = (index) => {
    requestRevokeMessTo({ index: index, id_room: dataRoom._id })
    socket.emit("recall_message", { data: { index: index, id_room: dataRoom._id } })
  }
  // logic show account type
  const handelTyping = (text) => {
    if (text.length > 0) {
      socket.emit("typing_message", {
        data: { data: { name: data && `${data.data.first_name} ${data.data.last_name}`, status: true }, id_room: dataRoom._id }
      })
    }
    else {
      socket.emit("typing_message", {
        data: { data: { name: data && `${data.data.first_name} ${data.data.last_name}`, status: false }, id_room: dataRoom._id }
      })
    }
  }
  // logic add emoji and socket
  const handelAddEmoji = (type_Emoji, index, id_Mess, Isocket = false) => {
    if (messageList[index].list_emoji.length === 0) {
      messageList[index].list_emoji.push({
        phone: myUser.data.phone,
        name: data && `${data.data.first_name} ${data.data.last_name}`,
        emoji: [{ count: 1, type_emoji: type_Emoji }],
      });
      setMessageList([...messageList])
    } else {
      let dem = 0
      if (
        messageList[index].list_emoji.some((course) => course.phone === myUser.data.phone)
      ) {
        messageList[index].list_emoji.forEach((course, indexList) => {
          if (course.phone === myUser.data.phone) {
            course.emoji.forEach((item, index_Emoji) => {
              if (item.type_emoji === type_Emoji) {
                dem++
                messageList[index].list_emoji[indexList].emoji[
                  index_Emoji
                ].count = item.count + 1;
                setMessageList([...messageList])
              } else {
                if (course.emoji.length - 1 === index_Emoji && dem === 0) {
                  messageList[index].list_emoji[indexList].emoji.push({
                    count: 1,
                    type_emoji: type_Emoji,
                  });
                  setMessageList([...messageList])
                }
              }
            });
          }
        });
      } else {
        messageList[index].list_emoji.push({
          phone: myUser.data.phone,
          name: data && `${data.data.first_name} ${data.data.last_name}`,
          emoji: [{ count: 1, type_emoji: type_Emoji }],
        });
        setMessageList([...messageList])
      }
    }
    !Isocket && requestAddEmoji({ id_Mess: id_Mess, id_Room: dataRoom._id, type_Emoji: type_Emoji })
    !Isocket && socket.emit("add_emoji", { data: { id_room: dataRoom, index: index, emoji: type_Emoji, arthor: myUser && myUser.data.phone } })

  }

  return (
    <div className='chatmain'>
      <div className="chatmain-container">
        <div className="chatmain-container__header">
          <div className="chatmain-header__infor">
            {
              dataRoom && dataRoom.name_room === "isFriend" ?
                <MeProfile socket={socket} refetch={refetchFriend} data={!isLoadingFriend && !isError && dataProfileFriend.data}>
                  <CAvatar image={dataFriend.avatar} />
                </MeProfile> : <CAvatar image={dataFriend.avatar} />
            }
            <div className="chatmain-infor__content">
              <div className="chatmain-content__name">
                {dataRoom && dataRoom.name_room === "isFriend" ? dataRoom.list_member.map((course, index) => (
                  myUser && myUser.data.phone !== course.phone &&
                  <div key={index} style={{ display: 'flex' }}>
                    <h3>{course.nickname}</h3>
                    <CModalRename phone_friend={course.phone} isFriend={true} socket={socket} dataRoom={dataRoom} name={course.nickname}>
                      <BrushIcon />
                    </CModalRename>
                  </div>
                ))
                  :
                  <div style={{ display: 'flex' }}>
                    <h3>
                      {idRoomChange === dataRoom._id ? nameRoomChange : dataRoom.name_room}
                    </h3>
                    <CModalRename socket={socket} dataRoom={dataRoom} name={dataRoom.name_room}>
                      <BrushIcon />
                    </CModalRename>
                  </div>
                }
              </div>
              <div className="chatmain-content__status">
                {dataRoom && dataRoom.name_room !== "isFriend" ?
                  <span tyle={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "3px" }}>
                    <BsPerson />  {dataListMember.length} thành viên
                  </span>
                  : dataFriend && friendActive && friendActive.length > 0 ? friendActive.some(function (course) {
                    return dataFriend.phone === course
                  }) ? <span style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "3px" }}>
                    <Brightness1Icon style={{ color: "green" }} /> Vừa truy cập
                  </span> : <span tyle={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "3px" }}>
                    <Brightness1Icon /> {statusActive}
                  </span> : !isLoadingFriend && dataProfileFriend.data && dataProfileFriend.data.active === "Vừa mới truy cập" ?
                    <span tyle={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "3px" }}>
                      <Brightness1Icon style={{ color: "green" }} />{dataProfileFriend.data.active}
                    </span> :
                    <span tyle={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "3px" }}>
                      <Brightness1Icon />{statusActive}
                    </span>
                }
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
            <div className="chat-show__container">
              {data && accountType !== "" && accountType !== `${data.data.first_name} ${data.data.last_name}` ? <div className='chat-show__status'>{accountType} đang soạn tin nhắn ...</div> : ""}
              {messageList && messageList.length !== 0 && messageList.map((course, index) => {
                let arrEmoji = [{ type: "sad", count: 0, emoji: sad },
                { type: "like", count: 0, emoji: like },
                { type: "smile", count: 0, emoji: smile },
                { type: "love", count: 0, emoji: love },
                { type: "heart", count: 0, emoji: heart },
                { type: "wow", count: 0, emoji: wow }]
                let mountEmoji = 0
                course.list_emoji.forEach(course => {
                  course.emoji.forEach(emoji => {
                    arrEmoji.forEach((item, index) => {
                      if (item.type === emoji.type_emoji) {
                        arrEmoji[index] = { type: arrEmoji[index].type, count: arrEmoji[index].count + emoji.count, emoji: arrEmoji[index].emoji }
                      }
                    })
                  })
                });
                arrEmoji.sort((a, b) => { return b.count - a.count })
                mountEmoji = arrEmoji.reduce(
                  (accumulator, currentValue) => accumulator + currentValue.count,
                  0
                )

                let deleteTo = 0;
                if (index + 1 === messageList.length) {
                  return (
                    !isLoading && course.arthor.name === `${data.data.first_name} ${data.data.last_name}` ?
                      <div key={index} className="chat-container__me">
                        {course.is_removes.forEach(course => {
                          if (course.phone === myUser.data.phone)
                            deleteTo++
                        })}
                        {deleteTo > 0 ? "" :
                          <ItemChat myUser={myUser} id_Mess={course._id} id_Room={dataRoom._id} socket={socket} me="me" list_emoji={arrEmoji} mountEmoji={mountEmoji} handelAddEmoji={handelAddEmoji} handelDeleteMessTo={handelDeleteMessTo} handelRevokeMess={handelRevokeMess} index={index} avatar={course.arthor.avatar} type_message={course.type_message} mess={course.mess_content}
                            time={new Date(course.time).getHours() + ':' + new Date(course.time).getMinutes()}
                            name="You" person />
                        }
                      </div>
                      :
                      <div key={index} className="chat-container__friend">
                        {course.is_removes.forEach(course => {
                          if (course.phone === myUser.data.phone)
                            deleteTo++
                        })}
                        {deleteTo > 0 ? "" :
                          <ItemChat myUser={myUser} id_Mess={course._id} id_Room={dataRoom._id} socket={socket} list_emoji={arrEmoji} mountEmoji={mountEmoji} handelAddEmoji={handelAddEmoji} handelDeleteMessTo={handelDeleteMessTo} handelRevokeMess={handelRevokeMess} index={index} avatar={course.arthor.avatar} type_message={course.type_message} refetch={refetchFriend} data={!isLoadingFriend && !isError && dataProfileFriend.data} mess={course.mess_content}
                            time={new Date(course.time).getHours() + ':' + new Date(course.time).getMinutes()}
                            name={course.arthor.name} />
                        }
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
                    if (hourWill === hourPresent && minutesPresent - minutesWill <= 1) {
                      return (
                        // Không hiện avatar
                        !isLoading && course.arthor.name === `${data.data.first_name} ${data.data.last_name}` ?
                          <div key={index} className="chat-container__me">
                            {course.is_removes.forEach(course => {
                              if (course.phone === myUser.data.phone)
                                deleteTo++
                            })}
                            {deleteTo > 0 ? "" :
                              <ItemChat myUser={myUser} id_Mess={course._id} id_Room={dataRoom._id} socket={socket} me="me" list_emoji={arrEmoji} mountEmoji={mountEmoji} handelAddEmoji={handelAddEmoji} handelDeleteMessTo={handelDeleteMessTo} handelRevokeMess={handelRevokeMess} index={index} type_message={course.type_message} className="mess__loop" mess={course.mess_content} person />
                            }
                          </div>
                          :
                          <div key={index} className="chat-container__friend">
                            {course.is_removes.forEach(course => {
                              if (course.phone === myUser.data.phone)
                                deleteTo++
                            })}
                            {deleteTo > 0 ? "" :
                              <ItemChat myUser={myUser} id_Mess={course._id} id_Room={dataRoom._id} socket={socket} list_emoji={arrEmoji} mountEmoji={mountEmoji} handelAddEmoji={handelAddEmoji} handelDeleteMessTo={handelDeleteMessTo} handelRevokeMess={handelRevokeMess} index={index} type_message={course.type_message} className="mess__loop" mess={course.mess_content} />
                            }
                          </div>
                      )
                    }
                    else if (hourPresent - hourWill === 1 && minutesWill === 59 && minutesPresent === 0) {
                      return (
                        // Không hiện avatar
                        !isLoading && course.arthor.name === `${data.data.first_name} ${data.data.last_name}` ?
                          <div key={index} className="chat-container__me">
                            {course.is_removes.forEach(course => {
                              if (course.phone === myUser.data.phone)
                                deleteTo++
                            })}
                            {deleteTo > 0 ? "" :
                              <ItemChat myUser={myUser} id_Mess={course._id} id_Room={dataRoom._id} socket={socket} me="me" list_emoji={arrEmoji} mountEmoji={mountEmoji} handelAddEmoji={handelAddEmoji} handelDeleteMessTo={handelDeleteMessTo} handelRevokeMess={handelRevokeMess} index={index} type_message={course.type_message} className="mess__loop" mess={course.mess_content} person />
                            }
                          </div>
                          :
                          <div key={index} className="chat-container__friend">
                            {course.is_removes.forEach(course => {
                              if (course.phone === myUser.data.phone)
                                deleteTo++
                            })}
                            {deleteTo > 0 ? "" :
                              <ItemChat myUser={myUser} id_Mess={course._id} id_Room={dataRoom._id} socket={socket} list_emoji={arrEmoji} mountEmoji={mountEmoji} handelAddEmoji={handelAddEmoji} handelDeleteMessTo={handelDeleteMessTo} handelRevokeMess={handelRevokeMess} index={index} type_message={course.type_message} className="mess__loop" mess={course.mess_content} />
                            }
                          </div>
                      )
                    }
                    else if (hourWill === 23 && minutesWill === 59 && minutesPresent === 0) {
                      return (
                        // Không hiện avatar
                        !isLoading && course.arthor.name === `${data.data.first_name} ${data.data.last_name}` ?
                          <div key={index} className="chat-container__me">
                            {course.is_removes.forEach(course => {
                              if (course.phone === myUser.data.phone)
                                deleteTo++
                            })}
                            {deleteTo > 0 ? "" :
                              <ItemChat myUser={myUser} id_Mess={course._id} id_Room={dataRoom._id} socket={socket} me="me" list_emoji={arrEmoji} mountEmoji={mountEmoji} handelAddEmoji={handelAddEmoji} handelDeleteMessTo={handelDeleteMessTo} handelRevokeMess={handelRevokeMess} index={index} type_message={course.type_message} className="mess__loop" mess={course.mess_content} person />
                            }
                          </div>
                          :
                          <div key={index} className="chat-container__friend">
                            {course.is_removes.forEach(course => {
                              if (course.phone === myUser.data.phone)
                                deleteTo++
                            })}
                            {deleteTo > 0 ? "" :
                              <ItemChat myUser={myUser} id_Mess={course._id} id_Room={dataRoom._id} socket={socket} list_emoji={arrEmoji} mountEmoji={mountEmoji} handelAddEmoji={handelAddEmoji} handelDeleteMessTo={handelDeleteMessTo} handelRevokeMess={handelRevokeMess} index={index} type_message={course.type_message} className="mess__loop" mess={course.mess_content} />
                            }
                          </div>
                      )
                    }
                    else {
                      return (
                        !isLoading && course.arthor.name === `${data.data.first_name} ${data.data.last_name}` ?
                          <div key={index} className="chat-container__me">
                            {course.is_removes.forEach(course => {
                              if (course.phone === myUser.data.phone)
                                deleteTo++
                            })}
                            {deleteTo > 0 ? "" :
                              <ItemChat myUser={myUser} id_Mess={course._id} id_Room={dataRoom._id} socket={socket} me="me" list_emoji={arrEmoji} mountEmoji={mountEmoji} handelAddEmoji={handelAddEmoji} handelDeleteMessTo={handelDeleteMessTo} handelRevokeMess={handelRevokeMess} index={index} type_message={course.type_message} avatar={course.arthor.avatar} mess={course.mess_content} time={new Date(course.time).getHours() + ':' + new Date(course.time).getMinutes()} name="You" person />
                            }
                          </div>
                          :
                          <div key={index} className="chat-container__friend">
                            {course.is_removes.forEach(course => {
                              if (course.phone === myUser.data.phone)
                                deleteTo++
                            })}
                            {deleteTo > 0 ? "" :
                              <ItemChat myUser={myUser} id_Mess={course._id} id_Room={dataRoom._id} socket={socket} list_emoji={arrEmoji} mountEmoji={mountEmoji} handelAddEmoji={handelAddEmoji} handelDeleteMessTo={handelDeleteMessTo} handelRevokeMess={handelRevokeMess} index={index} type_message={course.type_message} avatar={course.arthor.avatar} mess={course.mess_content} time={new Date(course.time).getHours() + ':' + new Date(course.time).getMinutes()} name={course.arthor.name} />
                            }
                          </div>
                      )
                    }
                  }
                  else {
                    return (
                      !isLoading && course.arthor.name === `${data.data.first_name} ${data.data.last_name}` ?
                        <div key={index} className="chat-container__me">
                          {course.is_removes.forEach(course => {
                            if (course.phone === myUser.data.phone)
                              deleteTo++
                          })}
                          {deleteTo > 0 ? "" :
                            <ItemChat myUser={myUser} id_Mess={course._id} id_Room={dataRoom._id} socket={socket} me="me" list_emoji={arrEmoji} mountEmoji={mountEmoji} handelAddEmoji={handelAddEmoji} handelDeleteMessTo={handelDeleteMessTo} handelRevokeMess={handelRevokeMess} index={index} type_message={course.type_message} avatar={course.arthor.avatar} mess={course.mess_content} time={new Date(course.time).getHours() + ':' + new Date(course.time).getMinutes()} name="You" person />
                          }
                        </div>
                        :
                        <div key={index} className="chat-container__friend">
                          {course.is_removes.forEach(course => {
                            if (course.phone === myUser.data.phone)
                              deleteTo++
                          })}
                          {deleteTo > 0 ? "" :
                            <ItemChat myUser={myUser} id_Mess={course._id} id_Room={dataRoom._id} socket={socket} list_emoji={arrEmoji} mountEmoji={mountEmoji} handelAddEmoji={handelAddEmoji} handelDeleteMessTo={handelDeleteMessTo} handelRevokeMess={handelRevokeMess} index={index} type_message={course.type_message} avatar={course.arthor.avatar} mess={course.mess_content} time={new Date(course.time).getHours() + ':' + new Date(course.time).getMinutes()} name={course.arthor.name} />
                          }
                        </div>
                    )
                  }
                }
              }
              )}
            </div>
          </div>
          <div className="chatmain-main__type">
            <div className="chatmain-type__function">
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*"
                  type="file" multiple onChange={(e) => {
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
              <MeProfile socket={socket} me><CAvatar image={myUser && myUser.data.avatar} /> </MeProfile>
              <div className='chatmain-type__input'>
                <InputEmoji
                  // value={text}
                  onChange={(text) => {
                    setText(text)
                    handelTyping(text)
                  }}
                  cleanOnEnter
                  onEnter={handleOnEnter}
                  placeholder="Type a message ... "
                />
                <IconButton className="type-attach" color="primary" aria-label="upload picture" component="label">
                  <input hidden
                    type="file" multiple onChange={(e) => {
                      const file = e.target.files
                      handelUploadFiles(file)
                    }} />
                  <AttachmentOutlinedIcon />
                </IconButton>
                <CIconButton onclick={() => {
                  handleOnEnter(text)
                }} className="type-send" icon={<SendIcon />} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatSetting socket={socket} myUser={myUser && myUser.data} refetch={refetchFriend} dataListMember={dataListMember} idRoomChange={idRoomChange} nameRoomChange={nameRoomChange} data={!isLoadingFriend && !isError && dataProfileFriend.data} dataFriend={dataFriend} dataRoom={dataRoom} isopen={isopen} />
    </div>
  )
}

export default ChatMain