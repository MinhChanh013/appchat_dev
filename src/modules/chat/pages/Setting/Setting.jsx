import React from 'react'
import vdBackChat from "@common/assets/images/back_chat.mp4"
import { height } from '@mui/system'
const Setting = () => {
  return (
    <div style={{ height: "100vh" }}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#fcfbfd",
        height: "100%"
      }} className='bgchat_container'>
        <video className='' autoPlay loop muted>
          <source src={vdBackChat} type='video/mp4' />
        </video>
      </div>
    </div>
  )
}

export default Setting