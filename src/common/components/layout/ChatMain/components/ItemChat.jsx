import React from 'react'

import CAvatar from "@common/components/controls/CAvatar"
import MeProfile from '../../Profile/MeProfile/MeProfile'
import ModalImage from './ModalImage'
import "../assets/styles/ItemChat.scss"

const ItemChat = ({ type_message, me, data, refetch, className, person, avatar, mess, time, name }) => {
    return (
        <div className={`itemChat ${person ? "me" : ""} ${className ? className : ""}`}>
            <div className="itemChat-container">
                {avatar ? <MeProfile me={me} refetch={refetch} data={data}><CAvatar image={avatar} /></MeProfile> : ""}
                <div className="itemChat-cotainer__context">
                    <div className="itemChat-context__name">
                        {name ? <span> {name} </span> : ""}
                        {time ? <span>{time}</span> : ""}
                    </div>

                    {type_message === "image" ?
                        <div className={`group-image__message ${mess.split(",").length > 2 ? "group" : ""}`} style={{ maxWidth: "650px" }}>
                            {mess.split(",").map((course, index) => {
                                return (
                                    index > 0 &&
                                    <ModalImage key={index} me={me} href={course} imageMess={
                                        <img className='image-context__message' src={course} alt="" />
                                    } />
                                )
                            })}
                        </div>
                        : <div className="itemChat-context__mess"><span>{mess}</span>  </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default ItemChat