import React from 'react'

// scss
import "./assets/Mess.scss"
//components
import ChatAll from './components/ChatAll/ChatAll'
import ChatMain from '@common/components/layout/ChatMain/ChatMain'

const Mess = () => {
  return (
    <div className='message'>
      <ChatAll/>
      <ChatMain />
    </div>
  )
}

export default Mess