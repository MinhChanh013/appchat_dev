import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import CountryNumber from '../../../modules/chat/pages/Contact/components/ContactAll/components/CountryNumber';
import CTextField from '@common/components/controls/CTextField';
import CAvatar from '@common/components/controls/CAvatar';
import CButton from '@common/components/controls/CButton';
import CAleart from './CAleart';
import { toast } from "react-toastify";

// api
import { findPhoneNotMe } from "@/apis/user.api"
import { requestAddFriend } from "@/apis/friend.api"
// library
import { useForm } from "react-hook-form"
import { useMutation } from '@tanstack/react-query'

import { AiOutlineUserAdd, AiOutlineHistory } from "react-icons/ai";
import "../../assets/styles/controls/ModalAddPhone.scss"
import { Socket } from 'socket.io-client';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: 2,
};
const PHONE_REGEX = new RegExp(/((9|3|7|8|5)+([0-9]{8})\b)/g);
const ModalAddPhone = ({ socket, myUser, Children }) => {
    const [open, setOpen] = React.useState(false);
    const [phone, setPhone] = React.useState("")
    const [getApi, setGetApi] = React.useState(false)
    const [getApiAddFriend, setGetApiAddFriend] = React.useState(false)
    const { register, handleSubmit, reset } = useForm()
    const handleOpen = () => {
        setOpen(true)
        reset()
    };
    const handleClose = () => {
        setOpen(false)
        setGetApi(false)
        setGetApiAddFriend(false)
    };

    const mutation = useMutation((value) => {
        setGetApi(true)
        let phone = ""
        if (value.phone.split("")[0] === "0") {
            phone = value.phone
        }
        else {
            phone = `0${value.phone}`
        }
        setPhone(phone)
        return findPhoneNotMe(phone)
    })

    const muatationAddFriend = useMutation((phone) => {
        socket.emit("request_Add_Friend", { phone: phone, phoneMe: myUser && myUser.data })
        setGetApiAddFriend(true)
        return requestAddFriend(({ phone: phone, name: `${mutation.data.data.first_name.trim()} ${mutation.data.data.last_name.trim()}` }))
    })

    if (getApiAddFriend && !muatationAddFriend.isLoading && !muatationAddFriend.isError) {
        toast.success("Friend request has been sent successfully")
        handleClose()
        setGetApiAddFriend(false)
    }

    if (getApiAddFriend && muatationAddFriend.isError) {
        toast.error("Error")
    }

    return (
        <div className='modal-addPhone'>
            <CAleart />
            <div style={{ display: "flex" }} onClick={handleOpen}>{Children}</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="modal-addPhone__container">
                    <div className="modal-addPhone__header">
                        <AiOutlineUserAdd />
                        <span>Add friend</span>
                    </div>
                    <form onSubmit={handleSubmit(mutation.mutate)}>
                        <CountryNumber registerName={{ ...register("country", { required: true }) }} />
                        <CTextField registerName={{ ...register("phone", { required: true, pattern: PHONE_REGEX }) }} label="Enter number phone..." className="form_chat" />
                        <CButton type="submit">Search</CButton>
                    </form>
                    <div className="modal-addPhone__main">
                        <div className="modal-addPhone__title">
                            <AiOutlineHistory />
                            <span>Search results</span>
                        </div>
                        <div className="modal-addPhone__results">
                            {getApi && !mutation.isLoading && mutation.data.data ?
                                <div className='modal-card__results'>
                                    <div className="modal-results__infor">
                                        <CAvatar />
                                        <div className="modal-results__name">
                                            <h4>{`${mutation.data.data.first_name} ${mutation.data.data.last_name}`}</h4>
                                            <span className='modal-results__number'>{mutation.data.data.phone}</span>
                                        </div>
                                    </div>
                                    <div className="modal-results__status">
                                        <CButton onClick={() => {
                                            muatationAddFriend.mutate(phone)
                                        }} children="Add" />
                                    </div>
                                </div>
                                : ""}
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default ModalAddPhone