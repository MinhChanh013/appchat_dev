import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import CAvatar from "../../../controls/CAvatar"
import CTextField from '../../../controls/CTextField';
import TextField from '@mui/material/TextField';
import Calendar from './Calendar';
import Autocomplete from '@mui/material/Autocomplete';
import CButton from '../../../controls/CButton';

import { VscAccount } from "react-icons/vsc";
import { BsGenderTrans } from "react-icons/bs";
import { HiOutlineCake } from "react-icons/hi";

import { useForm } from "react-hook-form"

// api
import { requestEditProfile } from "@/apis/user.api"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'unset',
    borderRadius: 1,
    boxShadow: 24,
};
const genderList = ["Nam", "Nữ"]
const EditMyProfile = ({ socket, child, avatar, first_name, last_name, dateOfBirth, gender, phone }) => {

    const { register, handleSubmit } = useForm()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState(gender ? gender : genderList[0]);
    const [inputValue, setInputValue] = React.useState('');

    const handelEdit = (value_sub) => {
        requestEditProfile({
            first_name: value_sub.first_name, last_name: value_sub.last_name,
            gender: value,
            birthday: new Date(value_sub.dateOfBirth)

        }).then(() => {
            socket.emit("edit_profile", phone)
            handleClose()
        })
    }
    return (

        <div>
            <div onClick={handleOpen} style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                {child}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="meProfile-container">
                        <div className="meProfile-container__header">
                            <VscAccount />
                            <span>Edit My Profile</span>
                        </div>
                        <div className="meProfile-container__main">
                            <div className="meProfile-background">
                                <div className='meProfile-infor__avatar'><CAvatar image={avatar} /></div>
                            </div>
                            <div className="meProfile-information">
                                <div className="meProfile-information__content edit_myProfile">
                                    <form onSubmit={handleSubmit(handelEdit)}>
                                        <div className='meProfile-content__infor'>
                                            <div className="meProfile-infor__title">
                                                <span>First Name : </span>
                                            </div>
                                            <CTextField registerName={{ ...register("first_name", { required: true }) }} name={first_name} />
                                        </div>
                                        <div className='meProfile-content__infor'>
                                            <div className="meProfile-infor__title">
                                                <span>Last Name : </span>
                                            </div>
                                            <CTextField registerName={{ ...register("last_name", { required: true }) }} name={last_name} />
                                        </div>
                                        <div className='meProfile-content__infor'>
                                            <div className="meProfile-infor__title date_ofBirth">
                                                <BsGenderTrans />
                                                <span>Gender : </span>
                                            </div>
                                            {gender && <Autocomplete
                                                value={value}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                                defaultValue={gender ? gender : "Nam"}
                                                disableClearable
                                                inputValue={inputValue}
                                                onInputChange={(event, newInputValue) => {
                                                    setInputValue(newInputValue);
                                                }}
                                                id="controllable-states-demo"
                                                options={genderList}
                                                renderInput={(params) => <TextField {...params} />}
                                            />}

                                        </div>
                                        <div className='meProfile-content__infor'>
                                            <div className="meProfile-infor__title date_ofBirth">
                                                <HiOutlineCake />
                                                <span>Date of birth : </span>
                                            </div>
                                            <Calendar registerName={{ ...register("dateOfBirth", { required: true }) }} dateOfBirth={dateOfBirth} />
                                        </div>
                                        <div className="meEdit-content__function">
                                            <CButton id="btn-cancel__Edit" onClick={handleClose} children="Cancel" />
                                            <CButton id="btn-submit__Edit" type="submit" children="Update" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default EditMyProfile