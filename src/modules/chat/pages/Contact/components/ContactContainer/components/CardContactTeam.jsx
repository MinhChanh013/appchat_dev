import React from 'react'

import CAvatar from "@common/components/controls/CAvatar"
import CIconButton from "@common/components/controls/CIconButton"
import CTooltip from "@common/components/controls/CTooltip"
import { IoExitOutline } from "react-icons/io5";
import "../assets/styles/CardContactTeam.scss"
import person1 from "@common/assets/images/person1.png"
const CardContactTeam = () => {
  return (
    <div className='card-team'>
      <div className="card-team-content">
        <CTooltip title="Leave Team" placement="bottom" children={<span className="cardTeam-out" ><CIconButton icon={<IoExitOutline />} /></span>} />
        <CAvatar image={person1} />
        <h3>283 Lê Đức Thọ</h3>
        <span className='card-number'>54 thành viên</span>
      </div>
    </div>
  )
}

export default CardContactTeam