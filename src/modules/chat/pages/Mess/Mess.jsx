import React from 'react'

// import { useLocation } from 'react-router-dom'
// scss
import "./assets/Mess.scss"
//components
import ChatAll from './components/ChatAll/ChatAll'

// import CAleart from '@common/components/controls/CAleart'

const Mess = ({ socket, myUser, friendActive }) => {
  // const alert = useLocation()
  // const [isLoading, setIsLoading] = React.useState(true)

  // React.useEffect(() => {
  //   setIsLoading(false)
  // }, [])

  return (
    <div className='message'>
      {/* {!isLoading && alert.state !== null && alert.state.alert === "success" && <CAleart mess="Login sucess" />} */}
      <ChatAll friendActive={friendActive} socket={socket} myUser={myUser} />
    </div>
  )
}

export default Mess