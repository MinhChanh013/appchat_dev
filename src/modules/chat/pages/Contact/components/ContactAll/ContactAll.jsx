import React, { useState } from 'react'
// components
import ContactContainer from "../../components/ContactContainer/ContactContainer"
import BackgroundIcon from "@common/components/others/BackgroundIcon"
import CAutoComplete from "@common/components/controls/CAutocomplete"
import CAvatar from "@common/components/controls/CAvatar"
import ModalAddPhone from "@common/components/controls/ModalAddPhone"
import ChatMain from '@common/components/layout/ChatMain/ChatMain'

// images
// import person1 from "@common/assets/images/person1.png"
// import person2 from "@common/assets/images/person2.png"
// import person3 from "@common/assets/images/person3.png"
// import person4 from "@common/assets/images/person4.png"

// icon
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { FaAirbnb } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";

// library
import { useQuery } from '@tanstack/react-query'
import { useMutation } from "@tanstack/react-query"
import io from "socket.io-client"

// api
import { showFriend } from "@/apis/user.api"
import { getChatPrivated, createChatPrivated } from "@/apis/chat.api"

import "./assets/ContactAll.scss"

const socket = io.connect("http://localhost:4001");

const ContactAll = () => {
    const [getApiCreate, setGetApiCreate] = React.useState(false)
    const [activeChat, setActiveChat] = useState("")
    const [getRoom, setGetRoom] = useState(false)
    const [phone, setPhone] = React.useState("")
    const { isError, isLoading, data } = useQuery(['showFriend'], () => {
        return showFriend()
    })

    const [activeFunction, setActiveFuntion] = useState("list-chat")

    const handelMuChatPrivated = useMutation((value) => {
        setGetApiCreate(true)
        setGetRoom(true)
        return getChatPrivated(value)
    })

    const handelMuCreateChatPrivated = useMutation((phone) => {
        return createChatPrivated(phone)
    })

    if (getApiCreate && !handelMuChatPrivated.isLoading && !handelMuChatPrivated.isError && handelMuChatPrivated.data && handelMuChatPrivated.data.data.data[0] === undefined) {
        setGetApiCreate(false)
        handelMuCreateChatPrivated.mutate({ phone: phone })
    }

    // if (getApiCreate && !handelMuChatPrivated.isLoading && !handelMuChatPrivated.isError && handelMuChatPrivated.data && handelMuChatPrivated.data.data.data[0] !== undefined && getRoom) {
    //     socket.emit("join_room", handelMuChatPrivated.data.data.data[0]._id);
    //     setGetRoom(false)
    // }

    return (
        <div className='ContactAll'>
            <div className='contactAll-control'>
                <div className="contactAll-control__container">
                    <div className="contactAll-container__header">
                        <h3>Contact</h3>
                        <div className="contact-header__function">
                            <BackgroundIcon />
                            <PersonAddAlt1Icon />
                            <GroupAddIcon />
                        </div>
                    </div>
                    <div className="contactAll-container__function">
                        <div className="contact-function__header">
                            <FaAirbnb /><span>Function Contact</span>
                        </div>
                        <ModalAddPhone Children={<div className="contactAll-function__main">
                            <IoPersonAddOutline />
                            <span>Add friend with phone number</span>
                        </div>} />
                        <div onClick={() => setActiveFuntion("list-chat")} className={`contactAll-function__main ${activeFunction === "list-chat" ? "active" : ""}`}>
                            <AiOutlineTeam />
                            <span>List chat team</span>
                        </div>
                    </div>
                    <div className="contactAll-container__friend">
                        <div className="contactAll-friend__header">
                            <BsListCheck /><span>List contact</span>
                        </div>
                        <div className="contactAll-friend__list">
                            <div className="chatAll-list__search">
                                <CAutoComplete data={[]} placeholder="Enter name ..." />
                            </div>
                            {!isLoading && !isError ?
                                <div className="chatAll-list__main">
                                    {data.data.list_friend.map((course, index) => (
                                        <div onClick={() => {
                                            setActiveChat(index)
                                            setPhone(course.phone)
                                            handelMuChatPrivated.mutate(course)
                                        }} key={index} className={`chatAll-main__person ${activeChat === index ? "active" : ""}`}>
                                            <CAvatar image={course.avatar} /> <span>{course.name}</span>
                                        </div>
                                    ))}
                                </div>
                                : ""}
                        </div>
                    </div>
                </div>
            </div>
            {
                !handelMuChatPrivated.isLoading && !handelMuChatPrivated.isError
                    && handelMuChatPrivated.data && handelMuChatPrivated.data.data.data[0] !== undefined
                    ?
                    <ChatMain socket={socket} room={handelMuChatPrivated.data.data.data[0]._id} />
                    :
                    <div className='contactAll-main'><ContactContainer /></div>
            }
        </div>
    )
}

export default ContactAll