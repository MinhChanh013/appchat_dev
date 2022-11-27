import React, { useState } from 'react'

// Library
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import CTextField from '@common/components/controls/CTextField'
import CButton from '@common/components/controls/CButton'
import CAleart from '@common/components/controls/CAleart'
import { useNavigate, useLocation } from 'react-router-dom'

// api
import { useMutation } from "@tanstack/react-query";
import { resetPass } from "@/apis/user.api"
import { loginApi } from "@/apis/auth.api";

const ResetPass = () => {
    const phone = useLocation()
    const changeNavigate = useNavigate();
    const [hideAleart, setHideAleart] = useState(true)
    const [pass, setPass] = useState("")
    const { register, handleSubmit, formState: { errors }, watch } = useForm({ reValidateMode: "onSubmit" });
    const mutate = useMutation((values) => {
        setHideAleart(false)
        setPass(values.password)
        return resetPass({
            phone: phone.state.phone,
            password: values.password
        })
    });

    if (!hideAleart && !mutate.isLoading && !mutate.isError) {
        loginApi({
            phone: phone.state.phone,
            password: pass
        }).then((course) => {
            document.cookie = `token_api=${course.data.token}; Path=/; Expires=${Date()};`;
            changeNavigate("/chats/message", { state: { "alert": "success", "data": mutate.data } })
        })
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
            <div className="sigin_form__register">
                <span>Not a member? </span>{" "}
                <Link to="/register" className="sigin_router__register">
                    Register
                </Link>
                <span style={{ marginLeft: "10px" }}> or</span>
                <Link to="/" className="sigin_router__register">
                    Login
                </Link>
            </div>
            <form onSubmit={handleSubmit(mutate.mutate)}>
                <h2>Reset Password</h2>
                <h4>Now update your account with a new password</h4>
                <div className="sigin-fomr__input">
                    <CTextField registerName={{ ...register("password", { required: true }) }} type="password" label="New Password" />
                    {errors.password?.type === "required" && <span className='sigin-auth__err'>New password is not null</span>}
                    <CTextField registerName={{
                        ...register("confirm_password", {
                            required: true, validate: (val) => {
                                if (watch('password') !== val) {
                                    return false
                                }
                            }
                        })
                    }} type="password" label="Confirm new Password" />
                    {errors.confirm_password?.type === "required" && <span className='sigin-auth__err'>Confirm password is not null</span>}
                    {errors.confirm_password?.type === "validate" && <span className='sigin-auth__err'>Password confirm is not same</span>}
                </div>
                <CButton type="submit" children="Submit" onClick={() => {
                    setHideAleart(true)
                }} />
            </form>
        </div>
    )
}

export default ResetPass