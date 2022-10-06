import React from 'react'

// icon
import { AiOutlineTeam } from "react-icons/ai";

// component
import CardContactTeam from './components/CardContactTeam'
import MenuArrangeTeam from './components/MenuArrangeTeam';

import "./assets/styles/ContactContainer.scss"

const ContactContainer = () => {
  return (
    <div className='container-contact'>
      <div className="container-contact__main">
        <div className="contact-team__header">
          <div className="contact-team__name">
            <AiOutlineTeam />
            <h3>All team </h3>
            <span> ( 58 )</span>
          </div>
          <div className="contact-team__function">
            <MenuArrangeTeam />
          </div>
        </div>
        <div className="contact-team__main">
          <div className='contact-team__card'>
            <CardContactTeam />
          </div>
          <div className='contact-team__card'>
            <CardContactTeam />
          </div>
          <div className='contact-team__card'>
            <CardContactTeam />
          </div>
          <div className='contact-team__card'>
            <CardContactTeam />
          </div>
          <div className='contact-team__card'>
            <CardContactTeam />
          </div>
          <div className='contact-team__card'>
            <CardContactTeam />
          </div>
          <div className='contact-team__card'>
            <CardContactTeam />
          </div>
          <div className='contact-team__card'>
            <CardContactTeam />
          </div>
          <div className='contact-team__card'>
            <CardContactTeam />
          </div>
          <div className='contact-team__card'>
            <CardContactTeam />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactContainer