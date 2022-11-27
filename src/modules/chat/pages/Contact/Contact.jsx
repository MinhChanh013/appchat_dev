import React from 'react'

import ContactAll from "./components/ContactAll/ContactAll"
const Contact = ({ socket, friendActive, myUser }) => {
    return (
        <div className='contact'>
            <ContactAll socket={socket} friendActive={friendActive} myUser={myUser} />
        </div>
    )
}

export default Contact