import React from 'react'

import CAvatar from "@common/components/controls/CAvatar"
import MeProfile from '../../Profile/MeProfile/MeProfile'
import "../assets/styles/ItemChat.scss"

const ItemChat = ({ className, person, avatar, mess, time, name }) => {
    return (
        <div className={`itemChat ${person ? "me" : ""} ${className ? className : ""}`}>
            <div className="itemChat-container">
                {avatar ? <MeProfile><CAvatar image={avatar} /></MeProfile> : ""}
                <div className="itemChat-cotainer__context">
                    <div className="itemChat-context__name">
                        {name ? <span> {name} </span> : ""}
                        {time ? <span>{time}</span> : ""}
                    </div>
                    <div className="itemChat-context__mess"><span>{mess}</span></div>
                </div>
            </div>
        </div>
    )
}

export default ItemChat