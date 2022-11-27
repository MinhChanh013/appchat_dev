import React, { useEffect } from 'react'

// component
import BackgroundIcon from "@common/components/others/BackgroundIcon"
import CAvatar from '../../../../common/components/controls/CAvatar';
import CButton from '../../../../common/components/controls/CButton';
import CAleart from '../../../../common/components/controls/CAleart';

import vdBackChat from "@common/assets/images/back_chat.mp4"
// icon
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { BsListCheck, BsListStars } from "react-icons/bs";

// api
import { getAllFriend, requestApplyFriend } from '@/apis/friend.api';
// import { createChatPrivated } from "@/apis/chat.api"
import { useQuery } from "@tanstack/react-query"

import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify";

import "./assets/styles/Todo.scss"
const Todo = ({ myUser, socket }) => {
  const [apply, setAplly] = React.useState(false)
  const [isLoadingRefetch, setIsLoadingRefetch] = React.useState(true)
  const { isLoading, isError, error, data, refetch } = useQuery(['getNotification'], () => {
    // setIsLoadingRefetch(false)
    return getAllFriend()
  })

  useEffect(() => {
    socket.on("receive_Request_Add_Friend", (data) => {
      console.log("da vao");
      setIsLoadingRefetch(true)
      refetch()
    })
  })


  if (!isLoading && isError) {
    toast.error(error.message)
  }

  if (!isLoading && !isError && isLoadingRefetch) {
    setIsLoadingRefetch(false)
  }


  const mutationApply = useMutation((value) => {
    socket.emit("request_Add_Friend", { phone: value.phone, phoneMe: myUser && myUser.data })
    setAplly(true)
    return requestApplyFriend(value)
  })

  if (apply && !mutationApply.isLoading && !mutationApply.isError) {
    toast.success(mutationApply.data.data)
    refetch()
    setAplly(false)
  }

  return (
    <div>
      <div className="notification">
        <CAleart />
        <div className="notification-container">
          <div className="notification-container__notiAll">
            <div className="notification-notiAll">
              <div className="notiAll-header">
                <h3>Notification</h3>
                <div className="notiAll-header__function">
                  <BackgroundIcon />
                  <PersonAddAlt1Icon />
                  <GroupAddIcon />
                </div>
              </div>
              <div className="notiAll-main">
                <div className="notiAll-main__wait">
                  <div className="notiAll-wait-header">
                    <BsListCheck /> <p>friend request</p>
                  </div>
                  <div className="notiAll-wait__list">
                    {!isLoadingRefetch && !isLoading && data.data.list_wait ?
                      data.data.list_wait.length === 0 ? <div className='notiAll-wait__null'>Not friend requests yet</div> :
                        data.data.list_wait.map((course, index) => (
                          < div key={index} className="notiAll-wait__person">
                            <CAvatar />
                            <div className="notiAll-person__infor">
                              <span>{course.name}</span>
                              <div className="notiAll-person__funtion">
                                <CButton children="Confirm" onClick={() => {
                                  setAplly(false)
                                  mutationApply.mutate({
                                    "status": true,
                                    "phone": course.phone,
                                    "name": course.name
                                  })
                                }} />
                                <CButton children="Delete" id="delete" variant="outlined" onClick={() => {
                                  setAplly(false)
                                  mutationApply.mutate({
                                    "status": false,
                                    "phone": course.phone,
                                    "name": course.name
                                  })
                                }} />
                              </div>
                            </div>
                          </div>
                        ))

                      : <div className='notiAll-wait__null'>Not friend requests yet</div>
                    }
                  </div>
                </div>
                <div className="notiAll-main__request">
                  <div className="notiAll-request-header">
                    <BsListStars /> <p>friend request send</p>
                  </div>
                  <div className="notiAll-request__list">
                    {!isLoadingRefetch && !isLoading && data.data.list_request ?
                      data.data.list_request.length === 0 ? <div className='notiAll-request__null'>Not friend requests send yet</div> :
                        data.data.list_request.map((course, index) => (
                          < div key={index} className="notiAll-request__person">
                            <CAvatar />
                            <div className="notiAll-person__infor">
                              <span>{course.name}</span>
                              <div className="notiAll-person__funtion">
                                <CButton children="Cancel" id="cancel" variant="outlined" onClick={() => {
                                  setAplly(false)
                                  mutationApply.mutate({
                                    "status": "cancel",
                                    "phone": course.phone,
                                    "name": course.name
                                  })
                                }} />
                              </div>
                            </div>
                          </div>
                        ))

                      : <div className='notiAll-request__null'>Not friend requests send yet</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='bgchat_container'>
            <video className='' autoPlay loop muted>
              <source src={vdBackChat} type='video/mp4' />
            </video>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Todo