import React, { useEffect } from 'react'

// component
import CAvatar from "@common/components/controls/CAvatar"
import CBadge from '@common/components/controls/CBadge'
import MenuCardMess from './MenuCardMess';

import "../assets/styles/CardMess.scss"
const CardMess = ({ room, socket, dataChat, myUser, onClick, activeCardMess, index }) => {
    const [reviewMess, setReviewMess] = React.useState(dataChat.list_message[0] && dataChat.list_message[0].mess_content)
    useEffect(() => {
        socket.on("receive_message", (data) => {
            if (data.id_room === room) {
                setReviewMess(data.data.mess_content);
            }
        });
    }, [socket, room]);

    return (
        <div className={`cardMess ${activeCardMess === index ? "active" : ""} `} onClick={onClick}>
            <div className="cardMess-container">
                <div className="cardMess-container__avatar">
                    <CAvatar image={""} />
                </div>
                <div className="cardMess-container__mess">
                    {dataChat && dataChat.name_room === "isFriend" ? dataChat.list_member.map((course, index) => (
                        <div key={index} className="cardMess-mess__name">
                            {myUser && myUser.data.phone !== course.phone && course.nickname}
                        </div>
                    ))
                        : ""
                    }
                    <div className="cardMess-mess__chat">{dataChat !== undefined ? dataChat.list_message.length === 0 ? "Now click and send message" : reviewMess : ""}</div>
                </div>
                <div className="cardMess-container__infor">
                    <div className="cardMess-infor__status">
                        <CBadge number="2" />
                    </div>
                    <div className="cardMess-infor__time">
                        {dataChat !== undefined ? dataChat.list_message.length === 0 ? "" : `${new Date(dataChat.list_message[0].time).getHours()}:${new Date(dataChat.list_message[0].time).getMinutes()}` : ""}
                    </div>
                    <div className="cardMess-infor__function">
                        <MenuCardMess />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardMess