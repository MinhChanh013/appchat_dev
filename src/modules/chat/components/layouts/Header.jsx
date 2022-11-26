import React from 'react'
// library
import { NavLink } from 'react-router-dom'
// component
import Avatar from "@common/components/controls/CAvatar"
import CSwitch from '@common/components/controls/CSwitch'
import CMenu from '@common/components/controls/CMenu'
import BackgroundIcon from '@common/components/others/BackgroundIcon'
import CTooltip from '@common/components/controls/CTooltip'
// image
import logo from "@common/assets/images/logo.png"
// icon
import CommentIcon from '@mui/icons-material/Comment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import "../../assets/styles/layouts/Header.scss"

// component
import CAleart from '../../../../common/components/controls/CAleart'
import { toast } from "react-toastify"

// api
import { getProfile } from "@/apis/auth.api"
import { useQuery } from "@tanstack/react-query"

const Header = ({ socket }) => {
    const { isLoading, isError, data, error } = useQuery(['getProfileHeader'], () => {
        return getProfile()
    })

    !isLoading && isError && toast.error(error.message)

    return (
        <header className='header__main'>
            <CAleart />
            <div className="header-container">
                <div className="header-container__infor">
                    <img src={logo} className="header-infor__logo" alt="" />
                    <CMenu socket={socket} CAvatar={<Avatar border image={!isLoading && !isError && data.data.avatar} />} />
                </div>
                <div className="header-container__main">
                    <ul>
                        <div className='header-main__function'>
                            <NavLink to="/chats/message" className={({ isActive }) => (`nav__link ${isActive ? "active" : ""}`)}>
                                <CTooltip title="Tin nhắn" placement="right" children={
                                    <li><BackgroundIcon /><CommentIcon /></li>
                                } />
                            </NavLink>
                            <NavLink to="/chats/notification" className={({ isActive }) => (`nav__link ${isActive ? "active" : ""}`)}>
                                <CTooltip title="Thông báo" placement="right" children={
                                    <li><NotificationsIcon /></li>
                                } />
                            </NavLink>
                        </div>
                        <div className='header-main__function'>
                            <NavLink to="/chats/contact" className={({ isActive }) => (`nav__link ${isActive ? "active" : ""}`)}>
                                <CTooltip title="Danh bạ" placement="right" children={
                                    <li><PeopleAltIcon /></li>
                                } />
                            </NavLink>
                            <NavLink to="/chats/setting" className={({ isActive }) => (`nav__link ${isActive ? "active" : ""}`)}>
                                <CTooltip title="Cài đặt" placement="right" children={
                                    <li><SettingsSuggestIcon /></li>
                                } />
                            </NavLink>
                        </div>
                    </ul>
                </div>
                <div className="header-container__system">
                    <CSwitch
                        // checked={darkmode}
                        onClick={() => {
                            // if (darkmode === "mode") {
                            //     document.cookie = "darkmode = dark"
                            //     setDarkmode("dark")
                            // }
                            // else {
                            //     document.cookie = "darkmode = mode"
                            //     setDarkmode("mode")
                            // }
                        }} />
                </div>
            </div>
        </header>
    )
}

export default Header