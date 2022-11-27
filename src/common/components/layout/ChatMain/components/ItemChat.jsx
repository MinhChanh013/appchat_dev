import React from 'react'

// component
import CAvatar from "@common/components/controls/CAvatar"
import MeProfile from '../../Profile/MeProfile/MeProfile'
import ModalImage from './ModalImage'
import { FileIcon } from "react-file-icon";
import defaultStyles from './defaultStyles';
import { styleDefObj } from "./style-customize";
import CIconButton from '@common/components/controls/CIconButton';
import MenuCardMess from './MenuFuctionMess';

// icon
import { IoIosShareAlt } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsDownload } from "react-icons/bs";

// image
import sad from "@common/assets/images/angry.png"
import smile from "@common/assets/images/gestures.png"
import love from "@common/assets/images/smile.png"
import heart from "@common/assets/images/love.png"
import like from "@common/assets/images/like.png"
import likeDefult from "@common/assets/images/like_deafult.png"
import wow from "@common/assets/images/wow.png"


import "../assets/styles/ItemChat.scss"

const ItemChat = ({ socket, mountEmoji, handelAddEmoji, id_Mess, list_emoji, handelRevokeMess, handelDeleteMessTo, index, type_message, me, data, refetch, className, person, avatar, mess, time, name }) => {
    return (
        <div className={`itemChat ${person ? "me" : ""} ${className ? className : ""}`}>
            <div className="itemChat-container">
                {avatar ? <MeProfile socket={socket} me={me} refetch={refetch} data={data}>
                    <CAvatar image={avatar} />
                </MeProfile> : ""}
                <div className="itemChat-cotainer__context">
                    <div className="itemChat-context__name">
                        {name ? <span> {name} </span> : ""}
                        {time ? <span>{time}</span> : ""}
                    </div>
                    {
                        mess === "" ?
                            <div className='itemChat-container__mess'>
                                <div className="itemChat-context__mess recall"> <span>Message recalled</span>
                                </div>
                                <div className='chat-container__funtion'>
                                    <CIconButton icon={<IoIosShareAlt />} />
                                    <MenuCardMess me={me} recall handelDeleteMessTo={handelDeleteMessTo} handelRevokeMess={handelRevokeMess} index={index} icon={
                                        <CIconButton icon={<FiMoreHorizontal />} />
                                    } />
                                </div>
                            </div> :
                            type_message.type === "image" ?
                                <div className={`group-image__message ${mess.split(",").length > 2 ? "group" : ""}`} >
                                    <div className="item-listImage" style={{ maxWidth: "650px" }}>
                                        {me ? <div className='chat-container__funtion'>
                                            <CIconButton icon={<IoIosShareAlt />} />
                                            <MenuCardMess me={me} handelDeleteMessTo={handelDeleteMessTo} handelRevokeMess={handelRevokeMess} index={index} icon={
                                                <CIconButton icon={<FiMoreHorizontal />} />
                                            } />
                                        </div> : ""}

                                        <div className={`itemChat-container__mess ${mess.split(",").length > 7 ? "tripple" : ""}`}>
                                            {mess.split(",").map((course, index) => {
                                                return (
                                                    index > 0 &&
                                                    <ModalImage key={index} me={me} href={course} imageMess={
                                                        <img className='image-context__message' src={course} alt="" />
                                                    } />
                                                )
                                            })}
                                        </div>
                                        {me ? "" : <div className='chat-container__funtion'>
                                            <CIconButton icon={<IoIosShareAlt />} />
                                            <MenuCardMess me={me} handelDeleteMessTo={handelDeleteMessTo} handelRevokeMess={handelRevokeMess} index={index} icon={
                                                <CIconButton icon={<FiMoreHorizontal />} />
                                            } />
                                        </div>}
                                    </div>
                                </div>
                                :
                                type_message.type === "files" ?
                                    <div className='itemChat-container__mess'>
                                        <div className="itemChat-context__mess mess_file">
                                            <div className='itemChat-icon__file'>
                                                <FileIcon extension={type_message.name.split(".")[type_message.name.split(".").length - 1]}
                                                    {...defaultStyles[type_message.name.split(".")[type_message.name.split(".").length - 1]]} {...styleDefObj[type_message.name.split(".")[type_message.name.split(".").length - 1]]} />
                                            </div>
                                            <div className="itemChat-file__information">
                                                <div className="itemChat-inforFile__name">
                                                    <span>{type_message.name}</span>
                                                    <span>{`${type_message.size / 1000} KB`}</span>
                                                </div>
                                                <a className='btn-download__file' href={mess} download >
                                                    <CIconButton icon={<BsDownload />} />
                                                </a>
                                            </div>
                                        </div>
                                        <div className='chat-container__funtion'>
                                            <CIconButton icon={<IoIosShareAlt />} />
                                            <MenuCardMess me={me} handelDeleteMessTo={handelDeleteMessTo} handelRevokeMess={handelRevokeMess} index={index} icon={
                                                <CIconButton icon={<FiMoreHorizontal />} />
                                            } />
                                        </div>
                                    </div>
                                    :
                                    <div className='itemChat-container__mess'>
                                        <div className="itemChat-context__mess" id={`messSample${index}`}> <span id={`text-context${index}`}>{mess}</span>
                                            <div className='itemChat-emoji'>
                                                <div className='emoji-mess'>
                                                    <div className="emoji-mess__container">
                                                        <img onClick={() => {
                                                            handelAddEmoji("heart", index, id_Mess)
                                                        }} className='emoji-mes__img emoji' src={heart} alt="" />
                                                        <img onClick={() => {
                                                            handelAddEmoji("like", index, id_Mess)
                                                        }} className='emoji-mes__img emoji' src={like} alt="" />
                                                        <img onClick={() => {
                                                            handelAddEmoji("sad", index, id_Mess)
                                                        }} className='emoji-mes__img emoji' src={sad} alt="" />
                                                        <img onClick={() => {
                                                            handelAddEmoji("smile", index, id_Mess)
                                                        }} className='emoji-mes__img emoji' src={smile} alt="" />
                                                        <img onClick={() => {
                                                            handelAddEmoji("love", index, id_Mess)
                                                        }} className='emoji-mes__img emoji' src={love} alt="" />
                                                        <img onClick={() => {
                                                            handelAddEmoji("wow", index)
                                                        }} className='emoji-mes__img emoji' src={wow} alt="" />
                                                    </div>
                                                    {mountEmoji === 0 ? <img onClick={() => {
                                                        handelAddEmoji("like", index, id_Mess)
                                                    }} className='emoji-mes__img default' src={likeDefult} alt="" /> :
                                                        <img onClick={() => {
                                                            handelAddEmoji(list_emoji[0].type, index, id_Mess)
                                                        }} className='emoji-mes__img default' src={list_emoji[0].emoji} alt="" />
                                                    }
                                                </div>
                                                {list_emoji && mountEmoji !== 0 && list_emoji.length !== 0 ? <div className="emoji-static">
                                                    <span>
                                                        {mountEmoji}
                                                    </span>
                                                    {list_emoji && list_emoji.map((course, index) => {
                                                        return (
                                                            index < 3 && course.count > 0 && <img key={index} className='emoji-mes__img emoji' src={course.emoji} alt="" />
                                                        )
                                                    })}
                                                </div> : ""}
                                            </div>
                                        </div>
                                        <div className='chat-container__funtion'>
                                            <CIconButton icon={<IoIosShareAlt />} />
                                            <MenuCardMess me={me} handelDeleteMessTo={handelDeleteMessTo} handelRevokeMess={handelRevokeMess} index={index} icon={
                                                <CIconButton icon={<FiMoreHorizontal />} />
                                            } />
                                        </div>
                                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ItemChat