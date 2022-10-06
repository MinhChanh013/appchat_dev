import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CAvatar from "../../../controls/CAvatar"
import CButton from "../../../controls/CButton"

import { VscAccount } from "react-icons/vsc";
import { GiSmartphone } from "react-icons/gi";
import { BsGenderTrans } from "react-icons/bs";
import { HiOutlineCake } from "react-icons/hi";
import { AiOutlineEdit } from "react-icons/ai";
import person1 from "../../../../assets/images/person1.png"

import "../../../../assets/styles/layout/MeProfile.scss"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  borderRadius: 1,
  boxShadow: 24,
};


const MeProfile = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className='meProfile'>
      <div onClick={handleOpen}>{children}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="meProfile-container">
            <div className="meProfile-container__header">
              <VscAccount />
              <span>My profile</span>
            </div>
            <div className="meProfile-container__main">
              <div className="meProfile-background">
                <div className='meProfile-infor__avatar'><CAvatar image={person1} /></div>
              </div>
              <div className="meProfile-information">
                <div className='meProfile-information__name'>
                  <h3>Chánh Nguyễn</h3>
                </div>
                <div className="meProfile-information__content">
                  <div className='meProfile-content__infor'>
                    <div className="meProfile-infor__title">
                      <GiSmartphone />
                      <span>Phone number : </span>
                    </div>
                    <h4>0123 456 789</h4>
                  </div>
                  <div className='meProfile-content__infor'>
                    <div className="meProfile-infor__title">
                      <BsGenderTrans />
                      <span>Gender : </span>
                    </div>
                    <h4>Nam</h4>
                  </div>
                  <div className='meProfile-content__infor'>
                    <div className="meProfile-infor__title">
                      <HiOutlineCake />
                      <span>Date of birth : </span>
                    </div>
                    <h4>10/10/2010</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="meProfile-container__footer">
              <CButton icon={<AiOutlineEdit />} children="Edit profile" />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default MeProfile