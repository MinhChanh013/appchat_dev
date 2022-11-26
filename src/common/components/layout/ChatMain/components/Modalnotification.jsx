import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import editGif from "../assets/images/edit.gif"
import removeGif from "../assets/images/remove.gif"
import CButton from '../../../controls/CButton';

import { requestRemoveRoom, requestOutGroup, requestChangeRole } from "@/apis/chat.api"

import "../assets/styles/Modalnotification.scss"
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    p: 3.5,
    border: '0px solid #000',
    borderRadius: "8px",
    backgroundColor: "#fff",
};

const Modalnotification = ({ dataRoom, myUser, socket, data, Room, api, child, type, inform, show = false }) => {
    const [open, setOpen] = React.useState(show ? true : false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <div style={{ display: 'flex' }} onClick={handleOpen} >{child}</div >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {type === "edit" &&
                        <div className="inform__container">
                            <img src={editGif} alt="" />
                            <div className="inform__content">
                                <div className="inform__title">
                                    <span>Are you sure the roles transfer rights to this member?</span>
                                    <div className="inform__function">
                                        <CButton children="No" onClick={() => { handleClose() }} />
                                        <CButton children="Yes" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {type === "remove" &&
                        <div className="inform__container">
                            <img src={removeGif} alt="" />
                            <div className="inform__content">
                                <div className="inform__title">
                                    <span>{inform}</span>
                                    <div className="inform__function">
                                        <CButton children="No" onClick={() => { handleClose() }} />
                                        <CButton children="Yes" onClick={() => {
                                            api({ phone: data.phone, room_id: Room._id }).then(() => {
                                                socket.emit("remove_member", { data: { id_room: Room._id, list_member: Room.list_member, phone_remove: data.phone } })
                                                handleClose()
                                            })

                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {type === "leave" &&
                        <div className="inform__container">
                            <img src={removeGif} alt="" />
                            <div className="inform__content">
                                <div className="inform__title">
                                    {dataRoom.length === 1 ? <span>
                                        The group will disband if you leave.
                                    </span> : <span>You should <span className='not-leave' onClick={() => { handleClose() }}>transfer roles</span> to members before leaving the group. Otherwise, the Admin role will be randomly assigned to other members.</span>}
                                    <div className="inform__function">
                                        <CButton children="No" onClick={() => { handleClose() }} />
                                        <CButton children="Yes" onClick={() => {
                                            if (dataRoom.length === 1) {
                                                requestRemoveRoom({ room_id: Room._id }).then(() => {
                                                    socket.emit("remove_room", { phone: myUser && myUser.phone })
                                                    handleClose()
                                                })
                                            }
                                            else {
                                                let member_receive
                                                dataRoom.sort((a, b) => a.phone.localeCompare(b.phone)).forEach(course => {
                                                    if (course.phone !== myUser.phone) {
                                                        return member_receive = course
                                                    }
                                                })
                                                requestChangeRole({ room_id: Room._id, phone: member_receive.phone })
                                                socket.emit("change_role", { data: { id_room: Room._id, phone_Chane: myUser && myUser.phone, phone_receive: member_receive.phone } })
                                                requestOutGroup({ room_id: Room._id })
                                                socket.emit("out_room", { data: { phone: myUser && myUser.phone, id_room: Room._id } })
                                                handleClose()
                                            }
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </Box>
            </Modal>
        </div>
    )
}

export default Modalnotification