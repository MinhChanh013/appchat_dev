import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import resetkey from "@common/assets/images/reset_key.webp"
import CButton from '@common/components/controls/CButton'
import CTextField from '@common/components/controls/CTextField'
import CAleart from '@common/components/controls/CAleart'
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import ConfirmOTP from './ConfirmOTP'
import "../../assets/styles/ConfirmPhone.scss"

// api
import { confirmMyPhone } from "@/apis/auth.api";

// firebase
import { onSignInSubmit, configureCaptcha } from "@/firebase/VerifyOTP"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    border: 'unset',
    boxShadow: 24,
    p: 4,
    borderRadius: 3
};
const PHONE_REGEX = new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g);
const ConfirmPhone = ({ btnConfirm }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: "onSubmit" });
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState("")
    const [hideAleart, setHideAleart] = useState(true)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setHideAleart(true)
        setOpen(false)
    };
    const [hideErr, setHideErr] = useState(true)
    const [showVerify, setShowVerify] = useState(false)

    const mutate = useMutation((values) => {
        setHideAleart(false)
        setHideErr(true)
        setData(values)
        return confirmMyPhone({ phone: values.phone })
    });

    if (!mutate.isLoading && !mutate.isError && mutate.data && mutate.data.status === 200) {
        if (!window.recaptchaVerifier) {
            onSignInSubmit(data.phone, "send-otp-register")
        }
        else {
            configureCaptcha("send-otp-register", data.phone).clear()
            onSignInSubmit(data.phone, "send-otp-register")
        }
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end" }} onClick={handleOpen}>
                {btnConfirm}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="confirm_phone">
                        {hideAleart ? (
                            ""
                        ) : mutate.isLoading ? (
                            ""
                        ) : mutate.isError ? (
                            mutate.error.request.status === 400 ? <CAleart err mess={`${mutate.error.request.response}`} /> :
                                <CAleart err mess={`${mutate.error.message}`} />
                        ) : (
                            ""
                        )}
                        <form className='form-confirm__phone' onSubmit={handleSubmit(mutate.mutate)}>
                            <img src={resetkey} alt="" />
                            <h2>Forgot Password?</h2>
                            <h4>Don't worry! It happens. Please enter the phone number associated your account.</h4>
                            <CTextField registerName={{ ...register("phone", { required: true, pattern: PHONE_REGEX }) }} label="Phone Number" />
                            {errors.phone?.type === "required" && <span className='sigin-auth__err'>Phone is not null</span>}
                            {errors.phone?.type === "pattern" && <span className='sigin-auth__err'>Phone is no default ( Lenght is 10 )</span>}
                            <div id="send-otp-register"></div>
                            <CButton type="submit" children="Confirm" onClick={() => {
                                setHideAleart(true)
                                setHideErr(false)
                                setShowVerify(true)
                            }} />
                        </form>
                        {showVerify && !hideAleart && !mutate.isError && !mutate.isLoading && mutate.data && mutate.data.status === 200 ? <ConfirmOTP type="resetPass" phone={data.phone} user={data} showVerify={true} /> : ""}
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default ConfirmPhone