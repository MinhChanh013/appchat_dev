import React, { useEffect } from 'react'

import { useLocation } from 'react-router-dom'
// scss
import "./assets/Mess.scss"
//components
import ChatAll from './components/ChatAll/ChatAll'
import ChatMain from '@common/components/layout/ChatMain/ChatMain'
import CAleart from '@common/components/controls/CAleart'

// socket
import io from "socket.io-client"
const socket = io.connect("http://localhost:4001");

const Mess = () => {
  const room = "demo_room"
  useEffect(() => {
    socket.emit("join_room", room);
  })
  const alert = useLocation()
  return (
    <div className='message'>
      {alert.state !== null && alert.state.alert === "success" && <CAleart mess="Login sucess" />}
      <ChatAll socket={socket} />
      <ChatMain socket={socket} room={room} />
    </div>
  )
}

export default Mess