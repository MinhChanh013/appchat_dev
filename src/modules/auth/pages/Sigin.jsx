import React, { useState } from 'react'

import "../assets/styles/Sigin.scss"

// component
import CTextField from '../../../common/components/controls/CTextField'
import CButton from '../../../common/components/controls/CButton'
import CAleart from '../../../common/components/controls/CAleart'
import ConfirmPhone from '../components/control/ConfirmPhone'

// Library
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useLocation } from 'react-router-dom'
// api
import { loginApi } from "@/apis/auth.api";


const PHONE_REGEX = new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g);

const Sigin = () => {
    const alert = useLocation()
    const changeNavigate = useNavigate();
    const [hideAleart, setHideAleart] = useState(true)
    const [hideAleartSuccess, setHideAleartSuccess] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: "onSubmit" });
    const mutate = useMutation((values) => {
        setHideAleart(false)
        return loginApi(values)
    });
    if (!hideAleart && !mutate.isLoading && !mutate.isError) {
        document.cookie = `token_api=${mutate.data.data.token}; Path=/; Expires=${Date()};`;
        changeNavigate("/chats/message", { state: { "alert": "success", "data": mutate.data.data } })
    }
    return (
        <div className="sigin_form">
            {hideAleart ? (
                ""
            ) : mutate.isLoading ? (
                ""
            ) : mutate.isError ? (
                mutate.error.code === "ERR_NETWORK" ?
                    <CAleart err mess={`${mutate.error.message}`} /> : <CAleart err mess={`${mutate.error.response.data}`} />
            ) : (
                ""
            )}
            {hideAleartSuccess && alert.state !== null && alert.state.alert === "success" && <CAleart mess="Register user success" />}
            {hideAleartSuccess && alert.state !== null && alert.state.alert === "err" && <CAleart mess="You've been logged out" />}
            {/* {hideAleartSuccess && alert.state !== null && alert.state.alert === "logout" && <CAleart mess="Sign out successful" />} */}
            <div className="sigin_form__register">
                <span>Not a member? </span>{" "}
                <Link to="/register" className="sigin_router__register">
                    Register now
                </Link>
            </div>
            <form onSubmit={handleSubmit(mutate.mutate)}>
                <h2>Hello Again!</h2>
                <h4>Welcome back you're been missed!</h4>
                <div className="sigin-fomr__input">
                    <CTextField registerName={{
                        ...register("phone"
                            , { required: true, pattern: PHONE_REGEX }
                        )
                    }} label="Phone Number" />
                    {errors.phone?.type === "required" && <span className='sigin-auth__err'>Phone is not null</span>}
                    {errors.phone?.type === "pattern" && <span className='sigin-auth__err'>Phone is no default ( Lenght is 10 )</span>}
                    <CTextField registerName={{ ...register("password", { required: true }) }} type="password" label="Password" />
                    {errors.password?.type === "required" && <span className='sigin-auth__err'>Password is not null</span>}
                </div>
                <ConfirmPhone btnConfirm={<Link className='sigin_router__repass' > <h4>Recovery Password</h4></Link>}/>
                <CButton type="submit" children="Sign in" onClick={() => {
                    setHideAleart(true)
                    setHideAleartSuccess(false)
                }} />
            </form>
        </div>
    )
}

export default Sigin