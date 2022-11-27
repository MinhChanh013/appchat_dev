import React, { useState } from 'react'

// component
import CModalBasic from '@common/components/controls/CModalBasic'
import CButton from '@common/components/controls/CButton'
import OtpInput from 'react-otp-input';
import { registerApi } from "@/apis/auth.api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'
// firebase
import { onSubmitConfirm } from "@/firebase/VerifyOTP"

// image
import confirm_err from "../../assets/images/confirm_err.png"
import confirm_show from "../../assets/images/confirm_show.png"
import confirm_typing from "../../assets/images/confirm_typing.png"

// icon
import { BsPhone } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";

import "../../assets/styles/ConfirmOTP.scss"
const ConfirmOTP = ({ type, showVerify, phone, user }) => {
    const changeNavigate = useNavigate();
    const [timeSecond, setTimeSecond] = useState(10)
    const [imageStatus, setImageStatus] = useState(confirm_show)
    const [otp, setOtp] = useState("")
    const [disableSend, setDisableSend] = useState(true)
    const [disableSubmit, setDisableSubmit] = useState(true)
    const [hideErr, setHideErr] = useState(true)

    React.useEffect(() => {
        const countTime = setInterval(() => {
            setTimeSecond(prevTime => prevTime - 1)
        }, 1000)

        if (timeSecond === 0) {
            setDisableSend(false)
            clearInterval(countTime)
        }
        return () => {
            clearInterval(countTime)
        }
    }, [timeSecond, disableSend])

    const mutate = useMutation((user) => {
        setHideErr(false)
        return registerApi(user)
    });

    const notifyErr = (mess) => {
        toast.error(mess)
    }

    if (!mutate.isLoading && !hideErr && mutate.isError) {
        toast.error(mutate.error.message)
    }

    if (!mutate.isLoading && !hideErr && !mutate.isError) {
        changeNavigate("/", { state: { "alert": "success" } })
    }

    return (
        <CModalBasic openFirst={showVerify} padding={0} width={570} child={<div></div>} modal={
            <div className="confirm">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="confirm-container">
                    <div className="confirm-container__status">
                        <div className="confirm-status__circle"></div>
                        <div className="confirm-status__circle"></div>
                        <img src={imageStatus} alt="" />
                    </div>
                    <div className="confirm-container__main">
                        <h3>OTP Vertification</h3>
                        <p className='content-form__confirm'>We will send you a one time password on this <span> Mobile Number</span></p>
                        <span className='phone-form__confirm'><BsPhone /> {phone}</span>
                        <form>
                            <div id="sign-in-button"></div>
                            <div className="form__otp">
                                <OtpInput
                                    className='form-otp__input first'
                                    value={otp}
                                    onChange={(otp) => {
                                        setOtp(otp)
                                        otp === "" ? setImageStatus(confirm_show) : setImageStatus(confirm_typing)
                                        otp.length === 6 ? setDisableSubmit(false) : setDisableSubmit(true)
                                    }}
                                    inputStyle={{ width: "50px" }}
                                    shouldAutoFocus={true}
                                    numInputs={6}
                                    separator={<span></span>}
                                />
                            </div>
                            <div className={`form_confirm-timeout ${disableSend ? "disable" : ""}`}>
                                <span>00:</span><span>{timeSecond < 10 ? `0${timeSecond}` : timeSecond}</span>
                                <div id="send-otp-register"></div>
                                <p>Do not send OTP? <span onClick={() => {
                                    setDisableSend(true)
                                    setTimeSecond(10)
                                }}>Send OTP</span></p>
                            </div>
                            <CButton disabled={disableSubmit ? true : false} onClick={() => {
                                onSubmitConfirm(otp)
                                    .then((result) => {
                                        type === "resetPass" ? changeNavigate("/resetpass", { state: { "phone": phone } }) :
                                            mutate.mutate(user)
                                    })
                                    .catch((err) => {
                                        setImageStatus(confirm_err)
                                        notifyErr(err.message)
                                    });
                            }}>Confirm</CButton>
                        </form>
                    </div>
                </div>
            </div>
        } />
    )
}

export default ConfirmOTP