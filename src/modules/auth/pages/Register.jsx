import React, { useState } from 'react'
// component
import CTextField from '../../../common/components/controls/CTextField'
import CButton from '../../../common/components/controls/CButton'
import CAleart from '../../../common/components/controls/CAleart'
// Library
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
// api
import { registerApi } from "@/apis/auth.api";

const PHONE_REGEX = new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g);

const Register = () => {
  const changeNavigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: "onSubmit" });
  const [hideAleart, setHideAleart] = useState(true)
  const mutate = useMutation((values) => {
    setHideAleart(false)
    return registerApi(values)
  });
  if (!hideAleart && !mutate.isLoading && !mutate.isError) {
    changeNavigate("/", { state: { "alert": "success" } })
  }

  return (
    <div className="sigin_form">
      {hideAleart ? (
        ""
      ) : mutate.isLoading ? (
        ""
      ) : mutate.isError ? (
        <CAleart err mess={`${mutate.error.response.data}`} />
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
        <div className="sigin-fomr__input register">
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
        <Link className='sigin_router__repass'> <h4>Recovery Password</h4></Link>
        <CButton type="submit" children="Sigin in" onClick={() => {
          setHideAleart(true)
        }} />
      </form>
    </div>
  )
}

export default Register