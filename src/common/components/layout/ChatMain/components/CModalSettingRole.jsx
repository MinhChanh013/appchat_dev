import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import AutoCompleteRole from './AutoCompleteRole';
import CTextField from '../../../controls/CTextField';
import CButton from '../../../controls/CButton';
import CAvatar from '../../../controls/CAvatar';
import Modalnotification from './Modalnotification';
import { AiOutlineLock } from "react-icons/ai";
import { IoMdRemoveCircleOutline } from "react-icons/io";

// api 
import { requestRemoveMember } from "@/apis/chat.api"

import "../assets/styles/CModalSettingRole.scss"
import CIconButton from '../../../controls/CIconButton';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    p: 3.5,
    border: '0px solid #000',
    borderRadius: "8px",
    backgroundColor: "#fff"
};

const CModalSettingRole = ({ socket, Room, myUser, button_modal, dataRoom }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <div style={{ display: 'flex' }} onClick={handleOpen} >{button_modal}</div >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='setting-role'>
                        <div className="setting-role__header">Manage group, member</div>
                        {dataRoom && dataRoom.some((course) => {
                            return myUser.phone === course.phone && course.role === "Admin"
                        }) ? "" : <div className="setting-role__inform"><AiOutlineLock />  Only Admin can access these settings</div>}
                        <div className={`setting-role__admin ${dataRoom && dataRoom.some((course) => {
                            return myUser.phone === course.phone && course.role === "Admin"
                        }) ? "active" : ""
                            }`}>
                            <div className="setting-role__find">Find member</div>
                            <CTextField label="Find member ..." />
                            <CButton children="Find" />
                            <div className="setting-role__member">
                                {dataRoom && dataRoom.map((course, index) => (
                                    <div className='setting-member__container' key={index}>
                                        <div className='setting-member__infor'>
                                            <CAvatar icon={course.avatar} />
                                            <div className="setting-member__name">
                                                <h3>{course.nickname}</h3>
                                            </div>
                                        </div>
                                        <div className='setting-member__function'>
                                            <AutoCompleteRole
                                                Room={Room}
                                                dataRoom={dataRoom}
                                                data={course}
                                                socket={socket}
                                                myUser={myUser}
                                                me={myUser.phone === course.phone ? true : false}
                                                role={course.role} />
                                            <Modalnotification
                                                Room={Room}
                                                dataRoom={dataRoom}
                                                data={course}
                                                socket={socket}
                                                myUser={myUser}
                                                api={requestRemoveMember}
                                                type={`${myUser.phone === course.phone && course.role === "Admin" ? "leave" : "remove"}`}
                                                inform="Are you sure to delete members from the group?"
                                                child={<CIconButton icon={<IoMdRemoveCircleOutline />} />} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default CModalSettingRole