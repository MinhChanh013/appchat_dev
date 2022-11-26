import React from 'react'

import ContactAll from "./components/ContactAll/ContactAll"
const Contact = ({ friendActive, myUser }) => {
    return (
        <div className='contact'>
            <ContactAll friendActive={friendActive} myUser={myUser} />
        </div>
    )
}

export default Contact