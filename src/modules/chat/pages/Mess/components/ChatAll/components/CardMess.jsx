import React from 'react'

// component
import CAvatar from "@common/components/controls/CAvatar"
import CBadge from '@common/components/controls/CBadge'
import "../assets/styles/CardMess.scss"
const CardMess = () => {
    return (
        <div className='cardMess'>
            <div className="cardMess-container">
                <div className="cardMess-container__avatar">
                    <CAvatar image={""} />
                </div>
                <div className="cardMess-container__mess">
                    <div className="cardMess-mess__name">Arman</div>
                    <div className="cardMess-mess__chat">Here is some 3D shot i design</div>
                </div>
                <div className="cardMess-container__infor">
                    <div className="cardMess-infor__status">
                        <CBadge number="2" />
                    </div>
                    <div className="cardMess-infor__time">
                        06:56
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardMess