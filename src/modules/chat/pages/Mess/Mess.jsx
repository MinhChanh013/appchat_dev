import React from 'react'

// scss
import "./assets/Mess.scss"
//components
import ChatAll from './components/ChatAll'
import ChatMain from './components/ChatMain'
import ChatSetting from './components/ChatSetting'

const Mess = () => {
  return (
    <div className='message'>
      <ChatAll />
      <ChatMain />
      <ChatSetting />
    </div>
  )
}

export default Mess