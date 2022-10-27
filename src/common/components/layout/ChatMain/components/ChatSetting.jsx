import React from 'react'

// component
import CAvatar from "@common/components/controls/CAvatar"
import CIconButton from "@common/components/controls/CIconButton"
import CSwitchBasic from "@common/components/controls/CSwitchBasic"
import NavigationShare from './NavigationShare'
import CButton from '@common/components/controls/CButton'
import Button from '@mui/material/Button';
import MeProfile from '../../Profile/MeProfile/MeProfile'
import CModalRename from '../../../controls/CModalRename'

// icon
import { GoSettings, GoPlus } from "react-icons/go";
import { BiPaint, BiHide } from "react-icons/bi";
import { IoNotificationsOutline, IoPersonOutline, IoSettingsOutline, IoExitOutline } from "react-icons/io5";
import { BsPinAngle, BsShare } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";


// image
import person1 from "@common/assets/images/person1.png"
import person2 from "@common/assets/images/person2.png"
import person3 from "@common/assets/images/person3.png"
import person4 from "@common/assets/images/person4.png"

import "../../../../assets/styles/layout/ChatSetting.scss"
const ChatSetting = ({ isopen, team, dataRoom, dataFriend }) => {
    const member = [
        {
            avatar: person1,
            name: "Hooman",
            friend: true,
            owner: "Owner",
        },
        {
            avatar: person2,
            name: "Alireza",
            friend: true,
            owner: "UI/UX DESIGNER",
        },
        {
            avatar: person3,
            name: "Mohammadreza",
            friend: false,
            owner: "3D DESIGNER",
        },
        {
            avatar: person4,
            name: "Hossein",
            friend: false,
            owner: "UI/UX DESIGNER",
        },
        {
            avatar: person2,
            name: "Alireza",
            friend: true,
            owner: "UI/UX DESIGNER",
        },
        {
            avatar: person3,
            name: "Mohammadreza",
            friend: false,
            owner: "3D DESIGNER",
        },
        {
            avatar: person4,
            name: "Hossein",
            friend: false,
            owner: "UI/UX DESIGNER",
        },

    ]
    return (
        <div className={`chatSetting ${isopen ? "open" : ""}`}>
            <div className={`chatSetting-container ${team ? "team" : ""}`}>
                <div className="chatSetting-container__header">
                    <GoSettings /> <span>Information message</span>
                </div>
                <div className="chatSetting-container__main">
                    <div className="chatSetting-main__infor">
                        <MeProfile> <CAvatar /></MeProfile>
                        <div className="chatSetting-infor__name">
                            <h3>{dataFriend && dataFriend.name}</h3>
                            <CModalRename><CIconButton icon={<BiPaint />} /></CModalRename>
                        </div>
                    </div>
                    <div className="chatSetting-main__function">
                        <div className='chatSetting-function__container'>
                            <div className='chatSetting-container__name'><IoNotificationsOutline /> <span>Notifications</span></div>
                            <CSwitchBasic />
                        </div>
                        <div className='chatSetting-function__container'>
                            <div className='chatSetting-container__name'><BsPinAngle /> <span>Ghim message</span></div>
                            <CSwitchBasic />
                        </div>
                    </div>
                    {dataRoom && dataRoom.count_member === 2 ? "" :
                        <div className="chatSetting-main__member">
                            <div className="chatSetting-member__header">
                                <div className="chatSeeting-header__name">
                                    <IoPersonOutline />
                                    <h3>Members</h3>
                                    <span>(22)</span>
                                </div>
                                <CIconButton icon={<GoPlus />} />
                            </div>
                            <div className="chatSetting-member__main">
                                {member.map((course, index) => (
                                    <div className='chatSetting-member' key={index}>
                                        <div className='chatSetting-member__infor'>
                                            <CAvatar icon={course.avatar} />
                                            <div className="chatSetting-infor__name">
                                                <h3>{course.name}</h3>
                                                <span>{course.owner}</span>
                                            </div>
                                        </div>
                                        {course.friend ? <CButton children="Chat" /> : <CButton children="Add" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    <div className="chatSetting-main__share">
                        <div className="chatSetting-share__header">
                            <BsShare /> <span>Shared Media</span>
                        </div>
                        <div className="chatSetting-share__main">
                            <NavigationShare />
                        </div>
                    </div>
                    <div className="chatSetting-main__scurity">
                        <div className="chatSetting-scurity__header">
                            <IoSettingsOutline />
                            <span>Setting Security</span>
                        </div>
                        <div className="chatSetting-scurity__main">
                            <div className='chatSetting-scurity__function'>
                                <div className='chatSetting-scurity__name'><BiHide /> <span>Hide chat</span></div>
                                <CSwitchBasic />
                            </div>
                            <div className='chatSetting-function__remove'>
                                <Button variant="text" startIcon={<AiOutlineDelete />}>
                                    <span>Delete history</span>
                                </Button>
                            </div>
                            <div className='chatSetting-function__remove'>
                                <Button variant="text" startIcon={<IoExitOutline />}>
                                    <span>Leave team</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatSetting