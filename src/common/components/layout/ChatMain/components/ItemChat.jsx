import React from 'react'

import CAvatar from "@common/components/controls/CAvatar"
import "../assets/styles/ItemChat.scss"
const ItemChat = ({ person, avatar, mess, time, name }) => {
    return (
        <div className={`itemChat ${person ? "me" : ""}`}>
            <div className="itemChat-container">
                <CAvatar image={avatar} />
                <div className="itemChat-cotainer__context">
                    <div className="itemChat-context__name">
                        <span> {name} </span>
                        <span>{time}</span>
                    </div>
                    <div className="itemChat-context__mess"><span>{mess}</span></div>
                </div>
            </div>
        </div>
    )
}

export default ItemChat