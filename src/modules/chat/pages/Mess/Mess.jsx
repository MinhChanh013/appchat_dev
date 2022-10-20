import React from 'react'

import { useLocation } from 'react-router-dom'
// scss
import "./assets/Mess.scss"
//components
import ChatAll from './components/ChatAll/ChatAll'
import ChatMain from '@common/components/layout/ChatMain/ChatMain'
import CAleart from '@common/components/controls/CAleart'

const Mess = () => {
  const alert = useLocation()
  return (
    <div className='message'>
      {alert.state !== null && alert.state.alert === "success" && <CAleart mess="Login sucess" />}
      <ChatAll />
      <ChatMain />
    </div>
  )
}

export default Mess