import React, { useState } from 'react'
// component
import CTextField from '../../../common/components/controls/CTextField'
import CButton from '../../../common/components/controls/CButton'
import CAleart from '../../../common/components/controls/CAleart'
import ConfirmPhone from '../components/control/ConfirmPhone'
import ConfirmOTP from '../components/control/ConfirmOTP'
// Library
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
// api
import { verifyApi } from "@/apis/auth.api";
// firebase
import { onSignInSubmit, configureCaptcha } from "@/firebase/VerifyOTP"

const PHONE_REGEX = new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g);

const Register = () => {
  const [showVerify, setShowVerify] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: "onSubmit" });
  const [data, setData] = useState("")
  const [hideAleart, setHideAleart] = useState(true)
  const [hideErr, setHideErr] = useState(true)
  const mutate = useMutation((values) => {
    setHideAleart(false)
    setHideErr(true)
    setData(values)
    return verifyApi({ phone: values.phone })
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
    <div className="sigin_form">
      {hideAleart ? (
        ""
      ) : mutate.isLoading ? (
        ""
      ) : mutate.isError ? (
        mutate.error.request.status === 409 ? <CAleart err mess={`${mutate.error.request.response}`} /> :
          <CAleart err mess={`${mutate.error.message}`} />
      ) : (
        ""
      )}
      <div className="sigin_form__register">
        <span>Already have an account? </span>
        <Link to="/" className="sigin_router__register">
          Login now
        </Link>
      </div>
      <form className='register' onSubmit={handleSubmit(mutate.mutate)}>
        <h2>Welcome to software!</h2>
        <h4>Sign up to your account!</h4>
        <div className={`sigin-fomr__input register ${hideErr ? "" : "showErr"}`}>
          <CTextField registerName={{ ...register("first_name", { required: true }) }} label="First Name" />
          {errors.first_name?.type === "required" && <span className='sigin-auth__err'>First name is not null</span>}
          <CTextField registerName={{ ...register("last_name", { required: true }) }} label="Last Name" />
          {errors.last_name?.type === "required" && <span className='sigin-auth__err'>Last name is not null</span>}
          <CTextField registerName={{ ...register("phone", { required: true, pattern: PHONE_REGEX }) }} label="Phone Number" />
          {errors.phone?.type === "required" && <span className='sigin-auth__err'>Phone is not null</span>}
          {errors.phone?.type === "pattern" && <span className='sigin-auth__err'>Phone is no default ( Lenght is 10 )</span>}
          <CTextField registerName={{ ...register("password", { required: true }) }} type="password" label="Password" />
          {errors.password?.type === "required" && <span className='sigin-auth__err'>Password is not null</span>}
        </div>
        <ConfirmPhone btnConfirm={<Link className='sigin_router__repass'><h4>Recovery Password</h4> </Link>} />
        <div id="send-otp-register"></div>
        <CButton type="submit" children="Sign up" onClick={() => {
          setHideAleart(true)
          setHideErr(false)
          setShowVerify(true)
        }} />
      </form>
      {showVerify && !hideAleart && !mutate.isError && !mutate.isLoading && mutate.data && mutate.data.status === 200 ? <ConfirmOTP phone={data.phone} user={data} showVerify={true} /> : ""}

    </div>
  )
}

export default Register