import React from 'react'

import "../../assets/styles/Header.scss"
import logo from "../../assets/images/logo.svg";

const Header = () => {
  return (
    <header>
      <ul>
        <li className='active'>Home</li>
        <li>Function</li>
        <li>Development</li>
        <li><img src={logo} alt="" /></li>
        <li>Help</li>
        <li>Contact</li>
        <li>Report</li>
      </ul>
    </header>
  )
}

export default Header