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
import CModalSettingRole from './CModalSettingRole'
import CModalAddTeam from '../../../controls/CModalAddTeam'

// icon
import { GoSettings, GoPlus } from "react-icons/go";
import { BiPaint, BiHide } from "react-icons/bi";
import { IoNotificationsOutline, IoPersonOutline, IoSettingsOutline, IoExitOutline } from "react-icons/io5";
import { BsPinAngle, BsShare } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";

// api
import { deleteHistoryChat, requestGetAllImages, requestGetAllFiles } from "@/apis/chat.api"
import { useMutation } from "@tanstack/react-query"

import "../../../../assets/styles/layout/ChatSetting.scss"
const ChatSetting = ({ socket, dataListMember, myUser, idRoomChange, nameRoomChange,
    refetch, data, isopen, team, dataRoom, dataFriend }) => {

    const mutationGetAllFile = useMutation((value) => {
        return requestGetAllFiles({ "_id": value })
    })

    const mutationGetAllImages = useMutation((value) => {
        return requestGetAllImages({ "_id": value })
    })

    React.useEffect(() => {
        mutationGetAllFile.mutate(dataRoom && dataRoom._id)
        mutationGetAllImages.mutate(dataRoom && dataRoom._id)
    }, [])

    return (
        <div className={`chatSetting ${isopen ? "open" : ""}`}>
            <div className={`chatSetting-container ${team ? "team" : ""}`}>
                <div className="chatSetting-container__header">
                    <GoSettings /> <span>Information message</span>
                </div>
                <div className="chatSetting-container__main">
                    <div className="chatSetting-main__infor">
                        {dataRoom && dataRoom.name_room === "isFriend" ?
                            <MeProfile socket={socket} refetch={refetch} data={data}> <CAvatar image={data && data.avatar} /></MeProfile>
                            : <CAvatar />}
                        <div className="chatSetting-infor__name">
                            <h3>
                                {idRoomChange === dataRoom._id && dataFriend ? nameRoomChange : dataFriend.nickname}
                            </h3>
                            <CModalRename myUser={myUser} vatarFriend={data && data.avatar} name={idRoomChange === dataRoom._id && dataFriend ? nameRoomChange : dataFriend.nickname}><CIconButton icon={<BiPaint />} /></CModalRename>
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
                    {dataRoom && dataRoom.name_room === "isFriend" ? "" :
                        <div className="chatSetting-main__member">
                            <div className="chatSetting-member__header">
                                <div className="chatSeeting-header__name">
                                    <IoPersonOutline />
                                    <h3>Members</h3>
                                    <span>({dataListMember && dataListMember.length})</span>
                                </div>
                                <div className='chatSetting-header__function'>
                                    <CModalSettingRole socket={socket} myUser={myUser} dataRoom={dataListMember} Room={dataRoom} button_modal={<CIconButton icon={<FiSettings />} />} />
                                    <CModalAddTeam id_room={dataRoom && dataRoom._id} type="add_member" socket={socket} child={<CIconButton icon={<GoPlus />} />} />
                                </div>
                            </div>

                            <div className="chatSetting-member__main">
                                {dataListMember && dataListMember.map((course, index) => (
                                    <div className='chatSetting-member' key={index}>
                                        <div className='chatSetting-member__infor'>
                                            <CAvatar image={course.avatar} />
                                            <div className="chatSetting-infor__name">
                                                <h3>{course.nickname}</h3>
                                                <span>{course.role !== "" ? course.role : "Member"}</span>
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
                            {!mutationGetAllFile.isLoading && mutationGetAllFile.data && !mutationGetAllImages.isLoading && mutationGetAllImages.data &&
                                <NavigationShare
                                    dataAllFile={mutationGetAllFile.data.data}
                                    dataAllImage={mutationGetAllImages.data.data}
                                />}
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
                                <Button onClick={() => {
                                    deleteHistoryChat({ _id: dataRoom && dataRoom._id })
                                    socket.emit("delete_history", { myPhone: myUser && myUser.phone })
                                }} variant="text" startIcon={<AiOutlineDelete />}>
                                    <span>Delete history</span>
                                </Button>
                            </div>

                            {dataRoom && dataRoom.name_room === "isFriend" ? "" : <div className='chatSetting-function__remove'>
                                <Button variant="text" startIcon={<IoExitOutline />}>
                                    <span>Leave team</span>
                                </Button>
                            </div>}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatSetting